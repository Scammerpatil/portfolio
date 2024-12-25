import { uploadOnCloudinary } from "@/helper/uploadCloudinary";
import dbConfig from "@/middleware/db.config";
import Experience from "@/models/Experience";
import { Experience as ExperienceType } from "@/types/Experience";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    // Ensure request has formData
    if (!req.body) {
      return NextResponse.json(
        { error: "Invalid request body. Expected form data." },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // Extract and validate fields
    const role = formData.get("role") as string;
    const company = formData.get("company") as string;
    const date = formData.get("date") as string;
    const desc = formData.get("desc") as string;
    const imageFile = formData.get("image") as File | null;
    const skillsInput = formData.get("skills") as string | null;
    const companyURL = formData.get("companyURL") as string;

    // Check for required fields
    if (
      !role ||
      !company ||
      !date ||
      !desc ||
      !imageFile ||
      !skillsInput ||
      !companyURL
    ) {
      return NextResponse.json(
        {
          error:
            "All fields (role, company, date, desc, image, skill) are required.",
        },
        { status: 400 }
      );
    }

    // Validate and process skills
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

    // Process image file
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    const uploadedImage = (await uploadOnCloudinary(
      imageBuffer,
      "experience",
      role
    )) as { secure_url: string };
    if (!uploadedImage || !uploadedImage.secure_url) {
      return NextResponse.json(
        { error: "Failed to upload the image to Cloudinary." },
        { status: 500 }
      );
    }

    // Prepare new experience data
    const newExperience: ExperienceType = {
      role,
      company,
      date,
      desc,
      image: uploadedImage.secure_url,
      skills,
      companyURL,
    };

    // Create experience in database
    const experience = await Experience.create(newExperience);

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
