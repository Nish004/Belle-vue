import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="en" suppressHydrationWarning>
     <body suppressHydrationWarning className="no-js">
        <script dangerouslySetInnerHTML={{__html: `document.body.classList.remove('no-js')`}} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}