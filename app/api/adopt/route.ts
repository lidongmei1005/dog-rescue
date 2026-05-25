import { NextRequest, NextResponse } from "next/server";
import { execute, initDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    await execute(
      `INSERT INTO adoption_applications (dog_id, dog_name, applicant_name, email, phone, reason, experience, home_type, other_pets) VALUES (?,?,?,?,?,?,?,?,?)`,
      [body.dog_id, body.dog_name, body.applicant_name, body.email, body.phone, body.reason, body.experience, body.home_type, body.other_pets]
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
