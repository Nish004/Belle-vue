import { pool } from '@/config/db';
import { verifyAdminRequest } from '@/lib/verifyAdmin'; // 🛡️ Admin check

export async function GET(req, { params }) {
  try {
    const admin = verifyAdminRequest(req); // 🛡️ Protect route
    const userId = params.id;

    const [[user]] = await pool.query(
      'SELECT id, name, email, phone, address, pincode, created_at FROM users WHERE id = ?',
      [userId]
    );

    const [bookings] = await pool.query(
      `SELECT b.*, r.name AS room_name
       FROM bookings b
       JOIN rooms r ON b.room_id = r.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    );

    return new Response(JSON.stringify({ user, bookings }), { status: 200 });
  } catch (err) {
    console.error('[ADMIN USER DETAIL ERROR]', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const admin = verifyAdminRequest(req); // 🛡️ Only admin can delete

    const userId = params.id;

    // First delete user's bookings (foreign key constraint)
    await pool.query('DELETE FROM bookings WHERE user_id = ?', [userId]);

    // Then delete the user
    await pool.query('DELETE FROM users WHERE id = ?', [userId]);

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (err) {
    console.error('[DELETE USER ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
  }
}
