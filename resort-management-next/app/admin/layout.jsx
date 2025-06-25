// FILE: app/admin/layout.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin') router.push('/dashboard');
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column">
      <header className="bg-dark text-white p-3">
        <h2 className="mb-0">🛡️ Admin Panel</h2>
      </header>

      <main className="flex-grow-1 p-4">
        {children}
      </main>

      <footer className="bg-light text-center text-muted py-3">
        &copy; {new Date().getFullYear()} Belle Vue Resort | Admin Dashboard
      </footer>
    </div>
  );
}
