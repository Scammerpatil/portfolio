import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/config/db.config";
import Language from "@/models/Language";
import Review from "@/models/Review";
import Visitor from "@/models/Visitor";
import User from "@/models/User";
import Experience from "@/models/Experience";

dbConfig();

let cachedAdminData: any = null;
let cachedPublicData: any = null;

let adminLastFetched = 0;
let publicLastFetched = 0;

const TTL = 30 * 60 * 1000;
const isDev = process.env.NODE_ENV === "development";

const cacheHeaders = isDev
  ? { "Cache-Control": "no-store" }
  : { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300" };

export async function GET(req: NextRequest) {
  try {
    const now = Date.now();
    const params = req.nextUrl.searchParams;
    const isAdmin = params.get("user") === "admin";

    const cache = isAdmin ? cachedAdminData : cachedPublicData;
    const lastFetched = isAdmin ? adminLastFetched : publicLastFetched;

    if (!isDev && cache && now - lastFetched < TTL) {
      return NextResponse.json(cache, {
        status: 200,
        headers: {
          ...cacheHeaders,
        },
      });
    }

    const reviewQuery = isAdmin ? {} : { approved: true };
    const projectQuery = isAdmin ? {} : { approved: true };
    const [user, languages, reviews, projects, visitor, experience] =
      await Promise.all([
        User.findOne({ email: "sauravpatil.rcpit@gmail.com" }),
        Language.find({}),
        Review.find(reviewQuery),
        Project.find(projectQuery),
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

    if (!isDev) {
      if (isAdmin) {
        cachedAdminData = responseData;
        adminLastFetched = now;
      } else {
        cachedPublicData = responseData;
        publicLastFetched = now;
      }
    }

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        ...cacheHeaders,
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