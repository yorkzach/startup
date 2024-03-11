const express = require('express');
const app = express();
const WebSocket = require('ws');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

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

  console.log(realtimeData);
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

// Return the references page
app.get('/references', (_req, res) => {
  res.sendFile('references.html', { root: 'public' });
});

// Catch-all route to return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});




// Store ratings for each walker
let walkerRatings = {
  'Robyn York': 5,
  'Caitlin York': 4,
  'Rachel Carnahan': 4.5
};

// WebSocket connection handler
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const reviewData = JSON.parse(message);
    const { walker, review } = reviewData;
    
    if (walkerRatings.hasOwnProperty(walker)) {
      // Update walker rating
      walkerRatings[walker] = (walkerRatings[walker] + review) / 2;

      // Broadcast updated ratings to all connected clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(walkerRatings));
        }
      });
    }
  });
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});