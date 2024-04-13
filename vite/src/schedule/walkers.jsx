import React from 'react';

import { GameEvent, GameNotifier } from '../../startup-react/src/schedule/gameNotifier';
import './walkers.css';

export function Walkers(props) {
  const userName = props.userName;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    GameNotifier.addHandler(handleGameEvent);

    return () => {
      GameNotifier.removeHandler(handleGameEvent);
    };
  });

  function handleGameEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === GameEvent.End) {
        message = `Scheduled ${event.value.walk}`;
      } else if (event.type === GameEvent.Start) {
        message = `Scheduled a walk`;
      } else if (event.type === GameEvent.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className='event'>
          <span className={'walker-event'}>{event.from.split('@')[0]}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className='walkers'>
      Walker
      <span className='walker-name'>{userName}</span>
      <div id='walker-messages'>{createMessageArray()}</div>
    </div>
  );
}
