import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = getDb();
    db.prepare(`
      INSERT INTO adoption_applications (dog_id, dog_name, applicant_name, email, phone, reason, experience, home_type, other_pets)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(body.dog_id, body.dog_name, body.applicant_name, body.email, body.phone, body.reason, body.experience, body.home_type, body.other_pets);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
