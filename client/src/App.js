import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

import Search from './components/Search/Search.js'
import Home from './components/Home/Home.js'

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;
