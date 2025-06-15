'use client';

import { Container, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function BookingConfirmationPage() {
  const router = useRouter();

  return (
    <Container className="py-5 mt-5" style={{ paddingTop: '100px' }}>
      <Card className="text-center p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="mb-3">Thank You for Your Booking!</h2>
        <p className="mb-4">
          Your reservation has been confirmed. We’ve sent a confirmation email with your booking details.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Button variant="dark" onClick={() => router.push('/')}>
            Back to Home
          </Button>
          <Button variant="outline-dark" onClick={() => router.push('/booking/details')}>
            Book Another Room
          </Button>
        </div>
      </Card>
    </Container>
  );
}
