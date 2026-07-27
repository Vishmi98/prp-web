/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import ContactUsModel from "@/models/contactUs.model";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { firstName, lastName, email, phoneNumber, message } = body;

        // Validate required fields
        if (!firstName || !email || !phoneNumber || !message) {
            return sendErrorResponse("All fields are required.", 200);
        }

        // Auto-increment custom ID logic
        let id = 1;
        const lastData = await ContactUsModel
            .findOne({}, { id: 1 })
            .sort({ id: -1 })
            .limit(1);

        if (lastData) {
            id = lastData.id + 1;
        }

        // Create entry in MongoDB
        const inquiry = await ContactUsModel.create({
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            message,
        });

        return sendSuccessResponse("Inquiry created successfully", {
            inquiry,
        });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Server error", 500);
    }
}