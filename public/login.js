function login() {
  const nameEl = document.querySelector("#name");
  const passwordEl = document.querySelector("#password");
  localStorage.setItem("userName", nameEl.value);

  // Retrieve users from localStorage or initialize an empty object
  const users = JSON.parse(localStorage.getItem("users")) || {};

  // Check if the username exists
  if (!(nameEl.value in users)) {
    // If it's a new unique username, add it to users
    users[nameEl.value] = passwordEl.value;
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    // If the username exists, check if the password matches
    if (users[nameEl.value] !== passwordEl.value) {
      // If the password doesn't match, display an error message
      alert("Wrong password. Please try again.");
      return; // Stop the function execution here
    } else {
      // Redirect to calendar.html only if login is successful
      window.location.href = "calendar.html";
    }
  }
}
