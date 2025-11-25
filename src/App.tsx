
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppLayout from './layouts/AppLayout';
import Signup from './components/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import type { User, AuthFormData } from './types/auth';

const RequireAuth: React.FC<{ isAuthed: boolean }> = ({ isAuthed }) => {
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? (JSON.parse(stored) as User) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleAuthSubmit = (data: AuthFormData) => {
    const user: User = {
      email: data.email,
      name: data.name || 'User',
      avatar: null,
    };
    setCurrentUser(user);
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <Routes>
      {/* Auth routes (modal overlays) */}
      
      <Route
        path="/signup"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Signup onSubmit={handleAuthSubmit} onSwitchMode={() => navigate('/login')} />
          </div>
        }
      />

      {/* Protected app routes */}
      <Route element={<RequireAuth isAuthed={!!currentUser} />}>
        <Route element={<AppLayout user={currentUser!} onLogout={handleLogout} />}>
          <Route index element={<Home />} />         
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Fallback */}
    </Routes>
  );
}

export default App;
