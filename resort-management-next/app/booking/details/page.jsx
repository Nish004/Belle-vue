'use client';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from './details.module.css';

export default function BookingDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  // ✅ useEffect now correctly inside the component
  useEffect(() => {
    const storedRoom = localStorage.getItem('selectedRoom');
    if (!storedRoom) {
      alert('No room selected. Redirecting...');
      router.push('/bookroom');
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedRoom = JSON.parse(localStorage.getItem('selectedRoom'));
    if (!selectedRoom) {
      alert('No room selected');
      return;
    }

    const days =
      (new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24);
    const totalPrice = selectedRoom.price * days;

    const bookingData = {
      room_id: selectedRoom.id,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      total_price: totalPrice,
    };

    localStorage.setItem('bookingDetails', JSON.stringify(bookingData));
    router.push('/booking/payment');
  };

  return (
    <Container className="py-5 mt-5" style={{ paddingTop: '100px' }}>
      <h2 className="text-center mb-4">Guest Details</h2>

      <Form onSubmit={handleSubmit} className={styles.formWrapper}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="checkIn">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control
                name="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="checkOut">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control
                name="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4" controlId="guests">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control
            name="guests"
            type="number"
            min="1"
            max="10"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="dark" className={styles.submitButton}>
            Continue to Payment
          </Button>
        </div>
      </Form>
    </Container>
  );
}
