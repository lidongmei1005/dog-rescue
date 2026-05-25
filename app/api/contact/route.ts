import { NextRequest, NextResponse } from "next/server";
import { execute, initDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    await execute("INSERT INTO contact_messages (name, email, subject, message) VALUES (?,?,?,?)", [body.name, body.email, body.subject, body.message]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
