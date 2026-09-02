/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SessionModel from "@/models/session.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));
        const { name, details, price, duration } = body;

        if (!name?.trim()) {
            return sendErrorResponse("Session name is required", 200);
        }

        if (!details?.trim()) {
            return sendErrorResponse("Session details are required", 200);
        }

        const numericPrice = Number(price);
        if (Number.isNaN(numericPrice) || numericPrice < 0) {
            return sendErrorResponse("A valid session price is required", 200);
        }

        if (!duration?.trim()) {
            return sendErrorResponse("Session duration is required", 200);
        }

        const lastItem = await SessionModel.findOne().sort({ id: -1 });
        const nextId = lastItem ? lastItem.id + 1 : 1;

        const sessionItem = await SessionModel.create({
            id: nextId,
            name: name.trim(),
            details: details.trim(),
            price: numericPrice,
            duration: duration.trim(),
            isPublish: false,
        });

        return sendSuccessResponse("Session created successfully", {
            session: sessionItem,
        });
    } catch (error: any) {
        console.error("Error creating session:", error);
        return sendErrorResponse(error?.message || "Unexpected error", 500);
    }
}
