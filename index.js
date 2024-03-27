const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.addUser(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:username', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
    const token = req?.cookies.token;
    res.send({ username: user.username, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

secureApiRouter.get('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Fetch user data from the database
        const userData = await getUser(username);
        if (!userData) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Return any additional data you want to send to the frontend upon successful login
        res.json({ message: 'Login successful', userId: userData._id });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
  
  
  // Default error handler
  app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
  // Return the application's default page if the path is unknown
  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  // setAuthCookie in the HTTP response
  function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  


// const express = require('express');
// const app = express();
// const bcrypt = require('bcrypt');
// const { addUser, getUserData } = require('./database'); // Import functions from database.js

// const port = process.env.PORT || 3000;

// app.use(express.json());

// // Register endpoint
// app.post('/api/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//         // Add user to the database
//         const userId = await addUser(username, hashedPassword);
//         res.status(201).json({ message: 'User registered successfully', userId });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Login endpoint
// app.post('/api/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         // Fetch user data from the database
//         const userData = await getUserData(username);
//         if (!userData) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // Verify password
//         const isPasswordValid = await bcrypt.compare(password, userData.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // Return any additional data you want to send to the frontend upon successful login
//         res.json({ message: 'Login successful', userId: userData._id });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// app.get('/api/users/:username', async (req, res) => {
//     const username = req.params.username;
//     try {
//         // Fetch user data from the database based on the provided username
//         const userData = await getUserData(username);
//         // Then send the user data back as the response
//         res.json(userData);
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Protected endpoint - example
// app.get('/api/protected', async (req, res) => {
//     // Only accessible if user is authenticated
//     res.json({ message: 'Protected endpoint accessed' });
// });

// // ...

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });