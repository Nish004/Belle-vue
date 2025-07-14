"use client";
import { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackSection({ user }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    // Fetch all feedbacks
    fetch("/api/feedback")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch feedbacks");
        const data = await res.json();
        setFeedbacks(data.feedbacks || []);
      })
      .catch((err) => {
        console.error("Feedback fetch error:", err.message);
        setFeedbacks([]);
      });

    // Check if user is eligible to submit feedback
    if (user) {
      fetch(`/api/bookings/user/${user.id}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Booking fetch failed");
          const data = await res.json();
          if (data.bookings?.length > 0) {
            setCanSubmit(true);
          }
        })
        .catch((err) => {
          console.error("Booking check error:", err.message);
          setCanSubmit(false);
        });
    }
  }, [user]);

  return (
    <div className="bg-white p-6 rounded shadow mt-10 mb-10 container">
      <h2 className="text-2xl font-bold mb-4 text-center">Guest Feedback 💬</h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedbacks yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.id} className="border-b pb-3 mb-3">
            <p>
              <strong>{fb.username}</strong> rated: {fb.rating}⭐
            </p>
            <p className="text-gray-800">{fb.comment}</p>
            <p className="text-sm text-gray-400">
              {new Date(fb.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}

      {user ? (
        canSubmit ? (
          <FeedbackForm userId={user.id} bookingId={null} />
        ) : (
          <p className="text-center text-gray-500 italic">
            You need to book a room before leaving feedback.
          </p>
        )
      ) : (
        <p className="text-center text-gray-500 italic">Please log in to leave feedback.</p>
      )}
    </div>
  );
}
