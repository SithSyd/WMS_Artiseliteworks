import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(
        'users/login/',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.setItem('token', response.data.access);
      window.location.href = '/inventory';
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-1">Warehouse Management System</h1>
        <p className="text-gray-500 text-sm mb-6">By Syed Firdaus</p>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
