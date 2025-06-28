'use client';
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Fade } from 'react-bootstrap';
import styles from './contact.module.css';
import Image from 'next/image';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Message not sent');
      
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Message failed. Please try again.');
    }
  };

  return (
    <div className={styles.fullPage}>
      <Container className={styles.contactContainer}>
        <Row className="align-items-center">
          <Col md={6} className={styles.leftPanel}>
            <Image
              src="/assets/contact.jpg"
              alt="Contact Belle Vue"
              width={600}
              height={400}
              className={styles.contactImage}
            />
            <h1 className={styles.title}>Belle Vue Resort</h1>
            <p className={styles.subtitle}>We’re here to help — reach out anytime.</p>
          </Col>

          <Col md={6}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send us a message</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    required
                    className={styles.input}
                    value={form.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    required
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="message" className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className={styles.input}
                    value={form.message}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" className={styles.sendButton}>
                    Submit
                  </Button>
                </div>

                <Fade in={submitted}>
                  <div>
                    <Alert variant="success" className="mt-3">
                      Message sent! We'll respond shortly.
                    </Alert>
                  </div>
                </Fade>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
