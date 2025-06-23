// COMPONENT: components/DeleteAccountButton.jsx
'use client';

export default function DeleteAccountButton() {
  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    const res = await fetch('/api/user/delete', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    alert(data.message || data.error);
    if (res.ok) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  return <button onClick={handleDelete}>Delete Account</button>;
}
