import { verifyAdminRequest } from '../../../../lib/verifyAdminRequest';
import { pool } from '@/config/db';

export async function GET(req) {
  try {
    await verifyAdminRequest(req);

    const [bookings] = await pool.query(`
      SELECT b.id, b.status, b.check_in, b.check_out, b.created_at,
             u.name as user_name, u.email, r.name as room_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN rooms r ON b.room_id = r.id
      ORDER BY b.created_at DESC
    `);

    return Response.json(bookings);
  } catch (err) {
    console.error('[ADMIN BOOKINGS GET ERROR]', err);
    return Response.json({ error: 'Unauthorized or DB error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await verifyAdminRequest(req);
    const body = await req.json();
    const { bookingId, status } = body;

    if (!['approved', 'rejected'].includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 });
    }

    await pool.query(`UPDATE bookings SET status = ? WHERE id = ?`, [status, bookingId]);
    return Response.json({ message: 'Booking status updated' });
  } catch (err) {
    console.error('[ADMIN BOOKINGS PUT ERROR]', err);
    return Response.json({ error: 'Unauthorized or update failed' }, { status: 500 });
  }
}
