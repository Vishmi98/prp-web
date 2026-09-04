/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import PackageRequestModel from "@/models/packageRequest.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid package request ID is required", 200);
        }

        const deletedRequest = await PackageRequestModel.findOneAndDelete({ id: Number(id) });
        if (!deletedRequest) return sendErrorResponse("Package request not found", 200);

        return sendSuccessResponse("Package request deleted successfully", { request: deletedRequest });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}