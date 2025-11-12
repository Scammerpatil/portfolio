import dbConfig from "@/config/db.config";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { newProject } = await req.json();
  try {
    await Project.findOneAndUpdate(newProject);
    return NextResponse.json({ message: "Project updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
