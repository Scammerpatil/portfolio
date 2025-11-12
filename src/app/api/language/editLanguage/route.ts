import dbConfig from "@/config/db.config";
import Language from "@/models/Language";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PUT(req: NextRequest) {
  const { title, skill } = await req.json();
  if (!title || !skill) {
    return NextResponse.json(
      { message: "Title and skills are required" },
      { status: 400 }
    );
  }

  try {
    const existingLanguage = await Language.findOne({ title });
    if (existingLanguage) {
      // Check if the skill already exists
      const existingSkill = existingLanguage.skills.find(
        (s: { name: string; iconUrl: string }) =>
          s.name === skill.name || s.iconUrl === skill.iconUrl
      );

      if (existingSkill) {
        existingSkill.iconUrl = skill.iconUrl;
        existingSkill.name = skill.name;
      } else {
        existingLanguage.skills.push(skill);
      }

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
