"use strict";

// Animation sidebar
const sideBarNav = document.getElementById("sidebar");
sideBarNav.addEventListener("click", function () {
  sideBarNav.classList.toggle("active");
});

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}
