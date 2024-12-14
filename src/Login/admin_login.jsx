import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const loginData = {
      username,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/admin/login', loginData);
      if (response.status === 200) {
        setSuccess('Login successful');
        setError('');
        console.log('Login Successful:', response.data);

        navigate('/admin-dashboard');
      }
    } catch (error) {
      if (error.response) {
        setError('Invalid credentials');
        setSuccess('');
      } else {
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="navbar">
        <div className="logo">
          <h1 style={{ color: '#fff', fontSize: '24px', margin: '0 20px' }}>Admin Panel</h1>
        </div>
      </div>
      <div className="center">
        <div className="login-container">
          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
          <form onSubmit={handleLogin}>
            <h1>Admin Login</h1>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <div className="error-message error-msg">{error}</div>}
          {success && <div className="success-message" style={{ color: 'green', textAlign: 'center' }}>{success}</div>}
        </div>
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Roboto:700&display=swap');

          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

          .wrapper {
            background: url(b.jpg) no-repeat;
            background-size: cover;
            height: 100vh;
          }

          .navbar {
            position: fixed;
            height: 80px;
            width: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
          }

          .logo h1 {
            color: white;
            font-family: 'Roboto', sans-serif;
          }

          .center {
            position: absolute;
            left: 50%;
            top: 55%;
            transform: translate(-50%, -50%);
            font-family: sans-serif;
            text-align: center;
          }

          .center h1 {
            color: white;
            font-size: 48px;
            margin-bottom: 20px;
          }

          .login-container {
            background-color: #e1dfdf;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 400px;
            margin: auto;
            position: relative; /* For positioning loader */
          }

          .login-container h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
          }

          input[type='text'],
          input[type='password'] {
            border-radius: 15px;
            width: 100%;
            padding: 15px;
            margin: 5px 0 22px 0;
            display: inline-block;
            border: none;
            background: #f1f1f1;
            outline: none;
            font-size: 16px;
          }

          button {
            border-radius: 25px;
            width: 50%;
            padding: 15px;
            background: orangered;
            color: white;
            border: none;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          button:hover {
            background: #F09440;
          }

          .error-msg {
            color: red;
            font-size: 14px;
            margin-top: 10px;
          }

          .loader-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .loader {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
