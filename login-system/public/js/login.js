// ==============================
// KVONAUTH LOGIN SCRIPT
// ==============================

// Select Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginBtn = document.querySelector(".login-btn");
const rememberMe = document.getElementById("remember");
const togglePassword = document.querySelector(".toggle-password");
const glow = document.querySelector(".cursor-glow");

// ==============================
// Cursor Glow Effect
// ==============================

if (glow) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

// ==============================
// Show / Hide Password
// ==============================

if (togglePassword) {
    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

        }

    });
}

// ==============================
// Email Validation
// ==============================

function isValidEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

// ==============================
// Login Function
// ==============================

async function login() {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validation

    if (email === "") {

        alert("Please enter your email.");
        emailInput.focus();
        return;

    }

    if (!isValidEmail(email)) {

        alert("Please enter a valid email.");
        emailInput.focus();
        return;

    }

    if (password === "") {

        alert("Please enter your password.");
        passwordInput.focus();
        return;

    }

    // Loading State

    loginBtn.disabled = true;
    loginBtn.innerHTML = "Logging In...";

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok && data.success) {

            // Save User

            if (rememberMe && rememberMe.checked) {

                localStorage.setItem("kvonUser", JSON.stringify(data.user));

            } else {

                sessionStorage.setItem("kvonUser", JSON.stringify(data.user));

            }

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message || "Login Failed.");

        }

    } catch (error) {

        console.error(error);
        alert("Server Error! Please try again later.");

    } finally {

        loginBtn.disabled = false;
        loginBtn.innerHTML = "Login";

    }

}

// ==============================
// Login Button Click
// ==============================

if (loginBtn) {

    loginBtn.addEventListener("click", (e) => {

        e.preventDefault();
        login();

    });

}

// ==============================
// Enter Key Support
// ==============================

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        login();

    }

});

// ==============================
// Auto Focus
// ==============================

window.addEventListener("load", () => {

    emailInput.focus();

});