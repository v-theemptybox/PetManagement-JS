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
const vaccinatedInputEl = document.getElementById("input-vaccinated");
const dewormedInputEl = document.getElementById("input-dewormed");
const sterilizedInputEl = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");

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
      `<td><button class="btn btn-warning" onclick="startEditPet('${pet.id}')">Edit</button></td>`;
    tbodyEl.appendChild(row);
  }
}

// load pet info to input
function startEditPet(petId) {
  breedInputEl.innerHTML = "";
  editForm.classList.remove("hide");
  for (let pet of petArr) {
    if (pet.id == petId) {
      idInputEl.value = pet.id;
      nameInputEl.value = pet.name;
      ageInputEl.value = pet.age;
      typeInputEl.value = pet.type;
      breedArr
        .filter((breed) => breed.pType == typeInputEl.value)
        .forEach((breed) => {
          const breedOption = document.createElement("option");
          breedOption.value = breed.pBreed;
          breedOption.textContent = breed.pBreed;
          breedInputEl.appendChild(breedOption);
        });
      weightInputEl.value = pet.weight;
      lengthInputEl.value = pet.lengthVal;
      colorInputEl.value = pet.color;
      breedInputEl.value = pet.breed;
      vaccinatedInputEl.checked = pet.vaccinated;
      dewormedInputEl.checked = pet.dewormed;
      sterilizedInputEl.checked = pet.sterilized;
    }
  }
}

const validateForm = function (data) {
  //empty value
  if (data.name == "") {
    alert("Please enter the value!");
    return false;
  }
  //age must be 1 to 15
  else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  //weight must be 1 to 15
  else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  //length must be 1 to 100
  else if (data.lengthVal < 1 || data.lengthVal > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  //type must be selected
  else if (data.type == "Select Type") {
    alert("Please select Type!");
    return false;
  }
  //breed must be selected
  else if (data.breed == "Select Breed" || data.breed == "") {
    alert("Please select Breed!");
    return false;
  } else return true;
};

// edit pet
function editPet(petId) {
  for (let pet of petArr) {
    if (pet.id == petId) {
      pet.name = nameInputEl.value;
      pet.age = ageInputEl.value;
      pet.type = typeInputEl.value;
      pet.breed = breedInputEl.value;
      pet.weight = weightInputEl.value;
      pet.lengthVal = lengthInputEl.value;
      pet.color = colorInputEl.value;
      pet.breed = breedInputEl.value;
      pet.vaccinated = vaccinatedInputEl.checked;
      pet.dewormed = dewormedInputEl.checked;
      pet.sterilized = sterilizedInputEl.checked;
    }
  }
}

submitBtn.addEventListener("click", function () {
  let data = {
    name: nameInputEl.value,
    age: Number(ageInputEl.value),
    type: typeInputEl.value,
    weight: Number(weightInputEl.value),
    lengthVal: Number(lengthInputEl.value),
    breed: breedInputEl.value,
    color: colorInputEl.value,
    vaccinated: vaccinatedInputEl.checked,
    dewormed: dewormedInputEl.checked,
    sterilized: sterilizedInputEl.checked,
    dateAdded: new Date(),
  };
  if (validateForm(data)) {
    editForm.classList.add("hide");
    editPet(idInputEl.value);
    renderTableData(petArr);
    saveToStorage("lsPets", JSON.stringify(petArr));
  }
});

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

typeInputEl.addEventListener("change", function () {
  breedInputEl.innerHTML = "";

  breedArr
    .filter((breed) => breed.pType == typeInputEl.value)
    .forEach((breed) => {
      const breedOption = document.createElement("option");
      breedOption.value = breed.pBreed;
      breedOption.textContent = breed.pBreed;
      breedInputEl.appendChild(breedOption);
    });
});
