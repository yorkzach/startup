import React, { useEffect, useState } from 'react';

function CalendarPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Function to generate calendar days
  function generateCalendar() {
    const calendarDays = [];
    for (let i = 1; i <= 31; i++) {
      calendarDays.push(
        <div key={i} className="day" onClick={() => setWalkTime(i)}>
          {i}
        </div>
      );
    }
    return calendarDays;
  }

  // Function to set walk time
  function setWalkTime(day) {
    const walkTime = prompt("Enter walk time for day " + day);
    if (walkTime !== null) {
      const walkerName = prompt("Enter walker's name");
      if (!(walkerName === 'Rachel' || walkerName === 'Robyn' || walkerName === 'Caitlin')) {
        alert('That\'s not one of our walkers. Please choose from one of our registered walkers.');
        return;
      }
      if (walkerName !== null) {
        storeWalkSchedule({
          date: day,
          time: convertTo12HourClock(walkTime),
          walker: walkerName,
          scheduler: userName // Adding the username of the scheduler
        });
      }
    }
  }

  // Function to convert time to 12-hour clock format
  function convertTo12HourClock(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const minute = minutes ? parseInt(minutes, 10) : 0; // If no minute information is provided, default to 0
    const amPM = hour >= 12 ? 'PM' : 'AM';
    const convertedHour = hour % 12 || 12; // Convert hour to 12-hour format

    return `${convertedHour}:${minute.toString().padStart(2, '0')} ${amPM}`;
  }

  // Function to store walk schedule
  function storeWalkSchedule(scheduleData) {
    const { date, time, walker, scheduler } = scheduleData;
    const scheduleDate = new Date(2024, 2, date); // 2024 is year, 2 is month index (March)
    localStorage.setItem(`walkSchedule_${date}`, JSON.stringify(scheduleData));

    // Display the new walk schedule in the player-messages
    const event = document.createElement('div');
    event.classList.add('event');
    event.innerHTML = `<span class="player-event">${walker}</span> is scheduled for ${scheduleDate.toDateString()} at ${time} (Scheduled by: ${scheduler})`;
    document.querySelector('.player-messages').appendChild(event);
    document.querySelector(`#calendarDays .day:nth-child(${date})`).classList.add('scheduled');
  }

  return (
    <div className="container-fluid bg-secondary text-center">
      <div className="welcome-message">Welcome <span id="userName">{userName}</span></div>
      <div className="calendar-container">
        <h2>Walker Schedule</h2>
        <div id="calendar">
          <div className="calendar-header">
            <span className="prev-month">&lt;</span>
            <span className="current-month">March 2024</span>
            <span className="next-month">&gt;</span>
          </div>
          <div className="calendar-days" id="calendarDays">
            {/* Render days dynamically */}
            {generateCalendar()}
          </div>
        </div>
      </div>
      <div className="player-messages"></div>
    </div>
  );
}

export default CalendarPage;
