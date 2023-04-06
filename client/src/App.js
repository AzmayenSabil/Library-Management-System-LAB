import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

import Search from './components/Search/Search.js'
import Home from './components/Home/Home.js'
import Stats from './components/Stats/Stats.js'
import BorrowReturn from './components/BorrowReturn/BorrowReturn';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/stats" element={<Stats />} />
            <Route exact path="/borrow-return" element={<BorrowReturn />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;
