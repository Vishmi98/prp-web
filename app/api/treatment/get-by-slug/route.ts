/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TreatmentModel from "@/models/treatment.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));
        const { slug } = body;

        // Validate required field
        if (!slug || typeof slug !== "string") {
            return sendErrorResponse("Slug is required", 200);
        }

        // Find published treatment matching the slug
        const treatment = await TreatmentModel.findOne({
            slug: slug.trim(),
            isPublish: true,
        }).lean();

        if (!treatment) {
            return sendErrorResponse("Treatment not found", 200);
        }

        return sendSuccessResponse("Treatment fetched successfully", {
            treatment,
        });
    } catch (error: any) {
        return sendErrorResponse(
            error?.message || "Unexpected error occurred while fetching treatment",
            200
        );
    }
}