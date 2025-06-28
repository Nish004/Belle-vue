import { promises as fs } from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import { pool } from '@/config/db';
import { verifyAdminRequest } from '@/lib/verifyAdminRequest';

export const config = {
  api: {
    bodyParser: false, // required for formidable
  },
};

// 🟩 POST → Add new room (admin)
export async function POST(req) {
  try {
    await verifyAdminRequest(req);

    const form = new IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure upload folder exists
    await fs.mkdir(uploadDir, { recursive: true });

    const data = await new Promise((resolve, reject) => {
      form.uploadDir = uploadDir;
      form.keepExtensions = true;

      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { name, price, description } = data.fields;
    const image = data.files.image;

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
    });
  } catch (err) {
    console.error('[ADD ROOM ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to add room' }), { status: 500 });
  }
}

// 🟦 GET → Fetch all rooms (user)
export async function GET() {
  try {
    const [rooms] = await pool.query(
      'SELECT id, name, price, description, image AS image_url FROM rooms'
    );

    return Response.json(rooms);
  } catch (err) {
    console.error('[GET ROOMS ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch rooms' }), {
      status: 500,
    });
  }
}
