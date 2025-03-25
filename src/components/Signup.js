import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted');
  };

  const handleGuestLogin = () => {
    navigate('/'); // Navigate to the main to-do list page
  };

  return (
    <div className="auth-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button className="auth-page-btn" type="submit">Sign Up</button>
      </form>
      
      <button className="auth-page-btn" onClick={handleGuestLogin}>Continue without an account</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;