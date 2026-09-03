/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import FAQModel from "@/models/faq.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, isPublish } = body;

        if (id === undefined || isPublish === undefined) {
            return sendErrorResponse("Missing required fields: id or isPublish", 200);
        }

        const faq = await FAQModel.findOneAndUpdate(
            { id: Number(id) },
            { isPublish: Boolean(isPublish) },
            { new: true }
        );

        if (!faq) {
            return sendErrorResponse("FAQ not found", 200);
        }

        return sendSuccessResponse(
            `FAQ ${faq.isPublish ? "published" : "unpublished"} successfully`,
            { faq }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}