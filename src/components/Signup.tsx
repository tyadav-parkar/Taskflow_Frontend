
import { useState } from 'react';
import type { AuthFormData } from '../types/auth';

type SignupProps = {
  onSubmit: (data: AuthFormData) => void;
  onSwitchMode: () => void;
};

const Signup: React.FC<SignupProps> = ({ onSubmit, onSwitchMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg w-[360px]">
      <h2 className="text-xl font-semibold mb-4">Sign up</h2>
      <form
        className="space-y-4"
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ name, email, password });
        }}
      >
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Full name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
          Create Account
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-3">
        Already have an account?{' '}
        <button className="text-purple-600 underline" onClick={onSwitchMode}>
          Log in
        </button>
      </p>
    </div>
  );
};

export default Signup;