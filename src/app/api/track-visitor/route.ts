import Visitor from "@/models/Visitor";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const uniqueID = randomUUID();
  const newVisitor = new Visitor({ id: uniqueID });
  await newVisitor.save();
  return NextResponse.json({ uniqueID });
}
