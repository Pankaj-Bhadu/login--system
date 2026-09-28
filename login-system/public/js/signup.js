// =============================
// KVONAUTH SIGNUP
// =============================

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const signupBtn = document.querySelector(".signup-btn");

const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.getElementById("strengthText");

const togglePassword = document.querySelector(".toggle-password");
const glow = document.querySelector(".cursor-glow");
const strengthFill=document.querySelector(".strength-fill");
document.addEventListener("mousemove",(e)=>{

    if(glow){

        glow.style.left=e.clientX+"px";
        glow.style.top=e.clientY+"px";

    }

});
togglePassword.addEventListener("click",()=>{

    if(passwordInput.type==="password"){

        passwordInput.type="text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    }

    else{

        passwordInput.type="password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});
passwordInput.addEventListener("input",()=>{

    const password=passwordInput.value;

    let score=0;

    if(password.length>=8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[!@#$%^&*]/.test(password)) score++;

    if(score===1){

        strengthFill.style.width="25%";
        strengthFill.style.background="#EF4444";
        strengthText.innerText="Weak Password";

    }

    else if(score===2){

        strengthFill.style.width="50%";
        strengthFill.style.background="#F59E0B";
        strengthText.innerText="Medium Password";

    }

    else if(score===3){

        strengthFill.style.width="75%";
        strengthFill.style.background="#3B82F6";
        strengthText.innerText="Good Password";

    }

    else if(score===4){

        strengthFill.style.width="100%";
        strengthFill.style.background="#22C55E";
        strengthText.innerText="Strong Password";

    }

    else{

        strengthFill.style.width="0";
        strengthText.innerText="Password Strength";

    }

});
async function signup(){

    const name=nameInput.value.trim();

    const email=emailInput.value.trim();

    const password=passwordInput.value;

    const confirmPassword=confirmPasswordInput.value;

    if(name===""){

        alert("Please enter your name");

        return;

    }

    if(email===""){

        alert("Please enter email");

        return;

    }

    if(password===""){

        alert("Please enter password");

        return;

    }

    if(password!==confirmPassword){

        alert("Passwords do not match");

        return;

    }

    signupBtn.innerHTML="Creating Account...";

    signupBtn.disabled=true;

    try{

        const response=await fetch("/api/auth/signup",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                name,
                email,
                password

            })

        });

        const data=await response.json();

        if(data.success){

            alert(data.message);

            window.location.href="login.html";

        }

        else{

            alert(data.message);

        }

    }

    catch(error){

        alert("Server Error");

        console.log(error);

    }

    signupBtn.innerHTML="Create Account";

    signupBtn.disabled=false;

}
confirmPasswordInput.addEventListener("input",()=>{

    if(confirmPasswordInput.value===""){

        return;

    }

    if(passwordInput.value===confirmPasswordInput.value){

        confirmPasswordInput.style.color="#22C55E";

    }

    else{

        confirmPasswordInput.style.color="#EF4444";

    }

});