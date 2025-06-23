import ProfileDetails from '@/components/ProfileDetails';
import BookingHistory from '@/components/BookingHistory';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import DeleteAccountButton from '@/components/DeleteAccountButton';
import LogoutButton from '@/components/LogoutButton';

export default function DashboardPage() {
  return (
    <div style={{ padding: '2rem' }}>
      
      <ProfileDetails />
      <BookingHistory />
      <ChangePasswordForm />
      <DeleteAccountButton />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <LogoutButton />
      </div>
    </div>
  );
}


