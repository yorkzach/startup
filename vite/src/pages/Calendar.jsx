import React, { useEffect, useState } from 'react';

const Calendar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Generate calendar on page load
    generateCalendar();
    displayStoredWalkSchedules();
    displayUserData();
    fetchRealTimeData();
  }, []);

  // Function to generate calendar days
  const generateCalendar = () => {
    const calendarDays = [];
    for (let i = 1; i <= 31; i++) {
      calendarDays.push(
        <div key={i} className="day" onClick={() => setWalkTime(i)}>
          {i}
        </div>
      );
    }
    return calendarDays;
  };

  // Function to set walk time
  const setWalkTime = (day) => {
    const walkTime = prompt(`Enter walk time for day ${day}`);
    if (walkTime !== null) {
      const walkerName = prompt("Enter walker's name");
      if (!['Rachel', 'Robyn', 'Caitlin'].includes(walkerName)) {
        alert("That's not one of our walkers. Please choose from one of our registered walkers.");
        return;
      }
      if (walkerName !== null) {
        const scheduleData = {
          date: day,
          time: convertTo12HourClock(walkTime),
          walker: walkerName,
          scheduler: userName, // Adding the username of the scheduler
        };
        storeWalkSchedule(scheduleData);
      }
    }
  };

  // Function to convert time to 12-hour clock format
  const convertTo12HourClock = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const minute = minutes ? parseInt(minutes, 10) : 0; // If no minute information is provided, default to 0
    const amPM = hour >= 12 ? 'PM' : 'AM';
    const convertedHour = hour % 12 || 12; // Convert hour to 12-hour format

    return `${convertedHour}:${minute.toString().padStart(2, '0')} ${amPM}`;
  };

  // Function to store walk schedule
  const storeWalkSchedule = (scheduleData) => {
    const { date, time, walker, scheduler } = scheduleData;
    const scheduleDate = new Date(2024, 2, date); // 2024 is year, 2 is month index (March)
    localStorage.setItem(`walkSchedule_${date}`, JSON.stringify(scheduleData));
    const event = document.createElement('div');
    event.classList.add('event');
    event.innerHTML = `<span class="player-event">${walker}</span> is scheduled for ${scheduleDate.toDateString()} at ${time} (Scheduled by: ${scheduler})`;
    document.querySelector('.player-messages').appendChild(event);
    document.querySelector(`#calendarDays .day:nth-child(${date})`).classList.add('scheduled');
  };

  // Function to display stored walk schedules
  const displayStoredWalkSchedules = () => {
    for (let i = 1; i <= 31; i++) {
      const scheduleData = localStorage.getItem(`walkSchedule_${i}`);
      if (scheduleData) {
        const { date, time, walker, scheduler } = JSON.parse(scheduleData);
        const scheduleDate = new Date(2024, 2, date); // 2024 is year, 2 is month index (March)
        const event = document.createElement('div');
        event.classList.add('event');
        event.innerHTML = `<span class="player-event">${walker}</span> is scheduled for ${scheduleDate.toDateString()} at ${time} (Scheduled by: ${scheduler})`;
        document.querySelector('.player-messages').appendChild(event);
        document.querySelector(`#calendarDays .day:nth-child(${date})`).classList.add('scheduled');
      }
    }
  };

  // Function to fetch real-time data
  const fetchRealTimeData = () => {
    fetch('/api/realtime-data')
      .then((response) => response.json())
      .then((dataList) => {
        dataList.forEach((item) => {
          const { date, time, walker, scheduler } = item;
          const event = document.createElement('div');
          event.classList.add('event');
          event.innerHTML = `<span class="player-event">${walker}</span> is scheduled for ${date} at ${time} (Scheduled by: ${scheduler})`;
          document.querySelector('.player-messages').appendChild(event);
          document.querySelector(`#calendarDays .day:nth-child(${date})`).classList.add('scheduled');
        });
      })
      .catch((error) => console.error('Error fetching real-time data:', error));
  };

  // Function to fetch user data and display it
  const displayUserData = async () => {
    try {
      const response = await fetch(`/api/users/${userName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      document.getElementById('userName').textContent = userData;
    } catch (error) {
      console.error('Error fetching and displaying user data:', error);
    }
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="welcome-message">
        <div>Welcome <span id="userName">{userName}</span></div>
      </div>
      <div className="calendar-container">
        <h2>Walker Schedule</h2>
        <div id="calendar">
          <div className="calendar-header">
            <span className="prev-month">&lt;</span>
            <span className="current-month">March 2024</span>
            <span className="next-month">&gt;</span>
          </div>
          <div className="calendar-days" id="calendarDays">
            {generateCalendar()}
          </div>
        </div>
      </div>

      <div className="player-messages"></div>
    </main>
  );
};

export default Calendar;
