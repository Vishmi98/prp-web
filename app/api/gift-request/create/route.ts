/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import GiftCardRequestModel from "@/models/giftCardRequest.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { giftCardId, fullName, email, phone } = body;

        // Validate required fields
        if (!giftCardId || !fullName || !email || !phone) {
            return sendErrorResponse("All fields are required.", 400);
        }

        // Auto-increment custom ID logic
        let id = 1;
        const lastData = await GiftCardRequestModel
            .findOne({}, { id: 1 })
            .sort({ id: -1 })
            .limit(1);

        if (lastData) {
            id = lastData.id + 1;
        }

        // Create entry in MongoDB
        const giftCardRequest = await GiftCardRequestModel.create({
            id,
            giftCardId,
            fullName,
            email,
            phone,
        });

        return sendSuccessResponse("Gift card request send successfully", {
            giftCardRequest,
        });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Server error", 500);
    }
}