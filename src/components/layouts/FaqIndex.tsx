import React from "react";
import { faqs, Faq } from "../../_data/faq";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FaqIndex: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-12 pt-36 pb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">سوالات متداول</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq: Faq, idx: number) => (
          <AccordionItem key={idx} value={`faq-${idx}`}>
            <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqIndex;
