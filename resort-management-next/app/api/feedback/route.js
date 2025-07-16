import db from '@/config/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        f.id AS feedback_id,
        f.user_id,
        f.booking_id,
        f.rating,
        f.comment,
        f.created_at,
        u.name AS username,
        fr.reply,
        fr.created_at AS reply_created_at,
        a.name AS admin_name
      FROM feedback f
      JOIN users u ON f.user_id = u.id
      LEFT JOIN feedback_reply fr ON fr.feedback_id = f.id
      LEFT JOIN users a ON fr.admin_id = a.id
      ORDER BY f.created_at DESC
    `);

    return NextResponse.json({ feedbacks: rows }, { status: 200 });
  } catch (err) {
    console.error('[FEEDBACK GET ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}


// 🟡 POST new feedback
export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { rating, comment, booking_id } = await req.json();

    if (!rating || !comment) {
      return NextResponse.json({ error: 'Missing rating or comment' }, { status: 400 });
    }

    await db.execute(
      'INSERT INTO feedback (user_id, booking_id, rating, comment) VALUES (?, ?, ?, ?)',
      [userId, booking_id, rating, comment]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[FEEDBACK POST ERROR]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
