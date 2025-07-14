"use client";
import { useState } from "react";

export default function FeedbackForm({ userId, bookingId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitFeedback = async () => {
  if (!comment) return alert("Please enter your feedback.");

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 🛡️ send JWT token
      },
      body: JSON.stringify({
        rating,
        comment,
        booking_id: bookingId,
      }),
    });

    const text = await res.text(); // 🧠 safer fallback
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid JSON response");
    }

    if (res.ok && data?.success) {
      alert("Feedback submitted!");
      setComment("");
      setRating(5);
    } else {
      alert("Error submitting feedback: " + (data?.error || "Unknown error"));
    }
  } catch (err) {
    console.error("Feedback submit error:", err.message);
    alert("Something went wrong. Try again.");
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
