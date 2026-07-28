/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TeamModel from "@/models/team.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, isPublish } = body;

        // Validate input
        if (id === undefined || isPublish === undefined) {
            return sendErrorResponse("Missing required fields: id or isPublish", 200);
        }

        // Find and update team
        const updatedTeam = await TeamModel.findOneAndUpdate(
            { id },
            { isPublish },
            { new: true }
        );

        if (!updatedTeam) {
            return sendErrorResponse("Team not found", 200);
        }

        return sendSuccessResponse(
            `Team ${isPublish ? "published" : "unpublished"} successfully`,
            { team: updatedTeam }
        );
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}
