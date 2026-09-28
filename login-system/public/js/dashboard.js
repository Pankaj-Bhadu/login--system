// ==============================
// KVONAUTH DASHBOARD
// ==============================

// Get User Data
let user = null;

const localUser = localStorage.getItem("kvonUser");
const sessionUser = sessionStorage.getItem("kvonUser");

if (localUser) {
    user = JSON.parse(localUser);
} else if (sessionUser) {
    user = JSON.parse(sessionUser);
}

// ==============================
// Check Login
// ==============================

if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// ==============================
// Display User Details
// ==============================

const username = document.getElementById("username");
const useremail = document.getElementById("useremail");

if (user) {
    username.textContent = user.name;
    useremail.textContent = user.email;
}

// ==============================
// Logout
// ==============================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.removeItem("kvonUser");
    sessionStorage.removeItem("kvonUser");

    alert("Logged out successfully!");

    window.location.href = "login.html";

});