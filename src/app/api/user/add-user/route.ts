import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, stack, bio, email, phone, socialLinks } = await req.json();
  const newUser = new User({
    name,
    stack,
    bio,
    email,
    phone,
    socialLinks,
  });
  try {
    const user = await newUser.save();
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create Message" },
      { status: 500 }
    );
  }
}
