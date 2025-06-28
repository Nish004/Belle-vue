// GET all rooms (public/user-side)
import { pool } from '@/config/db';

export async function GET() {
  try {
    const [rooms] = await pool.query('SELECT id, name, type, description, image AS image_url, price FROM rooms');
    return Response.json(rooms);
  } catch (err) {
    console.error('[PUBLIC ROOMS ERROR]', err);
    return Response.json({ error: 'Failed to load rooms' }, { status: 500 });
  }
}
