"use strict";

const btnImport = document.getElementById("import-btn");
const btnExport = document.getElementById("export-btn");
const file = document.getElementById("input-file");

// let jsonData = getFromStorage("lsPets");
let petArr = JSON.parse(getFromStorage("lsPets")) ?? [];
let jsonData = JSON.stringify(petArr, null, 2);

let breedArr = JSON.parse(getFromStorage("lsBreeds")) ?? [];

btnImport.addEventListener("click", handleImportBtn);

function handleImportBtn(e) {
  // if no file, do nothing
  if (!file.value.length) return;

  let reader = new FileReader();

  // setup callback event to run when file is read
  reader.onload = logFile;
  reader.readAsText(file.files[0]);
}

function logFile(e) {
  let str = e.target.result;
  let importedData = JSON.parse(str);

  importedData.forEach((importedObj) => {
    let existingObjIndex = petArr.findIndex(
      (existingObj) => existingObj.id === importedObj.id
    );

    if (existingObjIndex !== -1) {
      // overwrite the existing object with the imported object
      petArr[existingObjIndex] = importedObj;
    } else {
      // add the imported object to the array if it doesn't already exist
      petArr.push(importedObj);
    }

    // create temp object get breed and type of petArr
    const breedObject = {
      pBreed: importedObj.breed,
      pType: importedObj.type,
    };

    // do the same with the breed
    let existingObjBreed = breedArr.findIndex(
      (existingObj) => existingObj.breed === importedObj.breed
    );

    console.log(existingObjBreed);
    if (existingObjBreed !== -1) {
      // debugger;
      breedArr[existingObjBreed] = breedObject;
    } else {
      // debugger;
      breedArr.push(breedObject);
    }
  });

  saveToStorage("lsPets", JSON.stringify(petArr));
  saveToStorage("lsBreeds", JSON.stringify(breedArr));
}

// export json file
function exportToJsonFile() {
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(jsonData);

  let exportFileDefaultName = "data.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

btnExport.addEventListener("click", exportToJsonFile);
