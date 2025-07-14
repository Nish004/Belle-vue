import { NextResponse } from "next/server";
import db from '../../../../config/db';

export async function POST(req) {
  const { feedback_id, admin_id, reply } = await req.json();

  await db.execute(
    'INSERT INTO feedback_reply (feedback_id, admin_id, reply) VALUES (?, ?, ?)',
    [feedback_id, admin_id, reply]
  );

  return NextResponse.json({ success: true, message: "Reply submitted!" });
}
