/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import "@/models/giftCard.model";
import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import GiftCardRequestModel from "@/models/giftCardRequest.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({})); // Fallback for empty body
        const { page, limit, status } = body;

        // Optional filter object (allows filtering by status if needed)
        const filter: Record<string, any> = {};
        if (status) {
            filter.status = status;
        }

        let requests;
        const totalRequests = await GiftCardRequestModel.countDocuments(filter);

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalRequests / limit);

            requests = await GiftCardRequestModel.find(filter)
                .populate("giftCardInfo")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            return sendSuccessResponse(
                "Gift card requests fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalRequests,
                    requests,
                }
            );
        } else {
            requests = await GiftCardRequestModel.find(filter)
                .populate("giftCardInfo")
                .sort({ createdAt: -1 });

            return sendSuccessResponse(
                "All gift card requests fetched successfully",
                {
                    totalRequests,
                    requests,
                }
            );
        }
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 500);
    }
}