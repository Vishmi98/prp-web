/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TreatmentModel from "@/models/treatment.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // 1. Fetch published treatments selecting both 'title' and 'results'
        const treatments = await TreatmentModel.find({ isPublish: true })
            .select("title results -_id")
            .lean();

        // 2. Flatten results while injecting the treatment's title into each result object
        const allResults = treatments.flatMap((treatment) =>
            (treatment.results || []).map((result: any) => ({
                title: treatment.title,
                ...result,
            }))
        );

        return sendSuccessResponse(
            "All treatment results fetched successfully",
            {
                results: allResults,
            }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 500);
    }
}