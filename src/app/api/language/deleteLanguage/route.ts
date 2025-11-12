import dbConfig from "@/config/db.config";
import Language from "@/models/Language";
import { NextRequest, NextResponse } from "next/server";
dbConfig();

export async function POST(req: NextRequest) {
  const { title, skillId } = await req.json();
  // Delete the skill from the database
  try {
    const language = await Language.findOne({ title });
    if (!language) {
      return NextResponse.json(
        { error: "Language not found." },
        { status: 404 }
      );
    }
    language.skills = language.skills.filter(
      (skill: any) => skill.name !== skillId
    );
    await language.save();
    return NextResponse.json(
      { message: "Skill deleted successfully." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete skill." },
      { status: 500 }
    );
  }
}
