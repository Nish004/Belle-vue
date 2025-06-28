// FILE: app/(user)/layout.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import UserLayoutWrapper from '@/components/UserLayoutWrapper';

export default function UserLayout({ children }) {
  return <UserLayoutWrapper>{children}</UserLayoutWrapper>;
}
