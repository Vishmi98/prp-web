/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SessionRequestModel from "@/models/sessionRequest.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, status } = body;

        if (id === undefined || status === undefined) {
            return sendErrorResponse("Missing required fields: id or status", 200);
        }

        const updatedRequest = await SessionRequestModel.findOneAndUpdate(
            { id },
            { status },
            { new: true }
        );

        if (!updatedRequest) {
            return sendErrorResponse("Session request not found", 200);
        }

        return sendSuccessResponse(
            `Session request status updated to "${status}" successfully`,
            { request: updatedRequest }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
