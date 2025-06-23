'use client';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import Image from 'next/image';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('/api/user/bookings', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load bookings:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  if (!bookings.length) {
    return <p className="text-muted">No bookings found.</p>;
  }

  return (
    <div>
      <h3 className="mb-4">Booking History</h3>
      <Row className="g-4">
        {bookings.map((booking) => (
          <Col key={booking.id} md={6} lg={4}>
            <Card className="shadow-sm h-100">
              <div style={{ position: 'relative', height: '200px' }}>
                <Image
                  src={booking.room_image}
                  alt={booking.room_name || 'Booked Room'}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-top"
                />
              </div>
              <Card.Body>
                <Card.Title>{booking.room_name}</Card.Title>
                <Card.Text>
                  <strong>Check-in:</strong> {booking.check_in}<br />
                  <strong>Check-out:</strong> {booking.check_out}<br />
                  <strong>Total:</strong> ${booking.total_price}<br />
                  <strong>Status:</strong> {booking.status}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
