// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Belle Vue Resort',
};

export default function RootLayout({ children }) {
  return <>{children}</>;  // ✅ just return children
}
