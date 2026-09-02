/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import PackageRequestModel from "@/models/packageRequest.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { packageId, fullName, email, phone } = body;

        if (!packageId || !fullName || !email || !phone) {
            return sendErrorResponse("All fields are required.", 400);
        }

        let id = 1;
        const lastData = await PackageRequestModel
            .findOne({}, { id: 1 })
            .sort({ id: -1 })
            .limit(1);

        if (lastData) {
            id = lastData.id + 1;
        }

        const packageRequest = await PackageRequestModel.create({
            id,
            packageId,
            fullName,
            email,
            phone,
        });

        return sendSuccessResponse("Package request sent successfully", {
            packageRequest,
        });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Server error", 500);
    }
}
