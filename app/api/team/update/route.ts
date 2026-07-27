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

    // Identify Target Resource
    const memberIdStr = formData.get("memberId") || formData.get("id");
    if (!memberIdStr) {
      return sendErrorResponse(
        "Valid item Identification (memberId/id) is required.",
        200
      );
    }
    const memberId = Number(memberIdStr);

    const teamMember = await TeamModel.findOne({ id: memberId });
    if (!teamMember) {
      return sendErrorResponse("Team member not found", 200);
    }

    // Text fields
    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const specialization = formData.get("specialization") as string;

    // Social links
    const linkedin = formData.get("linkedin") as string | null;
    const instagram = formData.get("instagram") as string | null;
    const facebook = formData.get("facebook") as string | null;

    // Image
    const profileImage = formData.get("profileImage") as File | null;

    // Store updated paths & IDs
    let profileImagePath = teamMember.profileImagePath;
    let profileImageId = teamMember.profileImageId;

    // Handle profile image update
    if (profileImage) {
      if (profileImageId) {
        await ImageKitService.deleteImage(profileImageId);
      }
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

    // Update document fields
    teamMember.title = title || teamMember.title;
    teamMember.firstName = firstName || teamMember.firstName;
    teamMember.lastName = lastName !== null ? lastName : teamMember.lastName;
    teamMember.specialization = specialization || teamMember.specialization;

    teamMember.profileImagePath = profileImagePath;
    teamMember.profileImageId = profileImageId;

    // Update social links
    teamMember.socialLinks = {
      linkedin: linkedin !== null ? linkedin : teamMember.socialLinks?.linkedin || "",
      instagram: instagram !== null ? instagram : teamMember.socialLinks?.instagram || "",
      facebook: facebook !== null ? facebook : teamMember.socialLinks?.facebook || "",
    };

    await teamMember.save();

    return sendSuccessResponse("Team member updated successfully", {
      teamMember,
    });
  } catch (error: any) {
    return sendErrorResponse(error?.message || "Unexpected error", 200);
  }
}