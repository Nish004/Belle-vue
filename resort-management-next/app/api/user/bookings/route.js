import db from '@/config/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// 🟩 Save booking with per-person-per-day pricing
export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const body = await req.json();
    const { room_id, check_in, check_out, guests } = body;

    if (!room_id || !check_in || !check_out || !guests) {
      return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
    }

    // 🧠 Calculate number of days
    const inDate = new Date(check_in);
    const outDate = new Date(check_out);
    const numDays = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    if (numDays <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid date range' }), { status: 400 });
    }

    // 💸 Get price per person per day from rooms table
    const [roomRows] = await db.execute('SELECT price FROM rooms WHERE id = ?', [room_id]);
    if (roomRows.length === 0) {
      return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404 });
    }

    const pricePerPersonPerDay = roomRows[0].price;
    const total_price = pricePerPersonPerDay * guests * numDays;

    await db.execute(
      'INSERT INTO bookings (user_id, room_id, check_in, check_out, total_price, guests) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, room_id, check_in, check_out, total_price, guests]
    );

    return new Response(JSON.stringify({ message: 'Booking saved', total_price }), { status: 201 });
  } catch (err) {
    console.error('[BOOKING POST ERROR]', err);
    return new Response(JSON.stringify({ error: 'Server error', details: err.message }), { status: 500 });
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

    const [rows] = await db.execute(
      `SELECT 
          b.id, b.check_in, b.check_out, b.total_price, b.status, b.guests,
          b.created_at, r.name AS room_name, r.image AS room_image
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
