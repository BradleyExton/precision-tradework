import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Rate limiting - in-memory store (resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // max requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

// Phone validation regex - accepts various formats
const phoneRegex = /^[\d\s\-\(\)\+\.]{10,20}$/;

const consultationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).regex(phoneRegex, "Please enter a valid phone number"),
  projectType: z.string().min(1),
  budgetRange: z.string().min(1),
  timeline: z.string().min(1),
  projectDescription: z.string().min(20),
  address: z.string().optional(),
  inServiceArea: z.boolean(),
  referralSource: z.string().optional(),
  // Honeypot field - should always be empty
  website: z.string().max(0).optional(),
});

const projectTypeLabels: Record<string, string> = {
  framing: "Framing",
  drywall: "Drywall",
  "trim-carpentry": "Trim Carpentry",
  flooring: "Flooring",
  kitchen: "Kitchen",
  painting: "Painting & Finishing",
  multiple: "Multiple Services",
  other: "Other",
};

const budgetLabels: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5k-10k": "$5,000 - $10,000",
  "10k-25k": "$10,000 - $25,000",
  "25k-50k": "$25,000 - $50,000",
  "50k-plus": "$50,000+",
  unsure: "Not sure yet",
};

const timelineLabels: Record<string, string> = {
  asap: "As soon as possible",
  "1-2-months": "Within 1-2 months",
  "3-6-months": "Within 3-6 months",
  flexible: "Flexible / Just planning",
};

const referralLabels: Record<string, string> = {
  google: "Google Search",
  referral: "Friend or Family",
  social: "Social Media",
  other: "Other",
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
               request.headers.get("x-real-ip") ||
               "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check - if filled, silently reject (bots fill hidden fields)
    if (body.website && body.website.length > 0) {
      // Return success to not alert the bot, but don't process
      return NextResponse.json({ success: true });
    }

    const data = consultationSchema.parse(body);

    const notificationEmail = process.env.NOTIFICATION_EMAIL || "james@precisiontradework.ca";

    const emailContent = `
New consultation request from precisiontradework.ca

═══════════════════════════════════════════════════
CONTACT INFORMATION
═══════════════════════════════════════════════════
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

═══════════════════════════════════════════════════
PROJECT DETAILS
═══════════════════════════════════════════════════
Type: ${projectTypeLabels[data.projectType] || data.projectType}
Budget: ${budgetLabels[data.budgetRange] || data.budgetRange}
Timeline: ${timelineLabels[data.timeline] || data.timeline}
Address: ${data.address || "Not provided"}

═══════════════════════════════════════════════════
PROJECT DESCRIPTION
═══════════════════════════════════════════════════
${data.projectDescription}

═══════════════════════════════════════════════════
ADDITIONAL INFO
═══════════════════════════════════════════════════
Referral Source: ${data.referralSource ? referralLabels[data.referralSource] || data.referralSource : "Not specified"}
In Service Area: ${data.inServiceArea ? "Yes" : "No"}
Submitted: ${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })}

---
Reply directly to this email to respond to ${data.name}.
    `.trim();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Only log in development
      if (process.env.NODE_ENV !== "production") {
        console.warn("RESEND_API_KEY not configured - email not sent");
      }
    } else {
      const resend = new Resend(apiKey);

      // Send notification email to business
      await resend.emails.send({
        from: "Precision Tradework <noreply@precisiontradework.ca>",
        to: [notificationEmail],
        replyTo: data.email,
        subject: `New Consultation Request - ${projectTypeLabels[data.projectType] || data.projectType} - ${data.name}`,
        text: emailContent,
      });

      // Send confirmation email to user
      const confirmationEmail = `
Hi ${data.name},

Thank you for contacting Precision Tradework! We've received your consultation request and will get back to you within 24 hours.

Here's a summary of your request:
- Project Type: ${projectTypeLabels[data.projectType] || data.projectType}
- Budget Range: ${budgetLabels[data.budgetRange] || data.budgetRange}
- Timeline: ${timelineLabels[data.timeline] || data.timeline}

If you need immediate assistance, please call us at 705-896-2761.

Best regards,
The Precision Tradework Team

---
63 Ferris Lane, Unit E4
Barrie, ON L4M 5C4
www.precisiontradework.ca
      `.trim();

      await resend.emails.send({
        from: "Precision Tradework <noreply@precisiontradework.ca>",
        to: [data.email],
        subject: "We received your consultation request - Precision Tradework",
        text: confirmationEmail,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Only log errors in development
    if (process.env.NODE_ENV !== "production") {
      console.error("Contact form error:", error);
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
