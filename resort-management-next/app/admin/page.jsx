// FILE: app/admin/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Access denied');
      return router.push('/login');
    }
    const user = JSON.parse(atob(token.split('.')[1]));
    if (user.role !== 'admin') {
      alert('You are not authorized');
      return router.push('/dashboard');
    }
    setAdmin(user);
  }, []);

  if (!admin) return <p>Loading admin dashboard...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛡️ Admin Dashboard</h1>
      <p>Welcome, <strong>{admin.name}</strong></p>
      <p>Email: {admin.email}</p>

      {/* 🔗 Links to admin features */}
      <ul style={{ marginTop: '2rem', lineHeight: '2' }}>
        <li><a href="/admin/users">👤 View All Users</a></li>
        <li><a href="/admin/bookings">📆 View All Bookings</a></li>
        <li><a href="/admin/room">🏨 Manage Rooms</a></li>
        <li><a href="/admin/messages">📩 View Contact Messages</a></li>
        <li><a href="/admin/feedbacks">💬 View & Reply Feedback</a></li> {/* ✅ New link */}
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
        style={{
          backgroundColor: '#f00',
          color: '#fff',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          marginTop: '1rem',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
}
