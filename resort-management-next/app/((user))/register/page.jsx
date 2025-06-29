'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    pincode: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key].trim()) {
        alert(`Please fill ${key}`);
        return;
      }
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registration successful! Please login.');
        router.push('/login');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Create Your Account</h1>
        <form onSubmit={handleRegister} className={styles.form}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={styles.inputField} />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={styles.inputField} />
          <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} className={styles.inputField} autoComplete="new-password" />
          <input type="text" name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} className={styles.inputField} />
          <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className={styles.inputField} />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={styles.inputField} />
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
        <p className={styles.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
