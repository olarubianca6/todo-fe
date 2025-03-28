import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup({ USERS_API_BASE }) {
  const BASE_USER_URL = USERS_API_BASE || 'https://us-central1-todo-454613.cloudfunctions.net/backendtodo';
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${BASE_USER_URL}/insert_user`, new URLSearchParams({
            username, password, email: `${username}@example.com`
        }));
        console.log(response.data);
        if (response.data === "User created") {
            navigate('/login');
        } else {
            alert(response.data);
        }
    } catch (error) {
        console.error("Signup failed:", error);
    }
};

  return (
    <div className="auth-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button className="auth-page-btn" type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;