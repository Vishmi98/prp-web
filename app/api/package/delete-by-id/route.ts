/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import PackageModel from "@/models/package.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid package ID is required", 200);
        }

        const deletedPackage = await PackageModel.findOneAndDelete({ id: Number(id) });
        if (!deletedPackage) return sendErrorResponse("Package not found", 200);

        return sendSuccessResponse("Package deleted successfully", { package: deletedPackage });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}