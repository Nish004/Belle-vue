"use client";

import { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm";
import styles from '../styles/FeedbackSection.module.css';

export default function FeedbackSection({ user }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    fetch("/api/feedback")
      .then(async (res) => {
        const data = await res.json();
        setFeedbacks(data.feedbacks || []);
      })
      .catch(() => setFeedbacks([]));

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
    <div className={styles.feedbackSectionWrapper}>
      <h2 className={styles.feedbackHeading}>Guest Feedback 💬</h2>

      {feedbacks.length === 0 ? (
        <p className={styles.feedbackEmpty}>No feedbacks yet.</p>
      ) : (
        <div className={styles.feedbackScrollContainer}>
          {feedbacks.map((fb) => (
            <div key={`fb-${fb.feedback_id}`} className={styles.feedbackCard}>
              <div className={styles.feedbackHeader}>
                <span className={styles.username}>{fb.username}</span>
                <span className={styles.rating}>Rated: {fb.rating}⭐</span>
              </div>

              <p className={styles.comment}>{fb.comment}</p>

              <p className={styles.timestamp}>
                {new Date(fb.created_at).toLocaleString()}
              </p>

              {fb.reply && (
                <div className={styles.adminReply}>
                  <p><strong>Admin Reply:</strong> {fb.reply}</p>
                  {fb.reply_created_at && (
                    <p className={styles.replyTimestamp}>
                      Replied by <strong>{fb.admin_name || "Admin"}</strong> on{" "}
                      {new Date(fb.reply_created_at).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className={styles.formWrapper}>
        {user ? (
          canSubmit ? (
            <FeedbackForm userId={user.id} bookingId={null} />
          ) : (
            <p className={styles.infoMessage}>
              You need at least one approved booking to leave feedback.
            </p>
          )
        ) : (
          <p className={styles.infoMessage}>
            Please log in to leave feedback.
          </p>
        )}
      </div>
    </div>
  );
}
