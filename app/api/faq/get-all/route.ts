/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import FAQModel from "@/models/faq.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));
        const { page, limit } = body;
        const totalFaqs = await FAQModel.countDocuments();

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalFaqs / limit);
            const faqs = await FAQModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse("FAQs fetched successfully", {
                page,
                limit,
                totalPages,
                totalFaqs,
                faqs,
            });
        }

        const faqs = await FAQModel.find().sort({ createdAt: -1 }).lean();

        return sendSuccessResponse("All FAQs fetched successfully", {
            totalFaqs,
            faqs,
        });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}