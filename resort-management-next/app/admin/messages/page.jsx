'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Table, Alert } from 'react-bootstrap';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/admin/messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setMessages(data);
      } catch (err) {
        console.error('Failed to load messages:', err);
        setError('Unable to fetch messages.');
      }
    };
    fetchMessages();
  }, []);

  return (
    <Container className="mt-4">
      <h3>Customer Contact Messages</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {messages.length === 0 ? (
        <p className="text-muted mt-4">No messages received yet.</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg.id}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
