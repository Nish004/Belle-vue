'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized access');
      return router.push('/login');
    }

    const user = JSON.parse(atob(token.split('.')[1]));
    if (user.role !== 'admin') {
      alert('You are not authorized to access this page');
      return router.push('/dashboard');
    }

    fetch('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Unexpected data:', data);
          alert(data.error || 'Failed to load users');
        }
      })
      .catch((err) => {
        console.error('Failed to load users', err);
        alert('Network error while loading users');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleView = (id) => {
    router.push(`/admin/users/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(`Are you sure you want to delete user ID ${id}?`);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        alert('User deleted successfully!');
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        alert(data.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error');
    }
  };

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Password</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Created</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{u.id}</td>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.password}</td>
              <td className="border px-2 py-1">{u.phone}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1">{new Date(u.created_at).toLocaleString()}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => handleView(u.id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  View More
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-500 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
