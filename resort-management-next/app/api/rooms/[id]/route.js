// ✅ correct
import { pool } from '@/config/db';

export async function GET(req, { params }) {
  try {
    console.log('[PUBLIC] Get single room:', params.id);
    const [rows] = await pool.query('SELECT id, name, type, description, image AS image_url, price FROM rooms WHERE id = ?', [params.id]);
    if (rows.length === 0) {
      return Response.json({ error: 'Room not found' }, { status: 404 });
    }
    return Response.json(rows[0]);
  } catch (err) {
    console.error('[PUBLIC ROOM GET ERROR]', err);
    return Response.json({ error: 'Could not fetch room' }, { status: 500 });
  }
}
