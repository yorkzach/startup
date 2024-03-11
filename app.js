const express = require('express');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

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
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
