import { NextResponse } from 'next/server';
import db from '@/config/db';

export async function GET(req, context) {
  const { params } = context; // ✅ No await needed here

  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM bookings WHERE user_id = ?', [userId]);
    return NextResponse.json(rows);
  } catch (err) {
    console.error('[GET BOOKINGS BY USER]', err);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
