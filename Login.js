import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid Email');
      return false;
    }

    try {
      const response = await axios.post('http://localhost:3003/login', {
        email: email,
        password: password,
      });

      if (response.data.message === 'Login successful') {
        if (response.data.token) {
          localStorage.setItem('Token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/profile');
        }
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          alert('Unknown email');
        } else if (err.response.status === 404) {
          alert('Password does not match');
        } else {
          alert(`Error: ${err.response.data.response}`);
        }
      } else {
        setError(`Network Error: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <center>
        {error && <p>{error}</p>}
        <table style={{ marginTop: '100px' }}>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password:</label>
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={handleLogin}>Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default Login;