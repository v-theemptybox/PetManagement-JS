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
const healthyBtn = document.getElementById("healthy-btn");

let petArr = JSON.parse(getFromStorage("lsPets")) ?? [];
let healthyCheck = true;
let healthyPetArr = [];

// const dummyData1 = {
//   id: "P001",
//   name: "Doge",
//   age: 10,
//   type: "Dog",
//   weight: 10,
//   lengthVal: 50,
//   breed: "Shiba",
//   color: "#D59557",
//   vaccinated: true,
//   dewormed: false,
//   sterilized: false,
//   dateAdded: new Date(),
// };

// const dummyData2 = {
//   id: "P002",
//   name: "Kitty",
//   age: 5,
//   type: "Cat",
//   weight: 5,
//   lengthVal: 30,
//   breed: "Brittania",
//   color: "#8F8F91",
//   vaccinated: true,
//   dewormed: true,
//   sterilized: true,
//   dateAdded: new Date(),
// };

renderTableData(petArr);

// Validate Function
const validateForm = function (data) {
  //duplicate id
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      return false;
    }
  }
  for (let i = 0; i < healthyPetArr.length; i++) {
    if (data.id === healthyPetArr[i].id) {
      alert("ID must be unique!");
      return false;
    }
  }

  //empty value
  if (data.id == "" || data.name == "") {
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

//Submit Button
submitBtn.addEventListener("click", function () {
  let data = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    type: typeInput.value,
    weight: Number(weightInput.value),
    lengthVal: Number(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    dateAdded: new Date(),
  };

  const validate = validateForm(data);

  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
    saveToStorage("lsPets", JSON.stringify(petArr));
  }
});

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
      `<td><button class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete</button></td>`;
    tbodyEl.appendChild(row);
  }
}

// Clear Input
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Delete Pet
const deletePet = function (petId) {
  if (confirm("Are you sure?")) {
    for (let pet of petArr) {
      if (pet.id == petId) {
        petArr.splice(petArr.indexOf(pet), 1);
        renderTableData(petArr);
        saveToStorage("lsPets", JSON.stringify(petArr));

        healthyBtn.textContent = "Show Healthy Pet";
        healthyCheck = true;
      }
    }
    for (let healthyPet of healthyPetArr) {
      if (healthyPet.id == petId) {
        healthyPetArr.splice(healthyPetArr.indexOf(healthyPet), 1);
      }
    }
  }
};

// Healthy pet
healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    for (let pet of petArr) {
      if (
        pet.vaccinated == true &&
        pet.dewormed == true &&
        pet.sterilized == true
      ) {
        healthyPetArr.push(pet);
      }
    }
    healthyBtn.textContent = "Show All Pet";
    renderTableData(healthyPetArr);
    healthyCheck = false;
  } else {
    healthyPetArr = [];
    healthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
    healthyCheck = true;
  }
});

let breedArr = JSON.parse(getFromStorage("lsBreeds")) ?? [];

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

// Onchange type input
typeInput.addEventListener("change", function handleChange(event) {
  if (typeInput.value == "Select Type") {
    breedInput.value = "Select Breed";
  } else {
    for (let breed of breedArr) {
      typeInput.value == breed.pType;
    }
    renderBreed(breedArr);
  }
});
