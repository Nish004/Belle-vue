'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Please enter email and password');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Invalid email or password');
        return;
      }

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(payload));

      alert('Login successful!');

      if (payload.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Welcome Back</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            autoComplete="current-password"
          />
          <button type="submit" className={styles.submitButton}>Login</button>
        </form>
        <p className={styles.loginLink}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
