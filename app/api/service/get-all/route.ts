/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import ServiceModel from "@/models/service.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({})); // Fallback for empty body
        const { page, limit } = body;

        let services;
        const totalServices = await ServiceModel.countDocuments();

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalServices / limit);

            services = await ServiceModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse("Services fetched successfully", {
                page,
                limit,
                totalPages,
                totalServices,
                services,
            });
        } else {
            services = await ServiceModel.find({ isPublish: true })
                .sort({ createdAt: 1 })
                .lean();

            return sendSuccessResponse("All services fetched successfully", {
                totalServices,
                services,
            });
        }
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}