/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ContactUsModel from "@/models/contactUs.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid inquiry ID is required", 200);
        }

        const deletedInquiry = await ContactUsModel.findOneAndDelete({ id: Number(id) });
        if (!deletedInquiry) return sendErrorResponse("Inquiry not found", 200);

        return sendSuccessResponse("Inquiry deleted successfully", { inquiry: deletedInquiry });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}