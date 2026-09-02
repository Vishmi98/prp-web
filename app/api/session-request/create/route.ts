/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SessionRequestModel from "@/models/sessionRequest.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { sessionId, fullName, email, phone } = body;

        if (!sessionId || !fullName || !email || !phone) {
            return sendErrorResponse("All fields are required.", 400);
        }

        let id = 1;
        const lastData = await SessionRequestModel
            .findOne({}, { id: 1 })
            .sort({ id: -1 })
            .limit(1);

        if (lastData) {
            id = lastData.id + 1;
        }

        const sessionRequest = await SessionRequestModel.create({
            id,
            sessionId,
            fullName,
            email,
            phone,
        });

        return sendSuccessResponse("Session request sent successfully", {
            sessionRequest,
        });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Server error", 500);
    }
}
