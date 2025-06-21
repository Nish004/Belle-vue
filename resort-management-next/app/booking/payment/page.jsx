'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

export default function PaymentPage() {
  const router = useRouter(); 
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  // Format card number as XXXX XXXX XXXX XXXX
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  // Format expiry as MM/YY
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length < 3) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  };

  const handleCardChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
  };

  const handleCVVChange = (e) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(cleaned);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    router.push('/booking/confirmation');
  };

  return (
    <Container className="py-5 mt-5" style={{ paddingTop: '100px' }}>
      <h2 className="text-center mb-4">Payment Details</h2>
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
    </Container>
  );
}
