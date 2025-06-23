// COMPONENT: components/ProfileDetails.jsx
'use client';
import { useEffect, useState } from 'react';

export default function ProfileDetails() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Address: {profile.address}</p>
      <p>Pincode: {profile.pincode}</p>
      <p>Phone: {profile.phone}</p>
    </div>
  );
}
