import { NextResponse } from 'next/server';
import db from '../../../config/db'; // ✅ correct
 // your database config path

// POST - Customer submits feedback
export async function POST(req) {
  const body = await req.json();
  const { user_id, booking_id, rating, comment } = body;

  if (!user_id || !rating) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await db.execute(
    'INSERT INTO feedback (user_id, booking_id, rating, comment) VALUES (?, ?, ?, ?)',
    [user_id, booking_id, rating, comment]
  );

  return NextResponse.json({ success: true, message: 'Feedback saved' });
}

// GET - Admin view all feedbacks
export async function GET() {
  const [rows] = await db.execute(`
    SELECT f.*, u.name AS username FROM feedback f
JOIN users u ON u.id = f.user_id
    ORDER BY f.created_at DESC
  `);

  return NextResponse.json({ feedbacks: rows });
}
