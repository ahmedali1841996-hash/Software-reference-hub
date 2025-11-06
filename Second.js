// JavaScript source code
const username = "a.ali";
const password = "8200";
const user = prompt("Enter username:");
const pass = prompt("Enter password:");

if (user !== username || pass !== password) {
    alert("❌ Maybe the username or password is wrong!");
    window.location.href = "index.html"; 
}

