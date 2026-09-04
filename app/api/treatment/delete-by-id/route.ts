/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import TreatmentModel from "@/models/treatment.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id } = body;

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid treatment ID is required", 200);
        }

        const deletedTreatment = await TreatmentModel.findOneAndDelete({
            id: Number(id),
        });

        if (!deletedTreatment) {
            return sendErrorResponse("Treatment not found", 200);
        }

        return sendSuccessResponse("Treatment deleted successfully", {
            treatment: deletedTreatment,
        });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}