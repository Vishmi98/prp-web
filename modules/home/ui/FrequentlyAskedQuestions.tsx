"use client";

import React, { useEffect, useState } from "react";

import FAQItem from "./FAQItem";

import { FAQDataType } from "@/modules/faq/faq.types";
import { getFAQs } from "@/modules/faq/faq.service";


const FrequentlyAskedQuestions = () => {
    const [activeFaq, setActiveFaq] = useState<number>(0);
    const [faqs, setFaqs] = useState<FAQDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await getFAQs();
                const publishedFaqs = response.faqs.filter(
                    (faq) => faq.isPublish !== false
                );
                setFaqs(publishedFaqs);
            } catch (error) {
                console.error("Failed to fetch FAQs:", error);
                setFaqs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#FAFAF8] py-16 text-black md:py-24">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#D4AF37]/10 to-transparent" />

            <div className="relative z-10 mx-auto w-[90%] xl:w-[85%]">
                <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
                    <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Some frequently asked general questions about PRP/PRF
                        treatments to help you learn more before discussing your individual concerns and
                        treatment suitability with our practitioner.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl space-y-2">
                    {isLoading && Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-[74px] animate-pulse items-center justify-between border border-gray-200 bg-white px-5 md:px-7"
                        >
                            <div className="h-5 w-3/4 rounded bg-gray-200" />
                            <div className="h-5 w-5 rounded bg-gray-200" />
                        </div>
                    ))}
                    {!isLoading && faqs.map((faq, index) => (
                        <FAQItem
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            answer2={faq.answer2}
                            answer3={faq.answer3}
                            isOpen={activeFaq === index}
                            onToggle={() => setActiveFaq(activeFaq === index ? -1 : index)}
                        />
                    ))}
                    {!isLoading && faqs.length === 0 && (
                        <p className="py-8 text-center text-gray-500">
                            No FAQs available at the moment.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FrequentlyAskedQuestions;