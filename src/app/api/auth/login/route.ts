import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    if (
      formData.email === "sauravpatil453@gmail.com" &&
      formData.password === "Saudip@123"
    ) {
      // Set Cookies
      const response = NextResponse.json({ message: "Login successful" });
      response.cookies.set("isAuthenticated", "true");
      return response;
    }
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  } catch (error) {
    console.log("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
