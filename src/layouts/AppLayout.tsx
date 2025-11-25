
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import type { User } from '../types/auth';

type AppLayoutProps = {
  user: User;
  onLogout: () => void;
};

const AppLayout: React.FC<AppLayoutProps> = ({ user, onLogout }) => {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
