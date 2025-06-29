import { verifyAdminRequest } from '@/lib/verifyAdminRequest';
import { pool } from '@/config/db';

export async function GET(req, { params }) {
  try {
    await verifyAdminRequest(req);

    const roomId = params?.id;
    const [rows] = await pool.query(
      'SELECT id, name, price, description, image AS image_url FROM rooms WHERE id = ?',
      [roomId]
    );

    if (rows.length === 0) {
      return Response.json({ error: 'Room not found' }, { status: 404 });
    }

    return Response.json(rows[0]);
  } catch (err) {
    console.error('[ROOM GET ERROR]', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await verifyAdminRequest(req);
    const roomId = params?.id;
    const { name, price, description, image_url } = await req.json();

    await pool.query(
      'UPDATE rooms SET name = ?, price = ?, description = ?, image = ? WHERE id = ?',
      [name, price, description, image_url, roomId]
    );

    return Response.json({ message: 'Room updated successfully' });
  } catch (err) {
    console.error('[ROOM UPDATE ERROR]', err);
    return Response.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await verifyAdminRequest(req);
    const roomId = params?.id;

    const [result] = await pool.query('DELETE FROM rooms WHERE id = ?', [roomId]);

    if (result.affectedRows === 0) {
      return Response.json({ error: 'Room not found' }, { status: 404 });
    }

    return Response.json({ message: 'Room deleted successfully' });
  } catch (err) {
    console.error('[ROOM DELETE ERROR]', err);
    return Response.json({ error: 'Delete failed or unauthorized' }, { status: 500 });
  }
}
