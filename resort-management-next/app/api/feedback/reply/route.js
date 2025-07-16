import db from '@/config/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Allow only admin
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
    }

    const adminId = decoded.id;
    const { feedback_id, reply } = await req.json();

    if (!feedback_id || !reply) {
      return NextResponse.json({ error: 'Missing feedback_id or reply' }, { status: 400 });
    }

    await db.execute(
      'INSERT INTO feedback_reply (feedback_id, admin_id, reply) VALUES (?, ?, ?)',
      [feedback_id, adminId, reply]
    );

    return NextResponse.json({ success: true, message: 'Reply saved' }, { status: 201 });
  } catch (err) {
    console.error('[FEEDBACK REPLY POST ERROR]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
