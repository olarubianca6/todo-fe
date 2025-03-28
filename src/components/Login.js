import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ USERS_API_BASE, setToken }) {
  const BASE_USER_URL = USERS_API_BASE || 'https://us-central1-todo-454613.cloudfunctions.net/backendtodo';
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const loginData = username.includes('@') 
            ? { email: username, password }  
            : { username, password };        

        const response = await axios.post(`${BASE_USER_URL}/login_user`, new URLSearchParams(loginData));
        
        if (response.data.user && response.data.user.username) {
            const token = response.data.user.username; 
            localStorage.setItem('token', token);
            setToken(token); 
            navigate('/todo');
        } else {
            alert("Invalid credentials");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email or Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <br />
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br />
        <button className='auth-page-btn' type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;