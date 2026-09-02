/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import "@/models/session.model";
import { connectDB } from "@/lib/mongodb";
import SessionRequestModel from "@/models/sessionRequest.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({}));
        const { page, limit, status } = body;

        const filter: Record<string, any> = {};
        if (status) {
            filter.status = status;
        }

        let requests;
        const totalRequests = await SessionRequestModel.countDocuments(filter);

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalRequests / limit);

            requests = await SessionRequestModel.find(filter)
                .populate("sessionInfo")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            return sendSuccessResponse(
                "Session requests fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalRequests,
                    requests,
                }
            );
        } else {
            requests = await SessionRequestModel.find(filter)
                .populate("sessionInfo")
                .sort({ createdAt: -1 });

            return sendSuccessResponse(
                "All session requests fetched successfully",
                {
                    totalRequests,
                    requests,
                }
            );
        }
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 500);
    }
}
