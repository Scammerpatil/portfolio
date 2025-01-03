import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId } = await req.json();
  try {
    await Project.findByIdAndDelete(projectId);
    return NextResponse.json({ message: "Project deleted successfully!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 }
    );
  }
}
