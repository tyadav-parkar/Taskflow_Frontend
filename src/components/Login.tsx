 
import { useState } from 'react';
import type { AuthFormData } from '../types/auth';
 
type LoginProps = {
  onSubmit: (data: AuthFormData) => void;
  onSwitchMode: () => void;
};
 
const Login: React.FC<LoginProps> = ({ onSubmit, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg w-[360px]">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form
        className="space-y-4"
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ email, password });
        }}
      >
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-purple-600 text-white rounded-md py-2">
          Sign In
        </button>
      </form>
 
      <p className="text-sm text-gray-600 mt-3">
        Don't have an account?{' '}
        <button className="text-purple-600 underline" onClick={onSwitchMode}>
          Sign up
        </button>
      </p>
    </div>
  );
};
 
export default Login;
 
 