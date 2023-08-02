"use strict";

const editForm = document.getElementById("container-form");
const idInputEl = document.getElementById("input-id");
const nameInputEl = document.getElementById("input-name");
const ageInputEl = document.getElementById("input-age");
const typeInputEl = document.getElementById("input-type");
const weightInputEl = document.getElementById("input-weight");
const lengthInputEl = document.getElementById("input-length");
const colorInputEl = document.getElementById("input-color-1");
const breedInputEl = document.getElementById("input-breed");

let petArr = JSON.parse(getFromStorage("lsPets")) ?? [];
let breedArr = JSON.parse(getFromStorage("lsBreeds")) ?? [];

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

// Ongoing: Type, Breed
function editPet(petId) {
  editForm.classList.remove("hide");
  for (let pet of petArr) {
    if (pet.id == petId) {
      idInputEl.value = pet.id;
      nameInputEl.value = pet.name;
      ageInputEl.value = pet.age;
      typeInputEl.value = pet.type;
      weightInputEl.value = pet.weight;
      lengthInputEl.value = pet.lengthVal;
      colorInputEl.value = pet.color;
      breedInputEl.value = pet.breed;
    }
  }
}

// Render breed
const renderBreed = function (breedArr) {
  const filteredBreed = breedArr.filter(
    (breed) => typeInput.value == breed.pType
  );

  while (breedInput.hasChildNodes()) {
    breedInput.removeChild(breedInput.firstChild);
  }

  for (let breed of filteredBreed) {
    const option = document.createElement("option");
    option.innerHTML = `${breed.pBreed}`;
    breedInput.appendChild(option);
  }
};

typeInput.addEventListener("change", function handleChange(event) {
  for (let breed of breedArr) {
    breed.pType == typeInput.value;
  }
  renderBreed(breedArr);
});
