"use strict";

const idInputEl = document.getElementById("input-id");
const nameInputEl = document.getElementById("input-name");
const ageInputEl = document.getElementById("input-age");
const typeInputEl = document.getElementById("input-type");
const weightInputEl = document.getElementById("input-weight");
const lengthInputEl = document.getElementById("input-length");
const colorInputEl = document.getElementById("input-color-1");
const breedInputEl = document.getElementById("input-breed");
const vaccinatedInputEl = document.getElementById("input-vaccinated");
const dewormedInputEl = document.getElementById("input-dewormed");
const sterilizedInputEl = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");

let petArr = JSON.parse(getFromStorage("lsPets")) ?? [];
let breedArr = JSON.parse(getFromStorage("lsBreeds")) ?? [];
let foundedPetArr = [];

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
      `<td>${new Date(pet.dateAdded).toLocaleDateString("vi-VN")}</td>`;

    tbodyEl.appendChild(row);
  }
}

// MAYBE THE LOGIC SHOULD BE REVIEWED
// Ongoing: Type, Breed
function findPetId(
  petId,
  petName,
  pType,
  pBreed,
  vaccinatedPet,
  dewormedPet,
  sterilizedPet
) {
  renderTableData(
    petArr.filter((pet) => {
      if (
        (pet.id.indexOf(petId) > -1 &&
          pet.name.indexOf(petName) > -1 &&
          // pet.type == pType
          // pet.breed == pBreed
          vaccinatedPet == pet.vaccinated) ||
        (pet.id.indexOf(petId) > -1 &&
          pet.name.indexOf(petName) > -1 &&
          // pet.type == pType
          // pet.breed == pBreed
          dewormedPet == pet.dewormed)

        // sterilizedPet == pet.sterilized
      ) {
        return pet;
      }
    })
  );
}

findBtn.addEventListener("click", function () {
  findPetId(
    idInputEl.value,
    nameInputEl.value,
    typeInputEl.value,
    breedInputEl.value,
    vaccinatedInputEl.checked,
    dewormedInputEl.checked,
    sterilizedInputEl.checked
  );
});
