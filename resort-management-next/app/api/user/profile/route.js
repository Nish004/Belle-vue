// FILE: /app/api/user/profile/route.js
import { pool } from '@/app/config/db';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);


    const [rows] = await pool.query('SELECT name, email, address, pincode, phone FROM users WHERE id = ?', [user.id]);
    return Response.json(rows[0]);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}

export async function PUT(req) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const body = await req.json();
    const { name, address, pincode, phone } = body;

    await pool.query(
      'UPDATE users SET name=?, address=?, pincode=?, phone=? WHERE id=?',
      [name, address, pincode, phone, user.id]
    );
    return Response.json({ message: 'Profile updated' });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update profile' }), { status: 400 });
  }
}