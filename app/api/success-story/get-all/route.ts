/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import SuccessStoryModel from "@/models/successStory.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({})); // Fallback for empty body
        const { page, limit } = body;

        let successStories;
        const totalStories = await SuccessStoryModel.countDocuments();

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalStories / limit);

            successStories = await SuccessStoryModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse("Success stories fetched successfully", {
                page,
                limit,
                totalPages,
                totalStories,
                successStories,
            });
        } else {
            successStories = await SuccessStoryModel.find().sort({ createdAt: -1 }).lean();

            return sendSuccessResponse("All success stories fetched successfully", {
                totalStories,
                successStories,
            });
        }
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}