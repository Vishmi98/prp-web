/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SessionModel from "@/models/session.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));
        const { id, isPublish } = body;

        if (id === undefined || isPublish === undefined) {
            return sendErrorResponse("Missing required fields: id or isPublish", 200);
        }

        const updatedSession = await SessionModel.findOneAndUpdate(
            { id },
            { isPublish },
            { new: true }
        );

        if (!updatedSession) {
            return sendErrorResponse("Session not found", 200);
        }

        return sendSuccessResponse(
            `Session ${isPublish ? "published" : "unpublished"} successfully`,
            { session: updatedSession }
        );
    } catch (error: any) {
        console.error("Error updating session publish status:", error);
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
