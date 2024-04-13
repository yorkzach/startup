import React from 'react';

import './walks.css';

export function Walks() {
  const [walks, setWalks] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch('/api/walks')
      .then((response) => response.json())
      .then((walks) => {
        setWalks(walks);
        localStorage.setItem('walks', JSON.stringify(walks));
      })
      .catch(() => {
        const walksText = localStorage.getItem('walks');
        if (walksText) {
          setWalks(JSON.parse(walksText));
        }
      });
  }, []);

  // Demonstrates rendering an array with React
  const walkRows = [];
  if (walks.length) {
    for (const [i, walk] of walks.entries()) {
      walkRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{walk.name.split('@')[0]}</td>
          <td>{walk.walker}</td>
          <td>{walk.date}</td>
        </tr>
      );
    }
  } else {
    walkRows.push(
      <tr key='0'>
        <td colSpan='4'>Schedule a walk on the Calendar</td>
      </tr>
    );
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <table className='table table-warning table-striped-columns'>
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Walker</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id='walks'>{walkRows}</tbody>
      </table>
    </main>
  );
}
