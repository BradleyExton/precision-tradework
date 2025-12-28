"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-neutral-100 pr-4">
          {question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-out"
      >
        <div ref={contentRef} className="px-6 pb-6">
          <p className="text-neutral-300">{answer}</p>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
