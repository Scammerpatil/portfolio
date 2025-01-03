import dbConfig from "@/middleware/db.config";
import Language from "@/models/Language";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PUT(req: NextRequest) {
  const { title, skills } = await req.json();
  console.log(title, skills);
  if (!title || !skills) {
    return NextResponse.json(
      { message: "Title and skills are required" },
      { status: 400 }
    );
  }
  try {
    const existingLanguage = await Language.findOne({ title });
    if (existingLanguage) {
      existingLanguage.skills = skills;
      await existingLanguage.save();
      return NextResponse.json(
        { message: "Language updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Language not found" },
        { status: 404 }
      );
    }
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update language" },
      { status: 500 }
    );
  }
}
