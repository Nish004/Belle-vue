import { pool } from '@/config/db';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    await pool.query(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    return new Response(JSON.stringify({ message: 'Message sent successfully' }), { status: 201 });
  } catch (err) {
    console.error('[CONTACT MESSAGE ERROR]', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
