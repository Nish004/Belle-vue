'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/admin/rooms/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setForm(data);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.error('Fetch failed:', err);
        alert('Room not found');
        router.push('/admin/room');
      }
    };
    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/rooms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Update failed');
      router.push('/admin/room');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update room');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Room</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Room Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          required
          value={form.price?.toString() || ''}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          required
          value={form.description || ''}
          onChange={handleChange}
        ></textarea>
        <input
          name="image_url"
          className="form-control mb-2"
          placeholder="Image URL"
          value={form.image_url || ''}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Update Room</button>
      </form>
    </div>
  );
}
