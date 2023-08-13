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

breedArr.forEach((breed) => {
  const option = document.createElement("option");
  option.value = breed.pBreed;
  option.textContent = breed.pBreed;
  breedInputEl.appendChild(option);
});

// function findPet(
//   idChar,
//   nameChar,
//   typePet,
//   breedPet,
//   vaccinatedPet,
//   dewormedPet,
//   sterilizedPet
// ) {
//   let filteredPets = [];

//   if (typePet != "Select Type") {
//     if (!vaccinatedPet && !dewormedPet && !sterilizedPet) {
//       // if no conditions checked, show all pets
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar) &&
//           pet.type === typePet
//         );
//       });
//     } else if (vaccinatedPet && !dewormedPet && !sterilizedPet) {
//       // only vaccinated
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.vaccinated &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar) &&
//           pet.type == typePet
//         );
//       });
//     } else if (!vaccinatedPet && dewormedPet && !sterilizedPet) {
//       // only dewormed
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.dewormed &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar) &&
//           pet.type == typePet
//         );
//       });
//     } else if (!vaccinatedPet && !dewormedPet && sterilizedPet) {
//       // only sterilized
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.sterilized &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar) &&
//           pet.type == typePet
//         );
//       });
//     } else if (vaccinatedPet && dewormedPet && !sterilizedPet) {
//       // vaccinated and dewormed
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.vaccinated &&
//           pet.dewormed &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar) &&
//           pet.type == typePet
//         );
//       });
//     } else if (vaccinatedPet && !dewormedPet && sterilizedPet) {
//       // vaccinated and sterilized
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.vaccinated &&
//           pet.sterilized &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar) &&
//           pet.type == typePet
//         );
//       });
//     } else if (!vaccinatedPet && dewormedPet && sterilizedPet) {
//       // dewormed and sterilized
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.dewormed &&
//           pet.sterilized &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar) &&
//           pet.type == typePet
//         );
//       });
//     } else if (vaccinatedPet && dewormedPet && sterilizedPet) {
//       // all
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.vaccinated &&
//           pet.dewormed &&
//           pet.sterilized &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar) &&
//           pet.type == typePet
//         );
//       });
//     }
//   } else {
//     if (!vaccinatedPet && !dewormedPet && !sterilizedPet) {
//       // if no conditions checked, show all pets
//       filteredPets = petArr.filter((pet) => {
//         return pet.id.includes(idChar) && pet.name.includes(nameChar);
//       });
//     } else if (vaccinatedPet && !dewormedPet && !sterilizedPet) {
//       // only vaccinated
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.vaccinated &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar)
//         );
//       });
//     } else if (!vaccinatedPet && dewormedPet && !sterilizedPet) {
//       // only dewormed
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.dewormed && pet.id.includes(idChar) && pet.name.includes(nameChar)
//         );
//       });
//     } else if (!vaccinatedPet && !dewormedPet && sterilizedPet) {
//       // only sterilized
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.sterilized &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar)
//         );
//       });
//     } else if (vaccinatedPet && dewormedPet && !sterilizedPet) {
//       // vaccinated and dewormed
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.vaccinated &&
//           pet.dewormed &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar)
//         );
//       });
//     } else if (vaccinatedPet && !dewormedPet && sterilizedPet) {
//       // vaccinated and sterilized
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.vaccinated &&
//           pet.sterilized &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar)
//         );
//       });
//     } else if (!vaccinatedPet && dewormedPet && sterilizedPet) {
//       // dewormed and sterilized
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.dewormed &&
//           pet.sterilized &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar)
//         );
//       });
//     } else if (vaccinatedPet && dewormedPet && sterilizedPet) {
//       // all
//       filteredPets = petArr.filter((pet) => {
//         return (
//           pet.vaccinated &&
//           pet.dewormed &&
//           pet.sterilized &&
//           pet.id.includes(idChar) &&
//           pet.name.includes(nameChar)
//         );
//       });
//     }
//   }

//   renderTableData(filteredPets);
// }

// refactor findPet code
function findPet(
  idChar,
  nameChar,
  typePet,
  breedPet,
  vaccinatedPet,
  dewormedPet,
  sterilizedPet
) {
  const filterConditions = {
    id: idChar,
    name: nameChar,
    type: typePet,
    breed: breedPet,
    vaccinated: vaccinatedPet,
    dewormed: dewormedPet,
    sterilized: sterilizedPet,
  };

  const filteredPets = petArr.filter((pet) => {
    return Object.entries(filterConditions).every(([key, value]) => {
      if (key === "type" && value === "Select Type") {
        return true;
      }
      if (key === "breed" && value === "Select Breed") {
        return true;
      }
      if (key === "vaccinated" || key === "dewormed" || key === "sterilized") {
        return !value || pet[key];
      }

      return pet[key].includes(value);
    });
  });

  renderTableData(filteredPets);
}

findBtn.addEventListener("click", function () {
  findPet(
    idInputEl.value,
    nameInputEl.value,
    typeInputEl.value,
    breedInputEl.value,
    vaccinatedInputEl.checked,
    dewormedInputEl.checked,
    sterilizedInputEl.checked
  );
});
