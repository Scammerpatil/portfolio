import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/config/db.config";

dbConfig();

const projectCache = new Map<string, { data: any; timestamp: number }>();
const TTL = 30 * 60 * 1000; // 30 minutes

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
    const cached = projectCache.get(slug);
    if (cached && now - cached.timestamp < TTL) {
      return NextResponse.json(
        { project: cached.data },
        {
          status: 200,
          headers: {
            "Cache-Control":
              "public, s-maxage=1800, stale-while-revalidate=300",
          },
        }
      );
    }

    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    projectCache.set(slug, { data: project, timestamp: now });

    return NextResponse.json(
      { project },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
