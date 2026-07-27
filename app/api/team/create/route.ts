/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { ImageKitService } from "@/services/imagekit";
import { sendErrorResponse, sendSuccessResponse } from "@/services/apiResponse";
import TeamModel from "@/models/team.model";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = (formData.get("lastName") as string) || "";
    const specialization = formData.get("specialization") as string;

    // Social links from formData
    const linkedin = (formData.get("linkedin") as string) || "";
    const instagram = (formData.get("instagram") as string) || "";
    const facebook = (formData.get("facebook") as string) || "";

    const profileImage = formData.get("profileImage") as File | null;

    if (!title?.trim() || !firstName?.trim() || !specialization?.trim()) {
      return sendErrorResponse(
        "Title, first name, and specialization are required",
        200
      );
    }

    // Initialize image variables
    let profileImagePath = "";
    let profileImageId = "";

    // Upload profile image if provided
    if (profileImage) {
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      const filename = `${Date.now()}-${profileImage.name}`;
      const uploaded = await ImageKitService.uploadImage(
        buffer,
        filename,
        "prp_team/profiles"
      );
      profileImagePath = uploaded.url;
      profileImageId = uploaded.fileId;
    }

    const lastItem = await TeamModel.findOne().sort({ id: -1 });
    const nextId = lastItem ? lastItem.id + 1 : 1;

    const teamMember = await TeamModel.create({
      id: nextId,
      title,
      firstName,
      lastName,
      specialization,
      profileImagePath,
      profileImageId,
      socialLinks: {
        linkedin,
        instagram,
        facebook,
      },
    });

    return sendSuccessResponse("Team member created successfully", {
      teamMember,
    });
  } catch (error: any) {
    console.error("Error creating team member:", error);
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}