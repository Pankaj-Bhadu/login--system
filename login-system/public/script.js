async function signup() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("/api/auth/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            window.location.href = "login.html";

        }

    } catch (error) {

        console.log(error);

    }

}
async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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

        alert(data.message);

        if (response.ok) {

            window.location.href = "dashboard.html";

        }

    } catch (error) {

        console.log(error);

    }

}
function logout(){

    alert("Logout Successful");

    window.location.href="login.html";

}