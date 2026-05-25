import { NextRequest, NextResponse } from "next/server";
import { execute, initDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    await execute("INSERT INTO volunteer_signups (name, email, phone, interests, availability) VALUES (?,?,?,?,?)", [body.name, body.email, body.phone, body.interests, body.availability]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
