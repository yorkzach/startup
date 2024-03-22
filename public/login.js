async function login() {
  const nameEl = document.querySelector("#name");
  const passwordEl = document.querySelector("#password");
  localStorage.setItem("userName", nameEl.value);

  const credentials = {
    username: nameEl.value,
    password: passwordEl.value
  };

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const userData = await response.json();
    // Redirect to calendar.html only if login is successful
    window.location.href = "calendar.html";
    // You can also fetch and display user data here if needed
    // e.g., fetchAndDisplayUserData(userData.userId);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Fetch and display user data function (example)
async function fetchAndDisplayUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    // Display user data in the DOM
    // Example: document.querySelector("#userData").textContent = userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
