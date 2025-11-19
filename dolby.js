const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");
const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", () => {
    sidebar.style.left = "0";
    menuBtn.classList.remove("show-hamburger");
});

closeBtn.addEventListener("click", () => {
    sidebar.style.left = "-250px";
    menuBtn.classList.add("show-hamburger");
});


const submenuItems = document.querySelectorAll(".has-submenu");

submenuItems.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("open"); // يفتح أو يقفل الفرعية
    });
});﻿
