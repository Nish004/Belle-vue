// FILE: app/components/UserLayoutWrapper.jsx
'use client';

import ResortNavbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';

export default function UserLayoutWrapper({ children }) {
  return (
    <UserProvider>
      <ResortNavbar />
      <main>{children}</main>
      <Footer />
    </UserProvider>
  );
}
