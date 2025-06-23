'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import Image from 'next/image';
import styles from './bookroom.module.css';

const rooms = [
  {
    id: 1,
    type: 'classic',
    name: 'Classic Room',
    description: 'Cozy room with essential amenities.',
    image: '/assets/rooms/classic1.avif',
    price: 120
  },
  {
    id: 2,
    type: 'corner',
    name: 'Corner Room',
    description: 'Spacious room with corner views.',
    image: '/assets/rooms/corner2.avif',
    price: 150
  },
  {
    id: 3,
    type: 'superior',
    name: 'Superior Room',
    description: 'Elegant room with premium furnishings.',
    image: '/assets/rooms/superior1.jfif',
    price: 200
  },
  {
    id: 4,
    type: 'Terrace',
    name: 'Terrace Room',
    description: 'Luxury room with private terrace.',
    image: '/assets/rooms/terrace1.jfif',
    price: 250
  },
  {
    id: 5,
    type: 'luxury_villa',
    name: 'Lakeside Villa',
    description: 'Private villa with panoramic lake views.',
    image: '/assets/Gallery1.jfif',
    price: 450
  },
  {
    id: 6,
    type: 'forest_suite',
    name: 'Forest Suite',
    description: 'Secluded suite nestled in the woods.',
    image: '/assets/Gallery2.jfif',
    price: 350
  },
  {
    id: 7,
    type: 'executive_room',
    name: 'Executive Room',
    description: 'Luxurious comfort with modern amenities.',
    image: '/assets/Gallery3.jfif',
    price: 275
  }
];

export default function BookRoomPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const router = useRouter();

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

  const handleClose = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  const handleConfirm = () => {
    if (!selectedRoom) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
    router.push('/booking/details');
  };

  return (
    <Container className="py-5 mt-5" style={{ paddingTop: '100px' }}>
      <h2 className="text-center mb-4">Book Your Stay</h2>
      <Row className="g-4">
        {rooms.map((room) => (
          <Col key={room.id} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <div className={styles.imageWrapper}>
                <Image
                  src={room.image}
                  alt={room.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-top"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>{room.description}</Card.Text>
                <div className="mt-auto">
                  <p><strong>${room.price}</strong> / night</p>
                  <Button variant="dark" onClick={() => handleBookClick(room)}>
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoom && (
            <>
              <h5>{selectedRoom.name}</h5>
              <p>{selectedRoom.description}</p>
              <p><strong>${selectedRoom.price}</strong> per night</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleConfirm}>
            Continue to Details
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
