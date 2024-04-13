import React, { useState } from 'react';

import './index.css';
import './calendar.css';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = () => {
    // Simulating login functionality
    if (userName.trim() === '' || password.trim() === '') {
      setErrorMessage('Please enter both username and password.');
      return;
    }
    // Your login logic here
    setIsLoggedIn(true);
  };

  const createUser = () => {
    // Simulating user creation functionality
    if (userName.trim() === '' || password.trim() === '') {
      setErrorMessage('Please enter both username and password.');
      return;
    }
    // Your user creation logic here
    setIsLoggedIn(true);
  };

  const play = () => {
    // Simulating play functionality
    // Your play logic here
  };

  const logout = () => {
    // Simulating logout functionality
    setIsLoggedIn(false);
    setUserName('');
    setPassword('');
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <h1>Walking Robyn</h1>
        {!isLoggedIn && (
          <div id="loginControls">
            <div className="input-group mb-3">
              <span className="input-group-text">@</span>
              <input
                className="form-control"
                type="text"
                placeholder="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">🔒</span>
              <input
                className="form-control"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={loginUser}>
              Login
            </button>
            <button type="button" className="btn btn-primary" onClick={createUser}>
              Create
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div id="playControls">
            <div id="playerName">{userName}</div>
            <button type="button" className="btn btn-primary" onClick={play}>
              Schedule
            </button>
            <button type="button" className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Error dialog */}
      <div className="modal fade" id="msgModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-dark">
            <div className="modal-body">{errorMessage}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
