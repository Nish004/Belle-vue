import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    const [users] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    await conn.end();

    if (users.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // create JWT
    const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  },
  process.env.JWT_SECRET, // ✅ Secure, uses value from .env.local
  { expiresIn: '1h' }
);


    return NextResponse.json({ token });
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
