/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import FAQModel from "@/models/faq.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, question, answer } = body;

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("A valid FAQ id is required", 200);
        }

        if (question !== undefined && !question?.trim()) {
            return sendErrorResponse("Question cannot be empty", 200);
        }

        if (answer !== undefined && !answer?.trim()) {
            return sendErrorResponse("Answer cannot be empty", 200);
        }

        const faq = await FAQModel.findOne({ id: Number(id) });
        if (!faq) {
            return sendErrorResponse("FAQ not found", 200);
        }

        if (question !== undefined) faq.question = question.trim();
        if (answer !== undefined) faq.answer = answer.trim();

        await faq.save();

        return sendSuccessResponse("FAQ updated successfully", { faq });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}