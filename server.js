const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000

// JSON body parsing using built-in middleware
app.use(express.json());

// Define a route to serve static files (your frontend code)
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Define a route to serve real-time data
app.get('/realtime-data', (req, res) => {
  // Replace this with actual data fetching logic from your database or third-party API
  const realtimeData = [
    { date: '2024-03-10', walker: 'Caitlin', time: '10:00 AM', scheduler: 'Admin' },
    { date: '2024-03-03', walker: 'Robyn', time: '11:00 AM', scheduler: 'Admin'},
    { date: '2024-03-21', walker: 'Rachel', time: '06:00 PM', scheduler: 'Admin'}
  ];

  // Send the real-time data as JSON response
  res.json(realtimeData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});