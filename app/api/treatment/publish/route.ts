/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TreatmentModel from "@/models/treatment.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, isPublish } = body;

        // Validate input
        if (id === undefined || isPublish === undefined) {
            return sendErrorResponse("Missing required fields: id or isPublish", 200);
        }

        // Find and update treatment
        const updatedTreatment = await TreatmentModel.findOneAndUpdate(
            { id },
            { isPublish },
            { new: true }
        );

        if (!updatedTreatment) {
            return sendErrorResponse("Treatment not found", 200);
        }

        return sendSuccessResponse(
            `Treatment ${isPublish ? "published" : "unpublished"} successfully`,
            { treatment: updatedTreatment }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
