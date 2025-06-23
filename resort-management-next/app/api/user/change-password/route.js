// FILE: /app/api/user/change-password/route.js
import { pool } from '@/app/config/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { currentPassword, newPassword } = await req.json();

    const [rows] = await pool.query('SELECT password FROM users WHERE id = ?', [user.id]);
    const valid = await bcrypt.compare(currentPassword, rows[0].password);
    if (!valid) return new Response(JSON.stringify({ error: 'Wrong current password' }), { status: 401 });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, user.id]);
    return Response.json({ message: 'Password changed' });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to change password' }), { status: 500 });
  }
}
