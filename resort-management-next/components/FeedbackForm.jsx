"use client";
import { useState } from "react";

export default function FeedbackForm({ userId, bookingId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitFeedback = async () => {
    if (!comment) return alert("Please enter your feedback.");

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        booking_id: bookingId,
        rating,
        comment,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Feedback submitted!");
      setComment("");
      setRating(5);
    } else {
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md w-full mt-6">
      <h3 className="text-lg font-semibold mb-2">Leave Feedback</h3>
      <label>Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="ml-2 mb-2"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star}
          </option>
        ))}
      </select>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full mt-2 border p-2"
      />
      <button
        onClick={submitFeedback}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
      >
        Submit
      </button>
    </div>
  );
}
