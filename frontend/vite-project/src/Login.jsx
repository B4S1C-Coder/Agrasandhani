import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from './sdk.mjs';  // Importing the getToken function from sdk.mjs

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = await getToken({ username, password });
      
      if (token) {
        onLogin(token); // Call the onLogin function passed as a prop with the token
        navigate('/home'); // Redirect to home after successful login
      } else {
        setError('Invalid Username Or Password');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <>
      <video src="src/assets/Black Hole.mp4" autoPlay muted loop className='openVideo'></video>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
