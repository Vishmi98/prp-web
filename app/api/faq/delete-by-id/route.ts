/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import FAQModel from "@/models/faq.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid FAQ ID is required", 200);
        }

        const deletedFaq = await FAQModel.findOneAndDelete({ id: Number(id) });
        if (!deletedFaq) return sendErrorResponse("FAQ not found", 200);

        return sendSuccessResponse("FAQ deleted successfully", { faq: deletedFaq });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}