import React, { useEffect } from 'react';

const MyWalks = () => {
  useEffect(() => {
    displayMyWalks();
  }, []); // Run once on component mount

  // Retrieve username from localStorage
  const userName = localStorage.getItem('userName');

  // Function to display user's scheduled walks
  const displayMyWalks = () => {
    const myWalksContainer = document.getElementById('myWalks');
    myWalksContainer.innerHTML = ''; // Clear previous content

    for (let i = 1; i <= 31; i++) {
      const scheduleData = localStorage.getItem(`walkSchedule_${i}`);
      if (scheduleData) {
        const { date, time, walker, scheduler } = JSON.parse(scheduleData);
        if (scheduler === userName) {
          // Check if the scheduler matches the current user
          const scheduleDate = new Date(2024, 2, date); // 2024 is year, 2 is month index (March)

          // Display the walk schedule
          const event = document.createElement('div');
          event.classList.add('event');
          event.innerHTML = `<span class="player-event">${walker}</span> is scheduled for ${scheduleDate.toDateString()} at ${time}`;
          myWalksContainer.appendChild(event);
        }
      }
    }
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="welcome-message">
        <div>Welcome to My Walks Page, {userName}</div>
      </div>
      <div className="calendar-container">
        <h2>My Scheduled Walks</h2>
        <div id="myWalks">
          {/* Walks scheduled by the user will be displayed here */}
        </div>
      </div>
    </main>
  );
};

export default MyWalks;
