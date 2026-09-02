/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SessionModel from "@/models/session.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => ({}));
    const { page, limit } = body;

    let sessions;
    const totalSessions = await SessionModel.countDocuments();

    if (page && limit) {
      const skip = (page - 1) * limit;
      const totalPages = Math.ceil(totalSessions / limit);

      sessions = await SessionModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      return sendSuccessResponse(
        "Sessions fetched successfully",
        {
          page,
          limit,
          totalPages,
          totalSessions,
          sessions,
        },
      );
    } else {
      sessions = await SessionModel.find({ isPublish: true }).sort({ createdAt: 1 }).lean();

      return sendSuccessResponse(
        "All sessions fetched successfully",
        {
          totalSessions,
          sessions,
        },
      );
    }
  } catch (error: any) {
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}
