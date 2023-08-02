"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const editForm = document.getElementById("container-form");

let petArr = JSON.parse(getFromStorage("lsPets")) ?? [];

renderTableData(petArr);

// Check checkbox
function isChecked(checkBoxVal) {
  return checkBoxVal ? "bi-check-circle-fill" : "bi-x-circle-fill";
}

// Render Table Data
function renderTableData(arr) {
  let tbodyEl = document.getElementById("tbody");

  // clear table
  tbodyEl.innerHTML = "";

  for (let pet of arr) {
    const row = document.createElement("tr");

    row.innerHTML =
      `<td><strong>${pet.id}<strong></td>` +
      `<td>${pet.name}</td>` +
      `<td>${pet.age}</td>` +
      `<td>${pet.type}</td>` +
      `<td>${pet.weight} kg</td>` +
      `<td>${pet.lengthVal} cm</td>` +
      `<td>${pet.breed}</td>` +
      `<td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>` +
      `<td><i class="bi ${isChecked(pet.vaccinated)}"></i></td>` +
      `<td><i class="bi ${isChecked(pet.dewormed)}"></i></td>` +
      `<td><i class="bi ${isChecked(pet.sterilized)}"></i></td>` +
      `<td>${new Date(pet.dateAdded).toLocaleDateString("vi-VN")}</td>` +
      `<td><button class="btn btn-warning" onclick="editPet('${pet.id}')">Edit</button></td>`;
    tbodyEl.appendChild(row);
  }
}

function editPet(petId) {
  editForm.classList.toggle("hide");
}
