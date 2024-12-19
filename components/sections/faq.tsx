import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
  
import { HeaderSection } from "../shared/header-section";

const faqData = [
{
    id: "item-1",
    question: "How does the AI categorization work?",
    answer: "Our advanced AI analyzes the content and metadata of your bookmarks to automatically sort them into relevant categories, saving you hours of manual organization.",
},
{
    id: "item-2",
    question: "Is my bookmark data safe?",
    answer: "Absolutely. We prioritize your privacy and security. Your bookmark data is processed locally and never stored on our servers.",
},
{
    id: "item-3",
    question: "Which browsers are supported?",
    answer: "Our AI Bookmark Manager supports all major browsers including Chrome, Firefox, Safari, and Edge. You can easily import and export your bookmarks across different platforms.",
},
{
    id: "item-4",
    question: "How does the duplicate removal feature work?",
    answer: "Our AI identifies duplicate bookmarks based on URL and content similarity. It then presents you with options to keep the most relevant version, ensuring your bookmark collection stays clean and organized.",
},
];

export function HomeFaq() {
return (
    <section className="container max-w-4xl py-16">
    <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers about our AI Bookmark Manager. If you need further assistance, don't hesitate to contact us for personalized help."
    />

    <Accordion type="single" collapsible className="my-12 w-full">
        {faqData.map((faqItem) => (
        <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
            {faqItem.answer}
            </AccordionContent>
        </AccordionItem>
        ))}
    </Accordion>
    </section>
);
}
