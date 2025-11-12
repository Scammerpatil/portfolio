import dbConfig from "@/config/db.config";
import Experience from "@/models/Experience";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const role = formData.get("role") as string;
    const company = formData.get("company") as string;
    const companyURL = formData.get("companyURL") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string | null;
    const desc = formData.get("desc") as string;
    const imageFile = formData.get("image") as File;
    const skillsInput = formData.get("skills") as string;

    const existingExperience = await Experience.findOne({ role, company });
    if (existingExperience) {
      existingExperience.startDate = startDate;
      existingExperience.endDate = endDate;
      existingExperience.desc = desc;
      existingExperience.companyURL = companyURL;
      const skills = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
      if (skills.length === 0) {
        return NextResponse.json(
          { error: "At least one skill must be provided." },
          { status: 400 }
        );
      }
      existingExperience.skills = skills;
      if (imageFile && imageFile.size > 0) {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        existingExperience.image = {
          data: imageBuffer,
          contentType: imageFile.type,
        };
      }
      await existingExperience.save();
      return NextResponse.json(
        {
          message: "Experience updated successfully",
          experience: existingExperience,
        },
        { status: 200 }
      );
    }

    const skills = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    if (skills.length === 0) {
      return NextResponse.json(
        { error: "At least one skill must be provided." },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const newExperience = new Experience({
      role,
      company,
      companyURL,
      startDate,
      endDate,
      desc,
      skills,
      image: { data: imageBuffer, contentType: imageFile.type },
    });
    const experience = await newExperience.save();
    return NextResponse.json(
      { message: "Experience created successfully", experience },
      { status: 201 }
    );
  } catch {
    console.error("Something went wrong while adding experience.");

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
