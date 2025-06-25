'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function UserDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (!data?.user) return <p>No user found.</p>;

  const { user, bookings } = data;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Pincode:</strong> {user.pincode}</p>
      <p><strong>Joined On:</strong> {new Date(user.created_at).toLocaleString()}</p>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Booking History</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Booked At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.room_name}</td>
                <td>{new Date(b.check_in).toLocaleDateString()}</td>
                <td>{new Date(b.check_out).toLocaleDateString()}</td>
                <td>₹{b.total_price}</td>
                <td>{b.status}</td>
                <td>{new Date(b.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
