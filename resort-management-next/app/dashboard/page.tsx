// app/dashboard/page.tsx
'use client';

export default function DashboardPage() {
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Dashboard</h1>
      <p>Hello, {username || 'Guest'}!</p>
    </div>
  );
}
