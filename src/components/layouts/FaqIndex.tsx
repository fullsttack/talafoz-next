import React, { Suspense } from "react";
import { faqs, Faq } from "../../data/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const FaqIndex: React.FC = () => {
  const [circles, setCircles] = useState<{ cx: number; cy: number; r: number; fill: string }[]>([]);

  useEffect(() => {
    // Only run on client
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      cx: Math.random() * 1440,
      cy: Math.random() * 320,
      r: Math.random() * 6 + 2,
      fill: i % 2 === 0 ? "#06b6d4" : "#facc15",
    }));
    setCircles(generated);
  }, []);
  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-12 pt-36 pb-12">
      <div
        className="absolute inset-x-0 -z-10 -mt-24 py-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        {circles.length > 0 && (
          <svg
            className="absolute inset-0 w-full h-[300px]"
            width="100%"
            height="100%"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.18 }}
            aria-hidden="true"
          >
            {circles.map((circle, i) => (
              <circle
                key={i}
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r}
                fill={circle.fill}
                opacity="0.5"
              />
            ))}
          </svg>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">سوالات متداول</h2>
      <Suspense
        fallback={
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-md" />
            ))}
          </div>
        }
      >
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq: Faq, idx: number) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-right">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Suspense>
    </div>
  );
};

export default FaqIndex;
