'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function ProfileDetails() {
  const { user, setUser } = useUser();
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setForm(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully');
        setEditing(false);
        setUser({ ...user, ...form }); // update context
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Server error');
    }
  };

  if (loading || !form) return <p>Loading profile...</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Welcome, {form.name}</h2>

      {['name', 'address', 'pincode', 'phone'].map((field) => (
        <div key={field} className="mb-2">
          <label className="block text-sm font-medium capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={form[field] || ''}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full p-2 border rounded ${
              editing ? 'bg-white' : 'bg-gray-100'
            }`}
          />
        </div>
      ))}

      <div className="mt-4">
        {!editing ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => {
                setEditing(false);
                setForm(user); // reset
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
