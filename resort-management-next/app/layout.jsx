import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserProvider } from '@/context/UserContext';

export const metadata = {
  title: 'Resort Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="no-js">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.classList.remove('no-js')`,
          }}
        />
        <UserProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
