/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import SessionModel from "@/models/session.model";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => ({}));
    const { id, name, details, price, duration, isPublish } = body;

    const numericId = Number(id);
    if (id === undefined || id === null || Number.isNaN(numericId)) {
      return sendErrorResponse("Invalid or missing session ID", 200);
    }

    const updateData: Record<string, any> = {};

    if (name !== undefined) {
      if (!name.trim()) {
        return sendErrorResponse("Session name cannot be empty", 200);
      }
      updateData.name = name.trim();
    }

    if (details !== undefined) {
      if (!details.trim()) {
        return sendErrorResponse("Session details cannot be empty", 200);
      }
      updateData.details = details.trim();
    }

    if (price !== undefined) {
      const numericPrice = Number(price);
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return sendErrorResponse("A valid session price is required", 200);
      }
      updateData.price = numericPrice;
    }

    if (duration !== undefined) {
      if (!duration.trim()) {
        return sendErrorResponse("Session duration cannot be empty", 200);
      }
      updateData.duration = duration.trim();
    }

    if (isPublish !== undefined) {
      updateData.isPublish = Boolean(isPublish);
    }

    const updatedSession = await SessionModel.findOneAndUpdate(
      { id: numericId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedSession) {
      return sendErrorResponse("Session not found", 404);
    }

    return sendSuccessResponse("Session updated successfully", {
      session: updatedSession,
    });
  } catch (error: any) {
    console.error("Error updating session:", error);
    return sendErrorResponse(error?.message || "Unexpected error", 500);
  }
}
