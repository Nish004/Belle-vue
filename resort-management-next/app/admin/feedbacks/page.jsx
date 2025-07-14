'use client';
import { useEffect, useState } from 'react';

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/feedback');
        const data = await res.json();
        setFeedbacks(data.feedbacks);
      } catch (err) {
        console.error('Failed to fetch feedbacks:', err);
      }
    };

    fetchFeedbacks();
  }, []);

  const sendReply = async (feedback_id) => {
    const reply = replies[feedback_id];
    if (!reply) return;

    try {
      const res = await fetch('/api/feedback/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback_id,
          admin_id: 1, // TODO: Replace with actual admin ID from session later
          reply
        })
      });

      if (res.ok) {
        alert('Reply sent!');
        setReplies({ ...replies, [feedback_id]: '' });
      } else {
        alert('Failed to send reply.');
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
      {feedbacks.length === 0 && (
        <p>No feedbacks found yet.</p>
      )}
      {feedbacks.map(fb => (
        <div key={fb.id} className="border p-3 mb-4 rounded shadow">
          <p><strong>User:</strong> {fb.username}</p>
          <p><strong>Rating:</strong> {fb.rating} ⭐</p>
          <p><strong>Comment:</strong> {fb.comment}</p>
          <p><strong>Time:</strong> {new Date(fb.created_at).toLocaleString()}</p>

          <textarea
            placeholder="Write a reply..."
            value={replies[fb.id] || ''}
            onChange={e => setReplies({ ...replies, [fb.id]: e.target.value })}
            className="w-full border p-2 mt-2"
          />
          <button
            onClick={() => sendReply(fb.id)}
            className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
          >
            Send Reply
          </button>
        </div>
      ))}
    </div>
  );
}
