// FILE: /app/api/user/delete/route.js
import { pool } from '@/config/db';
import jwt from 'jsonwebtoken';

export async function DELETE(req) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
    return Response.json({ message: 'Account deleted' });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete account' }), { status: 500 });
  }
}