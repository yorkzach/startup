// Schedule.jsx
import React from 'react';
import Walkers from './walkers';
import WalkingRobyn from './walkingRobyn';
import CalendarPage from './schedule';

function Schedule() {
  return (
    <main className='bg-secondary'>
      <Walkers />
      <WalkingRobyn />
      <CalendarPage />
    </main>
  );
}

export default Schedule;
