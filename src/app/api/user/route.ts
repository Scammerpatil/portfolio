import Project from "@/models/Project";
import { NextResponse } from "next/server";
import dbConfig from "@/config/db.config";
import Language from "@/models/Language";
import Review from "@/models/Review";
import Visitor from "@/models/Visitor";
import User from "@/models/User";
import Experience from "@/models/Experience";

dbConfig();

let cachedData: any = null;
let lastFetched = 0;
const TTL = 30 * 60 * 1000;

export async function GET() {
  try {
    const now = Date.now();

    if (cachedData && now - lastFetched < TTL) {
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
        },
      });
    }

    const [user, languages, reviews, projects, visitor, experience] =
      await Promise.all([
        User.findOne({ email: "sauravpatil.rcpit@gmail.com" }),
        Language.find({}),
        Review.find({ approved: true }),
        Project.find({}),
        Visitor.findOne(),
        Experience.find({}),
      ]);

    if (!user) {
      throw new Error("User not found in database");
    }

    const responseData = {
      name: user.name,
      bio: user.bio,
      stack: user.stack,
      email: user.email,
      phone: user.phone,
      socialLinks: user.socialLinks,
      languages,
      testimonials: reviews,
      projects,
      visitorCount: visitor?.visitorCount || 0,
      experience,
    };

    cachedData = responseData;
    lastFetched = now;

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
