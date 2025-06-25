'use client';
import { useEffect, useState } from 'react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/admin/bookings', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error('Failed to fetch bookings:', err));
  }, []);

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/admin/bookings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId: id, status: newStatus }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Status updated!');
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } else {
      alert(data.error || 'Update failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">📖 All Bookings</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
            <th>Booked On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user_name}</td>
              <td>{b.email}</td>
              <td>{b.room_name}</td>
              <td>{new Date(b.check_in).toLocaleDateString()}</td>
              <td>{new Date(b.check_out).toLocaleDateString()}</td>
              <td>
                <span
                  className={`badge ${
                    b.status === 'pending'
                      ? 'bg-warning'
                      : b.status === 'approved'
                      ? 'bg-success'
                      : 'bg-danger'
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td>{new Date(b.created_at).toLocaleString()}</td>
              <td>
                {b.status === 'pending' ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => updateStatus(b.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateStatus(b.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <i>No action</i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
