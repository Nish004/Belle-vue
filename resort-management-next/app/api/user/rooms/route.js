import { pool } from '@/app/config/db';
import { NextResponse } from 'next/server';

// GET all rooms
export async function GET() {
  try {
    const [rooms] = await pool.query('SELECT * FROM rooms ORDER BY id ASC');
    return NextResponse.json(rooms, { status: 200 });
  } catch (err) {
    console.error('[ROOMS GET ERROR]', err.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
