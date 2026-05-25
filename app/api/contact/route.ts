import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = getDb();
    db.prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)")
      .run(body.name, body.email, body.subject, body.message);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
