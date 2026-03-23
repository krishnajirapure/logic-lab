// Default demo account
localStorage.setItem("krishnam", "krishna");

function signup() {
    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;

    if (!user || !pass) return alert("Fill all fields!");

    localStorage.setItem(user, pass);
    alert("Account Created!");
    showLogin();
}

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // Default demo login
    if (user === "krishnam" && pass === "krishna") {
        window.location.href = "index.html";
        return;
    }

    let saved = localStorage.getItem(user);
    if (saved === pass) {
        window.location.href = "index.html";
    } else {
        alert("Invalid Login!");
    }
}

function showSignup() {
    document.querySelectorAll(".form-box")[0].classList.add("hidden");
    document.querySelectorAll(".form-box")[1].classList.remove("hidden");
}

function showLogin() {
    document.querySelectorAll(".form-box")[1].classList.add("hidden");
    document.querySelectorAll(".form-box")[0].classList.remove("hidden");
}
