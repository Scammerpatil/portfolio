import dbConfig from "@/config/db.config";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PATCH(req: NextRequest) {
  try {
    const { projectId, approved } = await req.json();
    console.log("Received request to update project status:", { projectId, approved });
    if (!projectId || typeof approved !== "boolean") {
      return NextResponse.json(
        { error: "projectId and approved are required." },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: { approved } },
      { returnDocument: "after" }
    );

    console.log(`Project ${projectId} approval status updated to ${approved}`);

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project status updated successfully", project: updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update project status:", error);
    return NextResponse.json(
      { error: "Failed to update project status." },
      { status: 500 }
    );
  }
}
