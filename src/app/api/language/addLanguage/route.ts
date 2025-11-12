import dbConfig from "@/config/db.config";
import Language from "@/models/Language";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { title, skills } = await req.json();
  try {
    const existingLanguage = await Language.findOne({ title });
    if (existingLanguage) {
      existingLanguage.skills.push(skills);
      await existingLanguage.save();
      return NextResponse.json(
        { message: "Language added successfully" },
        { status: 201 }
      );
    } else {
      const newLanguage = new Language({
        title,
        skills,
      });
      await newLanguage.save();
      return NextResponse.json(
        { message: "Language added successfully" },
        { status: 201 }
      );
    }
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
