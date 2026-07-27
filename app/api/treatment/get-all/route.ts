/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TreatmentModel from "@/models/treatment.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({})); // Fallback for empty body
        const { page, limit } = body;

        let treatments;
        const totalTreatments = await TreatmentModel.countDocuments();

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalTreatments / limit);

            treatments = await TreatmentModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse(
                "Treatments fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalTreatments,
                    treatments,
                },
            );
        } else {
            treatments = await TreatmentModel.find({ isPublish: true }).sort({ createdAt: -1 }).lean();

            return sendSuccessResponse(
                "All treatments fetched successfully", {
                totalTreatments,
                treatments,
            },
            );
        }
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
