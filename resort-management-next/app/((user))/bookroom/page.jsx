'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import Image from 'next/image';
import styles from './bookroom.module.css';

export default function BookRoomPage() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        const contentType = res.headers.get('content-type');

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || 'Failed to fetch rooms');
        }

        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          setRooms(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('❌ Failed to fetch rooms:', err.message);
        alert('Could not load rooms. Please try again later.');
      }
    };

    fetchRooms();
  }, []);

  const handleBookClick = (room) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book a room');
      router.push('/login');
      return;
    }

    localStorage.setItem('selectedRoom', JSON.stringify(room));
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirm = () => {
    if (!selectedRoom) return;
    localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
    router.push('/booking/details');
  };

  if (!isClient) return null;

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <div className={styles.headingWrapper}>
          <h2 className={styles.title}>Book Your Stay</h2>
        </div>
        <Row className="g-4">
          {rooms.map((room) => (
            <Col key={room.id} xs={12} sm={6} md={6} lg={3}>
              <Card className={`h-100 shadow-sm ${styles.card}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={room.image_url}
                    alt={room.name}
                    width={400}
                    height={250}
                    style={{
                      objectFit: 'cover',
                      borderTopLeftRadius: '1rem',
                      borderTopRightRadius: '1rem',
                    }}
                    className="w-100"
                  />
                </div>
                <Card.Body className={styles.cardBody}>
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>{room.description}</Card.Text>
                  <div className="mt-auto">
                    <p className={styles.price}>₹{room.price} / night</p>
                    <Button className={styles.buttonDark} onClick={() => handleBookClick(room)}>
                      Book Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {rooms.length === 0 && (
          <div className="text-center mt-5 text-muted">
            <h5>No rooms available</h5>
          </div>
        )}

        {/* Modal */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRoom && (
              <>
                <h5>{selectedRoom.name}</h5>
                <p>{selectedRoom.description}</p>
                <p>
                  <strong>₹{selectedRoom.price}</strong> per night
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="dark" onClick={handleConfirm}>Continue to Details</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
