/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import "@/models/package.model";
import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import PackageRequestModel from "@/models/packageRequest.model";


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
        const totalRequests = await PackageRequestModel.countDocuments(filter);

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalRequests / limit);

            requests = await PackageRequestModel.find(filter)
                .populate("packageInfo")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            return sendSuccessResponse(
                "Package requests fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalRequests,
                    requests,
                }
            );
        } else {
            requests = await PackageRequestModel.find(filter)
                .populate("packageInfo")
                .sort({ createdAt: -1 });

            return sendSuccessResponse(
                "All package requests fetched successfully",
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
