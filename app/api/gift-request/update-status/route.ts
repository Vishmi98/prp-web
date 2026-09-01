/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import GiftCardRequestModel from "@/models/giftCardRequest.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, status } = body;

        // Validate input
        if (id === undefined || status === undefined) {
            return sendErrorResponse("Missing required fields: id or status", 200);
        }

        // Find and update gift card request
        const updatedRequest = await GiftCardRequestModel.findOneAndUpdate(
            { id },
            { status },
            { new: true }
        );

        if (!updatedRequest) {
            return sendErrorResponse("Gift card request not found", 200);
        }

        return sendSuccessResponse(
            `Gift card request status updated to "${status}" successfully`,
            { request: updatedRequest }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
