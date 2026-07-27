/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import ContactUsModel from "@/models/contactUs.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({})); // Fallback for empty body
        const { page, limit } = body;

        let inquiries;
        const totalInquiries = await ContactUsModel.countDocuments();

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalInquiries / limit);

            inquiries = await ContactUsModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse(
                "Inquiries fetched successfully",
                {
                    page,
                    limit,
                    totalPages,
                    totalInquiries,
                    inquiries,
                },
            );
        } else {
            inquiries = await ContactUsModel.find({ isPublish: true }).sort({ createdAt: -1 }).lean();

            return sendSuccessResponse(
                "All inquiries fetched successfully", {
                totalInquiries,
                inquiries,
            },
            );
        }
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
