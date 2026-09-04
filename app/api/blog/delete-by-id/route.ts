/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import BlogModel from "@/models/blog.model";
import { connectDB } from "@/lib/mongodb";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            return sendErrorResponse("Valid blog ID is required", 200);
        }

        const deletedBlog = await BlogModel.findOneAndDelete({ id: Number(id) });
        if (!deletedBlog) return sendErrorResponse("Blog not found", 200);

        return sendSuccessResponse("Blog deleted successfully", { blog: deletedBlog });
    } catch (error: any) {
        return sendErrorResponse(error?.message || "Unexpected error", 200);
    }
}