/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import GiftCardModel from "@/models/giftCard.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, isPublish } = body;

        // Validate input
        if (id === undefined || isPublish === undefined) {
            return sendErrorResponse("Missing required fields: id or isPublish", 200);
        }

        // Find and update gift card
        const updatedGiftCard = await GiftCardModel.findOneAndUpdate(
            { id },
            { isPublish },
            { new: true }
        );

        if (!updatedGiftCard) {
            return sendErrorResponse("Gift Card not found", 200);
        }

        return sendSuccessResponse(
            `Gift Card ${isPublish ? "published" : "unpublished"} successfully`,
            { giftCard: updatedGiftCard }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
