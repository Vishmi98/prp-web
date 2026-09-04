/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SessionModel from "@/models/session.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid session ID is required", 200);
        }

        const deletedSession = await SessionModel.findOneAndDelete({ id: Number(id) });
        if (!deletedSession) return sendErrorResponse("Session not found", 200);

        return sendSuccessResponse("Session deleted successfully", { session: deletedSession });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}