import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, password, address, pincode, phone } = await req.json();

  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    // check if email already exists
    const [existing] = await conn.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      await conn.end();
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await conn.execute(
      `INSERT INTO users (name, email, password, address, pincode, phone, role)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, address, pincode, phone, 'user']
    );

    await conn.end();
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (err) {
    console.error('[REGISTER ERROR]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
