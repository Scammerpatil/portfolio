import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/config/db.config";

dbConfig();

const likeCache = new Map<string, { likes: number; timestamp: number }>();
const TTL = 30 * 1000; // 30 seconds — prevents rapid duplicate DB writes

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    const now = Date.now();
    const cached = likeCache.get(slug);

    // Prevent DB spam if same project is liked repeatedly within TTL
    if (cached && now - cached.timestamp < TTL) {
      return NextResponse.json(
        {
          message: "Project liked successfully (cached)",
          likes: cached.likes,
        },
        { status: 200 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { slug },
      { $inc: { likes: 1 } },
      { new: true, projection: { likes: 1 } }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    likeCache.set(slug, { likes: updatedProject.likes, timestamp: now });

    return NextResponse.json(
      {
        message: "Project liked successfully",
        likes: updatedProject.likes,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Error in liking project:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
