import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'

import Navbar from '../Navigation/Navbar';
import Footer from '../Footer/Footer';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();
    // axios.post('http://localhost:8080/signup', {
    //   username: username,
    //   password: password,
    //   email: email
    // })
    //   .then(res => {
    //     console.log(res.data);
    //     setMessage('Signup successful! Please login.');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setMessage('Signup failed. Please try again.');
    //   });
  }

  return (
    <div>
        <Navbar />
        <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <input type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}} />
        <input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}} />
        <input type="email" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}} />
        <button type="submit">Sign Up</button>
        {message && <p>{message}</p>}
        <p className='ahaa'>Already have an account? <a href="/signin">Log in</a></p>
      </form>
    </div>
        <Footer />
    </div>
   
  );
};

export default Signup;
