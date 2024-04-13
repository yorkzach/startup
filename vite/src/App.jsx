// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/calendar';
import About from './pages/about';
import MyWalks from './pages/MyWalks.jsx';
import References from './pages/References.jsx';
import NotFound from './pages/NotFound';

import './index.css';
import './calendar.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/about" component={About} />
        <Route path="/mywalks" component={MyWalks} />
        <Route path="/references" component={References} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
