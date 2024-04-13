// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import About from './pages/About';
import MyWalks from './pages/MyWalks.jsx';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/index" exact component={Home} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/about" component={About} />
        <Route path="/mywalks" component={MyWalks} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
