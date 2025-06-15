'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log('Register Page Loaded ✅'); // Debug message
  }, []);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Please enter a username');
      return;
    }
    localStorage.setItem('username', username);
    router.push('/dashboard');
  }

  return (
    <div style={{ padding: '2rem', color: 'black' }}>
      <h1>Register Page</h1> {/* ✅ Should be visible */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
