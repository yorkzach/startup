const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const PORT = process.env.PORT || 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Define a route to serve real-time data (mocked for demonstration)
apiRouter.get('/realtime-data', (_req, res) => {
  // Replace this with actual data fetching logic from your database or third-party API
  const realtimeData = [
    { date: '2024-03-10', walker: 'Caitlin', time: '10:00 AM', scheduler: 'Admin' },
    { date: '2024-03-03', walker: 'Robyn', time: '11:00 AM', scheduler: 'Admin'},
    { date: '2024-03-21', walker: 'Rachel', time: '06:00 PM', scheduler: 'Admin'}
  ];

  // Send the real-time data as JSON response
  res.json(realtimeData);
});

// Return the calendar page
app.get('/calendar', (_req, res) => {
  res.sendFile('calendar.html', { root: 'public' });
});

// Return the my walks page
app.get('/mywalks', (_req, res) => {
  res.sendFile('mywalks.html', { root: 'public' });
});

// Catch-all route to return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to update scores (not relevant to the current application)
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}
