// COMPONENT: components/ChangePasswordForm.jsx
'use client';
import { useState } from 'react';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrent] = useState('');
  const [newPassword, setNew] = useState('');

  const handleChange = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/user/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div>
      <h3>Change Password</h3>
      <input type="password" placeholder="Current Password" value={currentPassword} onChange={e => setCurrent(e.target.value)} />
      <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNew(e.target.value)} />
      <button onClick={handleChange}>Change</button>
    </div>
  );
}