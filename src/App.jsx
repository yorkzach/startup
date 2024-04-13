// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import About from './pages/About';
import MyWalks from './pages/MyWalks';
import References from './pages/References';
import NotFound from './pages/NotFound'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" exact component={Home} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/about" component={About} />
        <Route path="/mywalks" component={MyWalks} />
        <Route path="/references" component={References} />
        <Route component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
