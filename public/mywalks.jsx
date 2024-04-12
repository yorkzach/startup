import React, { useEffect, useState } from 'react';
import './main.css';

function MyWalksPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Function to display user's scheduled walks
  function displayMyWalks() {
    const myWalks = [];
    for (let i = 1; i <= 31; i++) {
      const scheduleData = localStorage.getItem(`walkSchedule_${i}`);
      if (scheduleData) {
        const { date, time, walker, scheduler } = JSON.parse(scheduleData);
        if (scheduler === userName) { // Check if the scheduler matches the current user
          const scheduleDate = new Date(2024, 4, date); // 2024 is year, 4 is month index (April)

          // Display the walk schedule
          myWalks.push(
            <div key={i} className="event">
              <span className="player-event">{walker}</span> is scheduled for {scheduleDate.toDateString()} at {time}
            </div>
          );
        }
      }
    }
    return myWalks;
  }

  return (
    <div className="container-fluid bg-secondary text-center">
      <div className="welcome-message">
        <div>Welcome to My Walks Page, <span id="userName">{userName}</span></div>
      </div>
      <div className="calendar-container">
        <h2>My Scheduled Walks</h2>
        <div id="myWalks">
          {/* Display user's scheduled walks */}
          {displayMyWalks()}
        </div>
      </div>
      <footer className="bg-dark text-white-50">
        <div className="container-fluid">
          <span className="text-reset">Zachary York</span>
          <a className="text-reset" href="https://github.com/yorkzach/startup">My GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default MyWalksPage;
