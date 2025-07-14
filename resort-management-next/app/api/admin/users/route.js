import db from '@/config/db';
import { verifyAdminRequest } from '@/lib/verifyAdmin'; // 🛡️ Importing admin protection

export async function GET(req) {
  try {
    const admin = verifyAdminRequest(req); // 🛡️ Only admins allowed

    const [rows] = await db.execute(
      `SELECT id, name, email, password, phone, address, pincode, role, created_at 
       FROM users 
       WHERE role != 'admin'
       ORDER BY created_at DESC`
    );

    return Response.json(rows);
  } catch (err) {
    console.error('[ADMIN USERS GET ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}
