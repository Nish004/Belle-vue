import './globals.css';

export const metadata = {
  title: 'Belle Vue Resort',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
