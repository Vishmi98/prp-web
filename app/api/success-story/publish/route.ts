/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import SuccessStoryModel from "@/models/successStory.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, isPublish } = body;

        // Validate input
        if (id === undefined || isPublish === undefined) {
            return sendErrorResponse("Missing required fields: id or isPublish", 200);
        }

        // Find and update success story
        const updatedStory = await SuccessStoryModel.findOneAndUpdate(
            { id },
            { isPublish },
            { new: true }
        );

        if (!updatedStory) {
            return sendErrorResponse("Success story not found", 200);
        }

        return sendSuccessResponse(
            `Success story ${isPublish ? "published" : "unpublished"} successfully`,
            { successStory: updatedStory }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}