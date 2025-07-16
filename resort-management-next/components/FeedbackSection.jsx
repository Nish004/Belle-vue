"use client";
import { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackSection({ user }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    // 1. Fetch All Feedbacks
    fetch("/api/feedback")
      .then(async (res) => {
        const data = await res.json();
        console.log("Fetched feedbacks:", data.feedbacks);
        setFeedbacks(data.feedbacks || []);
      })
      .catch(() => setFeedbacks([]));

    // 2. Check if user has at least one approved booking
    if (user) {
      fetch("/api/user/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(async (res) => {
          const bookings = await res.json();
          const hasApproved = bookings.some(
            (b) => b.status && b.status.toLowerCase() === "approved"
          );
          if (hasApproved) setCanSubmit(true);
        })
        .catch(() => setCanSubmit(false));
    }
  }, [user]);

  return (
    <div className="bg-white p-6 rounded shadow mt-10 mb-10 container">
      <h2 className="text-2xl font-bold mb-4 text-center">Guest Feedback 💬</h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedbacks yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={`fb-${fb.feedback_id}`} className="border-b pb-4 mb-4">
            <p>
              <strong>{fb.username}</strong> rated: {fb.rating}⭐
            </p>
            <p className="text-gray-800">{fb.comment}</p>
            <p className="text-sm text-gray-400">
              {new Date(fb.created_at).toLocaleString()}
            </p>

            {/* Show admin reply if exists */}
            {fb.reply && (
              <div className="mt-2 bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Admin Reply:</strong> {fb.reply}
                </p>
                {fb.reply_created_at && (
                  <p className="text-xs text-gray-400 mt-1">
                    Replied by <strong>{fb.admin_name || "Admin"}</strong> on{" "}
                    {new Date(fb.reply_created_at).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        ))
      )}

      {user ? (
        canSubmit ? (
          <FeedbackForm userId={user.id} bookingId={null} />
        ) : (
          <p className="text-center text-gray-500 italic">
            You need at least one approved booking to leave feedback.
          </p>
        )
      ) : (
        <p className="text-center text-gray-500 italic">
          Please log in to leave feedback.
        </p>
      )}
    </div>
  );
}
