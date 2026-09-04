/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import TeamModel from "@/models/team.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid team member ID is required", 200);
        }

        const deletedMember = await TeamModel.findOneAndDelete({ id: Number(id) });
        if (!deletedMember) return sendErrorResponse("Team member not found", 200);

        return sendSuccessResponse("Team member deleted successfully", { member: deletedMember });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}