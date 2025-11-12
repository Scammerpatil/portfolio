import dbConfig from "@/config/db.config";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

const commentCache = new Map<string, { comments: any[]; timestamp: number }>();
const TTL = 30 * 1000; // 30 seconds cache to prevent duplicate writes

function generateMeaningfulUsernames(count: number): string[] {
  const adjectives = [
    "Curious",
    "Sleepy",
    "Happy",
    "Brave",
    "Witty",
    "Gentle",
    "Lucky",
    "Mighty",
    "Quiet",
    "Clever",
    "Fuzzy",
    "Calm",
    "Bold",
    "Bright",
    "Chill",
  ];

  const nouns = [
    "Fox",
    "Cat",
    "Dog",
    "Panda",
    "Eagle",
    "Otter",
    "Hawk",
    "Tiger",
    "Bear",
    "Dolphin",
    "Lion",
    "Wolf",
    "Koala",
    "Raven",
    "Whale",
  ];

  const usernames = new Set<string>();
  while (usernames.size < count) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 9999);
    usernames.add(`${adj}${noun}${number}`);
  }
  return Array.from(usernames);
}

export async function POST(req: NextRequest) {
  try {
    const { slug, comment } = await req.json();
    if (!slug || !comment) {
      return NextResponse.json(
        { message: "Slug and comment are required" },
        { status: 400 }
      );
    }

    const now = Date.now();
    const cached = commentCache.get(slug);
    if (cached && now - cached.timestamp < TTL) {
      return NextResponse.json(
        { comments: cached.comments },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
          },
        }
      );
    }

    const username = generateMeaningfulUsernames(1)[0];
    const newComment = { user: username, comment };

    const updatedProject = await Project.findOneAndUpdate(
      { slug },
      { $push: { comments: newComment } },
      { new: true, projection: { comments: 1 } }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    commentCache.set(slug, {
      comments: updatedProject.comments,
      timestamp: now,
    });

    return NextResponse.json(
      { comments: updatedProject.comments },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Error in adding comment:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
