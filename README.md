# startup
Startup application for CS260

# Elevator Pitch:

People often regard pets as part of their family. But when they are unable to take care of them or when they travel what should you do with your pets? Dog Watchers is a service to get people to walk, care, watch, love your pets as you would. Don't let your pets get lonely!

## Design:

![Mock](walkerUI.jpg)

### Key features

- Secure login over HTTPS
- Ability to view walker profiles
- Display of profiles
- Ability to schedule, and contact
- Displays calender and schedules in real time
- Ability for a user to lock in their appointment
- Ability for admin to create and delete appointments

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for home/dashboard and one for profiles and one for scheduling. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, profile display, scheduling, display other appointments, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving appointments
  - submitting appointment requests
  - retrieving schedule
- **DB/Login** - Store users, schedules, and profiles in database. Register and login users. Credentials securely stored in database. Can't schedule unless authenticated.
- **WebSocket** - As each user creates appointments, their schedules are broadcast to all other users.
- **React** - Application ported to use the React web framework.
