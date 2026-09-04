/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SuccessStoryModel from "@/models/successStory.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid success story ID is required", 200);
        }

        const deletedStory = await SuccessStoryModel.findOneAndDelete({ id: Number(id) });
        if (!deletedStory) return sendErrorResponse("Success story not found", 200);

        return sendSuccessResponse("Success story deleted successfully", { story: deletedStory });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}