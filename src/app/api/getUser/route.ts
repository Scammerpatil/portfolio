import Project from "@/models/Project";
import { NextResponse } from "next/server";
import dbConfig from "@/middleware/db.config";
import Language from "@/models/Language";
import Review from "@/models/Review";
import Visitor from "@/models/Visitor";
import User from "@/models/User";
import Experience from "@/models/Experience";

dbConfig();

export async function GET() {
  const user = await User.find({});
  const languages = await Language.find({});
  const reviews = await Review.find({});
  const projects = await Project.find({});
  const visitorCount = await Visitor.countDocuments();
  const experience = await Experience.find({});
  return NextResponse.json({
    name: user[0].name,
    bio: user[0].bio,
    stack: user[0].stack,
    email: user[0].email,
    phone: user[0].phone,
    socialLinks: user[0].socialLinks,
    languages,
    testimonials: reviews,
    projects,
    visitorCount,
    experience,
  });
}
