/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SessionRequestModel from "@/models/sessionRequest.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid session request ID is required", 200);
        }

        const deletedRequest = await SessionRequestModel.findOneAndDelete({ id: Number(id) });
        if (!deletedRequest) return sendErrorResponse("Session request not found", 200);

        return sendSuccessResponse("Session request deleted successfully", { request: deletedRequest });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}