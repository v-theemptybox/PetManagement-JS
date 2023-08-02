"use strict";

const submitBtnBreed = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");

let breedArr = JSON.parse(getFromStorage("lsBreeds")) ?? [];

renderTableData(breedArr);

const validateForm = function (data) {
  //empty value
  if (data.pBreed == "" || data.pType == "Select Type") {
    alert("Please enter the value!");
    return false;
  } else return true;
};

// submit button - add breed
submitBtnBreed.addEventListener("click", function () {
  let breedData = {
    pBreed: breedInput.value,
    pType: typeInput.value,
  };

  console.log(breedData);
  if (validateForm(breedData)) {
    breedArr.push(breedData);
    saveToStorage("lsBreeds", JSON.stringify(breedArr));
    renderTableData(breedArr);
  }
});

// render breed data
function renderTableData(arr) {
  let tbodyEl = document.getElementById("tbody");

  // clear table
  tbodyEl.innerHTML = "";

  for (let breed of arr) {
    const row = document.createElement("tr");

    row.innerHTML =
      `<td>${arr.indexOf(breed) + 1}</td>` +
      `<td>${breed.pBreed}</td>` +
      `<td>${breed.pType}</td>` +
      `<td><button class="btn btn-danger" onclick="deleteBreed('${arr.indexOf(
        breed
      )}')">Delete</button></td>`;
    tbodyEl.appendChild(row);
  }
}

// delete breed
const deleteBreed = function (breedIndex) {
  if (confirm("Are you sure?")) {
    for (let breed of breedArr) {
      if (breedArr.indexOf(breed) == breedIndex) {
        breedArr.splice(breedArr.indexOf(breed), 1);
        renderTableData(breedArr);
        saveToStorage("lsBreeds", JSON.stringify(breedArr));
      }
    }
  }
};
