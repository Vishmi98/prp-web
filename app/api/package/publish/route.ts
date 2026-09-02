/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import PackageModel from "@/models/package.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));
        const { id, isPublish } = body;

        // Validate input
        if (id === undefined || isPublish === undefined) {
            return sendErrorResponse("Missing required fields: id or isPublish", 200);
        }

        const updatedPackage = await PackageModel.findOneAndUpdate(
            { id },
            { isPublish },
            { new: true }
        );

        if (!updatedPackage) {
            return sendErrorResponse("Package not found", 200);
        }

        return sendSuccessResponse(
            `Package ${isPublish ? "published" : "unpublished"} successfully`,
            { package: updatedPackage }
        );
    } catch (error: any) {
        console.error("Error updating package publish status:", error);
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
