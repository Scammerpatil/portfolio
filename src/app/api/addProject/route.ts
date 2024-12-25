import { NextRequest, NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/helper/uploadCloudinary";
import Project from "@/models/Project";
import dbConfig from "@/middleware/db.config";
import { ProjectData } from "@/types/Project";

dbConfig();

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    // Extract fields from form data
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const live = formData.get("live") === "true";
    const technologies = (formData.get("technologies")! as string)
      .split(",")
      .map((stack) => stack.trim()) as string[];
    const link = formData.get("link") as string | undefined;
    const github = formData.get("github") as string;
    const stack = formData.get("stack") as string;

    // Validate required fields
    if (!title || !desc || !github || !stack || !formData.get("image")) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Extract and upload the image
    const imageFile = formData.get("image") as File;
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadedImageUrl = (await uploadOnCloudinary(
      imageBuffer,
      "projects",
      title
    )) as { secure_url: string };

    // Save the project to the database
    const newProject: ProjectData = {
      title,
      desc,
      live,
      technologies,
      link,
      github,
      stack,
    };

    const project = await Project.create({
      ...newProject,
      image: uploadedImageUrl.secure_url,
    });

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
