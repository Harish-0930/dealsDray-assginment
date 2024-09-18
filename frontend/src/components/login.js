import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

const Login = () => {
  const [credentials, setCredentials] = useState({
    f_userName: '',
    f_Pwd: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', credentials);
      // Store token and user details in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('f_userName', response.data.f_userName);
      localStorage.setItem('userid', response.data.userid);
      console.log(response);

      // Redirect to dashboard after login success
      navigate('/dashboard');
    } catch (err) {
      // Handle errors such as incorrect password, email not found, etc.
      if (err.response) {
        alert("invalid login details")
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="f_userName"
              value={credentials.f_userName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="f_Pwd"
              value={credentials.f_Pwd}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
