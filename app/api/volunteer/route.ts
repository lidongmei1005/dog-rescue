import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = getDb();
    db.prepare("INSERT INTO volunteer_signups (name, email, phone, interests, availability) VALUES (?, ?, ?, ?, ?)")
      .run(body.name, body.email, body.phone, body.interests, body.availability);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
