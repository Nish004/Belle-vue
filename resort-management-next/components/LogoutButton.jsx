'use client';

export default function LogoutButton() {
  const handleLogout = () => {
    // 1. Remove token
    localStorage.removeItem('token');

    // 2. Notify other tabs/components
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'token',
        oldValue: 'some_token',
        newValue: null,
      })
    );

    // 3. Redirect to landing page
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '1rem',
      }}
    >
      Logout
    </button>
  );
}
