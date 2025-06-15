'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHotel } from "react-icons/fa";
import { Button } from "react-bootstrap";
import styles from '../styles/Footer.module.css';

function Footer() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <FaHotel className={styles.icon} />
              <span className={styles.name}>BELLE VUE</span>
            </div>
            <p className={styles.tagline}>
              Luxury beside the lake. Serene stays await you.
            </p>
            <div className={styles.social}>
              <Button className={styles.socialButton}><i className="fab fa-facebook-f"></i></Button>
              <Button className={styles.socialButton}><i className="fab fa-instagram"></i></Button>
              <Button className={styles.socialButton}><i className="fab fa-twitter"></i></Button>
              <Button className={styles.socialButton}><i className="fab fa-pinterest"></i></Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.links}>
            <div className={styles.column}>
              <h4 className={styles.title}>Explore</h4>
              <ul className={styles.list}>
                <li className={styles.item}><Link href="/" className={styles.link}>Home</Link></li>
                <li className={styles.item}><Link href="/book" className={styles.link}>Book Now</Link></li>
                <li className={styles.item}><Link href="/gallery" className={styles.link}>Gallery</Link></li>
                <li className={styles.item}><Link href="/offers" className={styles.link}>Special Offers</Link></li>
              </ul>
            </div>
            <div className={styles.column}>
              <h4 className={styles.title}>Information</h4>
              <ul className={styles.list}>
                <li className={styles.item}><Link href="/about" className={styles.link}>About Us</Link></li>
                <li className={styles.item}><Link href="/contact" className={styles.link}>Contact</Link></li>
                <li className={styles.item}><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
                <li className={styles.item}><Link href="/terms" className={styles.link}>Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletter}>
            <h4 className={styles.title}>Newsletter</h4>
            <p className={styles.subtitle}>Subscribe for exclusive offers and updates</p>
            <form className={styles.form}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitButton}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>© 2025 Belle Vue Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;