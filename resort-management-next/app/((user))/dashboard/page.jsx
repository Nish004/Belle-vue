import styles from './Dashboard.module.css'; // Adjust path as needed

import ProfileDetails from '@/components/ProfileDetails';
import BookingHistory from '@/components/BookingHistory';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import DeleteAccountButton from '@/components/DeleteAccountButton';
import LogoutButton from '@/components/LogoutButton';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <ProfileDetails />
      </div>

      <div className={styles.section}>
        <BookingHistory />
      </div>

      <div className={styles.section}>
        <ChangePasswordForm />
      </div>

      <div className={styles.section}>
        <DeleteAccountButton />
      </div>

      <div className={styles.logoutContainer}>
        <LogoutButton />
      </div>
    </div>
  );
}
