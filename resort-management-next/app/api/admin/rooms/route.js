import { promises as fs } from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import { pool } from '@/config/db';
import { verifyAdminRequest } from '@/lib/verifyAdminRequest';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

function toNodeReadable(req) {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid body stream');
  }

  const stream = Readable.from(body);
  stream.headers = Object.fromEntries(req.headers.entries());
  stream.method = req.method;
  stream.url = req.url;
  return stream;
}

// 🟩 POST → Add room
export async function POST(req) {
  try {
    await verifyAdminRequest(req);

    const nodeReq = toNodeReadable(req);
    const form = new IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.uploadDir = uploadDir;
      form.keepExtensions = true;

      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { name, price, description } = fields;
    const image = files.image;

    let image_url = '';
    if (image && image[0]) {
      const fileName = path.basename(image[0].filepath);
      image_url = `/uploads/${fileName}`;
    }

    await pool.query(
      'INSERT INTO rooms (name, price, description, image) VALUES (?, ?, ?, ?)',
      [name[0], price[0], description[0], image_url]
    );

    return new Response(JSON.stringify({ message: 'Room added successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[ADD ROOM ERROR]', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to add room' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// 🟦 GET → Admin: View all rooms
export async function GET(req) {
  try {
    await verifyAdminRequest(req); // 🔒 Only admin can view this

    const [rooms] = await pool.query(
      'SELECT id, name, price, description, image AS image_url FROM rooms'
    );

    return new Response(JSON.stringify(rooms), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[ADMIN GET ROOMS ERROR]', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to fetch rooms' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
