import jwt from 'jsonwebtoken';

export async function verifyAdminRequest(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new Error('Missing token');

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== 'admin') throw new Error('Unauthorized');

  return decoded;
}
