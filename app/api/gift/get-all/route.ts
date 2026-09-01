/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import GiftCardModel from "@/models/giftCard.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({})); // Fallback for empty body
        const { page, limit } = body;

        let cards;
        const totalCards = await GiftCardModel.countDocuments();

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalCards / limit);

            cards = await GiftCardModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse("Gift Cards fetched successfully", {
                page,
                limit,
                totalPages,
                totalCards,
                cards,
            });
        } else {
            cards = await GiftCardModel.find({ isPublish: true })
                .sort({ createdAt: -1 })
                .lean();

            return sendSuccessResponse("All cards fetched successfully", {
                totalCards,
                cards,
            });
        }
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}