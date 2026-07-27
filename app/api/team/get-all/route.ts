/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TeamModel from "@/models/team.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json().catch(() => ({})); // Fallback for empty body
        const { page, limit } = body;

        let teamMembers;
        const totalMembers = await TeamModel.countDocuments();

        if (page && limit) {
            const skip = (page - 1) * limit;
            const totalPages = Math.ceil(totalMembers / limit);

            teamMembers = await TeamModel.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return sendSuccessResponse("Team members fetched successfully", {
                page,
                limit,
                totalPages,
                totalMembers,
                teamMembers,
            });
        } else {
            teamMembers = await TeamModel.find().sort({ createdAt: -1 }).lean();

            return sendSuccessResponse("All team members fetched successfully", {
                totalMembers,
                teamMembers,
            });
        }
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}