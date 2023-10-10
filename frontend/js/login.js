import api from './api.js';

// Add an event listener for the login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the username and password entered by the user
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Call the login function to authenticate the user
    api.login(username, password);
});

// Add an event listener for the registration form submission
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the username and password entered by the user for registration
    const registerUsername = document.getElementById('register-username').value;
    const registerPassword = document.getElementById('register-password').value;

    // Call the register function to create a new user
    api.register(registerUsername, registerPassword);
});

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
// Initially, hide the registration form
registerForm.style.display = 'none';

// Add click event listeners to the buttons
loginButton.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

registerButton.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});
