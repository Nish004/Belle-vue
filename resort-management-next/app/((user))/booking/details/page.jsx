'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './details.module.css';

export default function BookingDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  useEffect(() => {
    const storedRoom = localStorage.getItem('selectedRoom');
    if (!storedRoom) {
      alert('No room selected. Redirecting...');
      router.push('/bookroom');
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedRoom = JSON.parse(localStorage.getItem('selectedRoom'));
    if (!selectedRoom) {
      alert('No room selected');
      return;
    }

    const inDate = new Date(formData.checkIn);
    const outDate = new Date(formData.checkOut);
    const numDays = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));

    if (numDays <= 0) {
      alert('Invalid check-in/check-out dates.');
      return;
    }

    const totalPrice = selectedRoom.price * formData.guests * numDays;

    const bookingData = {
      room_id: selectedRoom.id,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      guests: formData.guests,
      total_price: totalPrice,
    };

    localStorage.setItem('bookingDetails', JSON.stringify(bookingData));
    router.push('/booking/payment');
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Guest Details 🧳</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 9876543210"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Check-in</label>
            <input
              name="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Check-out</label>
            <input
              name="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>No. of Guests</label>
            <input
              name="guests"
              type="number"
              min="1"
              max="4"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.center}>
          <button type="submit" className={styles.button}>
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
