/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TreatmentModel from "@/models/treatment.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // 1. Extract treatmentType from request body
        const body = await req.json().catch(() => ({}));
        const { treatmentType } = body;

        if (!treatmentType) {
            return sendErrorResponse("treatmentType is required in body", 400);
        }

        // 2. Aggregate published treatments with fallback default for missing treatmentType
        const results = await TreatmentModel.aggregate([
            { $match: { isPublish: true } },
            { $unwind: "$results" },
            // Assign fallback "Hair" if results.treatmentType is null or missing
            {
                $addFields: {
                    "results.treatmentType": {
                        $ifNull: ["$results.treatmentType", "Hair"],
                    },
                },
            },
            // Match against requested type
            { $match: { "results.treatmentType": treatmentType } },
            {
                $project: {
                    _id: 0,
                    title: "$title",
                    beforeImagePath: "$results.beforeImagePath",
                    beforeImageId: "$results.beforeImageId",
                    afterImagePath: "$results.afterImagePath",
                    afterImageId: "$results.afterImageId",
                    treatmentType: "$results.treatmentType",
                },
            },
        ]);

        return sendSuccessResponse(
            `Treatment results for '${treatmentType}' fetched successfully`,
            { results }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 500);
    }
}