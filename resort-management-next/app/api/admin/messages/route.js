import { pool } from '@/config/db';
import { verifyAdminRequest } from '@/lib/verifyAdminRequest';

export async function GET(req) {
  try {
    await verifyAdminRequest(req);

    const [rows] = await pool.query(
      'SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC'
    );

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    console.error('[ADMIN MESSAGE GET ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch messages' }), { status: 500 });
  }
}
