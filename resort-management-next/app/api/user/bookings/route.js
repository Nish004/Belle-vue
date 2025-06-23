import { pool } from '@/app/config/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// 🟩 Save booking
export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure SECRET_KEY matches
    const userId = decoded.id;

    // ✅ Parse JSON safely
    const body = await req.json();
    const { room_id, check_in, check_out, total_price } = body;
    console.log()
    if (!room_id || !check_in || !check_out || !total_price) {
      return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
    }

    await pool.query(
      'INSERT INTO bookings (user_id, room_id, check_in, check_out, total_price) VALUES (?, ?, ?, ?, ?)',
      [userId, room_id, check_in, check_out, total_price]
    );

    return new Response(JSON.stringify({ message: 'Booking saved' }), { status: 201 });
  } catch (err) {
  console.error('[BOOKING POST ERROR]', err);
  return new Response(JSON.stringify({
    error: 'Server error',
    details: err.message || err
  }), { status: 500 });
}

}


// 🟦 Get user's bookings
export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const [rows] = await pool.query(
      `SELECT 
          b.id,
          b.check_in,
          b.check_out,
          b.total_price,
          b.status,
          b.created_at,
          r.name AS room_name,
          r.image AS room_image
       FROM bookings b
       JOIN rooms r ON b.room_id = r.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('[BOOKING GET ERROR]', err.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
