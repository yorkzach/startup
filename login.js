function login() {
  const nameEl = document.querySelector("#name");
  const passwordEl = document.querySelector("#password");

  // Here I can add logic to check if the password matches the username in the database
  const users = JSON.parse(localStorage.getItem("users")) || {};
  users[nameEl.value] = passwordEl.value;
  localStorage.setItem("users", JSON.stringify(users));

  // Redirect to calendar.html
  window.location.href = "calendar.html";
}
