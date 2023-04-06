import React, { useState } from 'react';
import './Signin.css';

import Navbar from '../Navigation/Navbar';
import Footer from '../Footer/Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <div>
      <Navbar />
      <div className="sign-in-container">
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="btn-primary">
          Sign In
        </button>
      </form>
    </div>
      <Footer />
    </div>
    
  );
};

export default SignIn;
