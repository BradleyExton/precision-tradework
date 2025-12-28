export const businessStats = {
  yearsInBusiness: 5,
  projectsCompleted: "200+",
  serviceArea: "Simcoe County & Muskoka",
};

export const serviceAreas = {
  regions: [
    {
      name: "Simcoe County",
      // Center point for zooming to this region
      center: { lng: -79.8, lat: 44.5 },
      zoom: 8.5,
      cities: [
        { name: "Barrie", isHeadquarters: true },
        { name: "Orillia" },
        { name: "Innisfil" },
        { name: "Collingwood" },
        { name: "Wasaga Beach" },
        { name: "Midland" },
        { name: "Penetanguishene" },
        { name: "Oro-Medonte" },
        { name: "Springwater" },
        { name: "Essa" },
        { name: "Adjala-Tosorontio" },
      ],
    },
    {
      name: "Muskoka",
      // Center point for zooming to this region
      center: { lng: -79.3, lat: 45.1 },
      zoom: 9,
      cities: [
        { name: "Gravenhurst" },
        { name: "Bracebridge" },
        { name: "Huntsville" },
      ],
    },
  ],
};

// Map marker coordinates (relative positions for SVG)
export const mapMarkers = [
  { name: "Barrie", x: 55, y: 75, isHq: true },
  { name: "Orillia", x: 60, y: 60, isHq: false },
  { name: "Collingwood", x: 30, y: 55, isHq: false },
  { name: "Midland", x: 45, y: 45, isHq: false },
  { name: "Gravenhurst", x: 65, y: 40, isHq: false },
  { name: "Bracebridge", x: 68, y: 30, isHq: false },
  { name: "Huntsville", x: 72, y: 20, isHq: false },
];
