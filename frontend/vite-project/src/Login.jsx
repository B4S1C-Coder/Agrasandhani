import React, { useState } from 'react'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (username === 'student' && password === 'password') {
        onLogin();
      } else {
        setError('Invalid Username Or Password');
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