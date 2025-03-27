import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ USERS_API_BASE, setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USERS_API_BASE}/login_user`,
        new URLSearchParams({ email, password })
      );
      if (response.data.user && response.data.user !== "Passwords not matching!") {
        localStorage.setItem('token', response.data.user.username);
        setToken(response.data.user.username);
        navigate('/todo');
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Login request failed:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button className='auth-page-btn' type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;