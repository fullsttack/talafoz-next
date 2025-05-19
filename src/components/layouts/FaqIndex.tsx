import React, { Suspense } from "react";
import { faqs, Faq } from "../../data/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";


const FaqIndex: React.FC = () => {

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-12 pt-36 pb-12">

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
