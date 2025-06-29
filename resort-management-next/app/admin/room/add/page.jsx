'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRoomPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    if (file) formData.append('image', file);

    try {
      const res = await fetch('/api/admin/rooms', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      let result = {};
      try {
        result = await res.json();
      } catch {
        result = { error: 'Server returned no data' };
      }

      if (!res.ok) throw new Error(result.error || 'Upload failed');
      alert('Room added successfully!');
      router.push('/admin/room');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Room</h3>
      <form onSubmit={handleSubmit} className="mt-3" encType="multipart/form-data">
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
          value={form.price}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          required
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <input
          type="file"
          name="image"
          className="form-control mb-2"
          accept="image/*"
          onChange={handleFileChange}
        />
        {preview && (
          <img src={preview} alt="Preview" className="mb-3" style={{ maxHeight: '120px' }} />
        )}

        <button type="submit" className="btn btn-success">Add Room</button>
      </form>
    </div>
  );
}
