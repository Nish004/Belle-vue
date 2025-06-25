'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';

export default function PaymentPage() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const room = JSON.parse(localStorage.getItem('selectedRoom'));
    const details = JSON.parse(localStorage.getItem('bookingDetails'));

    if (!room || !details) {
      alert('Booking data is missing.');
      router.push('/bookroom');
      return;
    }

    const inDate = new Date(details.check_in);
    const outDate = new Date(details.check_out);
    const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));

    setSelectedRoom(room);
    setBookingDetails({ ...details, nights });
  }, [router]);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length < 3) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  };

  const handleCardChange = (e) => setCardNumber(formatCardNumber(e.target.value));
  const handleExpiryChange = (e) => setExpiry(formatExpiry(e.target.value));
  const handleCVVChange = (e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));

  const handlePayment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!selectedRoom || !bookingDetails || !token) {
      alert('Invalid booking or session. Please start over.');
      return;
    }

    const total_price = Number(selectedRoom.price) * Number(bookingDetails.nights);

    const payload = {
      room_id: selectedRoom.id,
      check_in: bookingDetails.check_in,
      check_out: bookingDetails.check_out,
      total_price
    };

    try {
      setLoading(true);

      const res = await fetch('/api/user/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Server error');
      }

      localStorage.removeItem('selectedRoom');
      localStorage.removeItem('bookingDetails');

      setTimeout(() => {
        setLoading(false);
        router.push('/booking/confirmation');
      }, 1500);
    } catch (err) {
      setLoading(false);
      console.error('[SERVER ERROR]', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Container className="py-5 mt-5" style={{ paddingTop: '100px' }}>
      <h2 className="text-center mb-4">Payment Details</h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="dark" />
          <p className="mt-3">Processing your payment...</p>
        </div>
      ) : (
        <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
          <Form onSubmit={handlePayment}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Cardholder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name on card"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="expiry">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="password"
                    inputMode="numeric"
                    placeholder="123"
                    value={cvv}
                    onChange={handleCVVChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="dark" type="submit" className="w-100">
              Pay Now
            </Button>
          </Form>
        </Card>
      )}
    </Container>
  );
}
