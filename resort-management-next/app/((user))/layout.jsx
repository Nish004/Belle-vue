// FILE: app/(user)/layout.jsx
'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import ResortNavbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';

export default function UserLayout({ children }) {
  return (
    <UserProvider>
      <ResortNavbar />
      <main>{children}</main>
      <Footer />
    </UserProvider>
  );
}
