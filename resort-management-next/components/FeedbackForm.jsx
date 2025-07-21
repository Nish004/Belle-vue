"use client";

import { useState } from "react";
import styles from "../styles/FeedbackForm.module.css";

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          rating,
          comment,
          booking_id: bookingId,
        }),
      });

      const text = await res.text();
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
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>Leave Feedback</h3>

      <label className={styles.label}>Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className={styles.select}
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
        className={styles.textarea}
      />

      <button onClick={submitFeedback} className={styles.submitButton}>
        Submit
      </button>
    </div>
  );
}
