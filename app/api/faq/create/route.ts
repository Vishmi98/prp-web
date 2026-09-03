/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import FAQModel from "@/models/faq.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { question, answer } = body;

        if (!question?.trim() || !answer?.trim()) {
            return sendErrorResponse("Question and answer are required", 200);
        }

        const lastFaq = await FAQModel.findOne().sort({ id: -1 });
        const nextId = lastFaq ? lastFaq.id + 1 : 1;

        const faq = await FAQModel.create({
            id: nextId,
            question: question.trim(),
            answer: answer.trim(),
        });

        return sendSuccessResponse("FAQ created successfully", { faq });
    } catch (error: any) {
        console.error("Error creating FAQ:", error);
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}