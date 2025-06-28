'use client';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHotel } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';

function ResortNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 loading state

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch user profile
  const fetchUserProfile = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.name) setUsername(data.name);
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false)); // ✅ done loading
    } else {
      setLoading(false); // ✅ even if no token, done
    }
  };

  // Initial fetch + login state tracking
  useEffect(() => {
    fetchUserProfile();

    const handleStorageChange = (e) => {
      if (e.key === 'token') fetchUserProfile();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(null);
    window.location.href = '/';
  };

  // 🔒 Prevent flicker on initial render
  if (loading) return null;

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.navbarFullwidthContainer}>
        <Container className={styles.container}>
          <Navbar.Brand
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.brandContainer}
          >
            <FaHotel className={styles.hotelIcon} />
            <span className={styles.brandName}>BELLE VUE</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" className={styles.toggle} />

          <Navbar.Collapse id="main-nav" className={styles.collapse}>
            <Nav className={styles.navLeft}>
              <Nav.Link href="/" className={styles.navLink}>Home</Nav.Link>
              <Nav.Link href="/bookroom" className={styles.navLink}>Book Now</Nav.Link>
              <Nav.Link href="/contact" className={styles.navLink}>Contact</Nav.Link>
            </Nav>

            <Nav className={styles.navRight}>
              {!username ? (
                <>
                  <Nav.Link href="/login" className={styles.customLoginBtn}>Login</Nav.Link>
                  <Nav.Link href="/register" className={styles.customRegisterBtn}>Register</Nav.Link>
                </>
              ) : (
                <>
                {username && username.toLowerCase() !== 'admin' ? (
                <Nav.Link href="/dashboard" className={styles.usernameLink}>
                     {username}
                 </Nav.Link>
               ) : null}        
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </div>
    </Navbar>
  );
}

export default ResortNavbar;
