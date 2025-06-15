'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log("Login Page Loaded");  // ✅ Check console
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Please enter username');
      return;
    }
    localStorage.setItem('username', username);
    router.push('/dashboard');
  }

  return (
    <div style={{ padding: '2rem', color: 'black' }}>
      <h1>Login Page</h1> {/* ✅ Make sure this is visible */}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
