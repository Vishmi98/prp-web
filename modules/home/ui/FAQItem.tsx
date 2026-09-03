"use client";

import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

type FAQItemProps = {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
};

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
    return (
        <div className="overflow-hidden border border-gray-200 bg-white transition-all duration-300">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-7"
            >
                <span className="text-base font-semibold text-black md:text-lg">
                    {question}
                </span>
                <span className="shrink-0 text-gold" aria-hidden="true">
                    {isOpen ? <FiMinus size={22} /> : <FiPlus size={22} />}
                </span>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="px-5 pb-6 leading-relaxed text-gray-600 md:px-7">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQItem;