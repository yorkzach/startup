# startup
Startup application for CS260

# Elevator Pitch:

People often regard pets as part of their family. But when they are unable to take care of them or when they travel what should you do with your pets? Dog Watchers is a service to get people to walk, care, watch, love your pets as you would. We take care of your dogs as if they were our family. Don't let your pets get lonely!

## Design:

Simple UI for the main dashboard page:

![Mock](walkerUI.jpg)

### Key features

- Secure login over HTTPS
- Ability to view walker profiles
- Display of profiles, and locations
- Ability to schedule, and contact
- Displays calender and schedules in real time
- Ability for a user to lock in their appointment
- Ability for admin to create and delete appointments

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for home/dashboard and one for profiles/testimonials and one for scheduling. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, profile display, scheduling, display other appointments, display locations and service areas, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving appointments
  - submitting appointment requests
  - retrieving schedule
- **DB/Login** - Store users, schedules, and profiles in database. Register and login users. Credentials securely stored in database. Can't schedule unless authenticated.
- **WebSocket** - As each user creates appointments, their schedules are broadcast to all other users.
- **React** - Application ported to use the React web framework.



**HTML Startup**
Added 4 files Index, Calender, References, and about that cover the basic HTML structure of the startup. Eventually I will replace the calender with database info corresponding to each individual walker, as well I will use web socket to allow clients to schedule and leave reviews for each walker.

## CSS Deliverable 

- **[y]** - done - Prerequisite: Simon CSS deployed to your production environment
- **[y]** - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
- **[y]** - done - Prerequisite: Notes in your startup Git repository README.md file
- **[y]** - done - 30% Header, footer, and main content body. Used flex to layout sections.
- **[y]** - done - 20% Navigation elements. Links highlight on hover.
- **[y]** - done - 10% Responsive to window resizing. Looks great on iPad, desktop, and iPhone.
- **[y]** - done - 20% Application elements. Buttons are using bootstrap. Accordion using bootstrap
- **[y]** - done - 10% Application text content. Text is displayed using the Merriday font
- **[y]** - done - 10% Application images. I added curved edges around my profile photo.

## Javascript Deliverable 

- **20** JavaScript support for future login. Index page stores login info and uses that to get username for calender page and uses the username for mywalks page to access the data related to username
- **20** JavaScript support for future database data. In future will use database to store walk times and review numbers for walkers, as well on my walks page will access the database and display 
- **20** JavaScript support for future WebSocket. I am going to use WebSocket to provide real-time updates or notifications to users of upcoming walks, synchronize data between clients, or support future interactive features.
- **40** JavaScript support for your application's interaction logic. Calender clicking and scheduling is implemented and information for walkers is displayed on references page.

## Websocket

- Create an HTTP service using Node.js and Express: I created an HTTP service using Node.js and Express. My server.js file sets up an Express server and defines routes for serving static files, providing service endpoints, and handling API requests. Score: 40/40

- Frontend served up using Express static middleware: My frontend code (HTML, CSS, JavaScript) is served up using Express static middleware. The express.static middleware is correctly configured to serve static files from the public directory. Score: 10/10

- Your frontend calls third-party service endpoints: Although I haven't explicitly demonstrated the frontend calling third-party service endpoints in my code, I indicated the intention to do so in the comments. Score: 0/10 (Incomplete)

- Your backend provides service endpoints: I have provided service endpoints for serving real-time data (/api/realtime-data) as demonstrated in the server.js file. Score: 20/20

- Your frontend calls your service endpoints: My frontend code makes use of the /api/realtime-data endpoint to fetch real-time data and display it on the calendar page. This functionality is demonstrated in the JavaScript code. Score: 20/20


## Startup Login

Supports new user registration (20%):

- The project includes a registration endpoint (/api/register) that accepts username and password, hashes the password securely, and inserts the user into the database.
- The registration form is present in HTML files, allowing users to register by providing a username and password.

Supports existing user authentication (20%):

- The project includes a login endpoint (/api/login) that verifies the username and password against the stored hashed password.
- The login functionality is implemented in one of the HTML files (login.js) where users can input their credentials and submit the form to authenticate.

Stores application data in MongoDB (20%):

- The project connects to a MongoDB database using the MongoDB Node.js driver (mongodb).
- There are functions defined to interact with the database, including adding users, updating passwords, and deleting users.

Stores and retrieves credentials in MongoDB (20%):

- User credentials are hashed using bcrypt before storing them in the database during registration.
- During login, the password entered by the user is hashed and compared with the hashed password stored in the database.

Restricts application functionality based upon authentication (20%):

- Certain endpoints are restricted and can only be accessed if the user is authenticated.
- The login functionality ensures that only authenticated users can access certain parts of the application.