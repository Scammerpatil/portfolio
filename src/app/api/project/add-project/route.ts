import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import dbConfig from "@/config/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const desc = formData.get("desc") as string;
    const industry = formData.get("industry") as string;
    const challenge = formData.get("challenge") as string;
    const solution = formData.get("solution") as string;
    const bannerImage = formData.get("bannerImage") as File;
    const images = formData.getAll("images") as File[];

    const features = formData.get("features") as string | "";
    const liveLink = formData.get("liveLink") as string | "";
    const technologies = formData.get("technologies") as string | "";
    const github = formData.get("github") as string;
    const envVariables = formData.get("envVariables") as string | "";
    const testimonialClientFeedback = formData.get(
      "testimonialClientFeedback"
    ) as string | "";
    const testimonialClientName = formData.get("testimonialClientName") as
      | string
      | "";
    const stack = formData.get("stack") as string;

    const processedImages = await Promise.all(
      images
        .filter((file) => file && file.size > 0)
        .map(async (file: File) => ({
          data: Buffer.from(await file.arrayBuffer()),
          contentType: file.type || "image/png",
        }))
    );
    let cleanedTechnologies = [];
    try {
      const parsed = JSON.parse(technologies);
      cleanedTechnologies = parsed
        .filter((tech: any) => tech.stack && Array.isArray(tech.technologies))
        .map((tech: any) => ({
          stack: tech.stack,
          technologies: tech.technologies.filter(
            (t: string) => t.trim() !== ""
          ),
        }));
    } catch (err) {
      console.warn("Invalid technologies format:", technologies);
    }

    const newProject = {
      name,
      title,
      slug,
      desc,
      industry,
      challenge,
      solution,
      bannerImage: bannerImage
        ? {
            data: Buffer.from(await bannerImage.arrayBuffer()),
            contentType: bannerImage.type || "image/png",
          }
        : undefined,
      images: processedImages,
      liveLink,
      technologies: cleanedTechnologies,
      features: features.split("\n").filter((f) => f.trim() !== ""),
      envVariables: envVariables.split("\n").filter((v) => v.trim() !== ""),
      testimonial: {
        clientFeedback: testimonialClientFeedback,
        clientName: testimonialClientName,
      },
      github,
      stack,
      date: new Date(),
    };

    const existingProject = await Project.findOne({ slug });

    if (existingProject) {
      const updatedProject = await Project.findOneAndUpdate(
        { slug },
        { $set: newProject },
        { new: true }
      );
      return NextResponse.json(
        { message: "Project updated successfully", project: updatedProject },
        { status: 200 }
      );
    }

    const project = await Project.create(newProject);

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating/updating project:", error);
    return NextResponse.json(
      { error: "Failed to create or update project" },
      { status: 500 }
    );
  }
}
