/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ServiceModel from "@/models/service.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid service ID is required", 200);
        }

        const deletedService = await ServiceModel.findOneAndDelete({ id: Number(id) });
        if (!deletedService) return sendErrorResponse("Service not found", 200);

        return sendSuccessResponse("Service deleted successfully", { service: deletedService });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}