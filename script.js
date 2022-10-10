'use strict';

const submitBtn = $('#submit-btn');
const petID = $('#input-id');
const petName = $('#input-name');
const petAge = $('#input-age');
const petType = $('#input-type');
const petWeight = $('#input-weight');
const petLength = $('#input-length');
const petColor = $('#input-color-1');
const petBreed = $('#input-breed');
const vaccinatedInput = $('#input-vaccinated');
const dewormedInput = $('#input-dewormed');
const sterilizedInput = $('#input-sterilized');
const tbBodyElm = $('#tbody');
const deletePetBtn = $('.delete-pet');
const showHealthyPet = $('#healthy-btn');
const calculateBMI = $('#cal-bmi-btn');

const petData = {};

// Get pet data when user submit
const getPetData = () => {
  return {
    id: petID.value,
    name: petName.value,
    age: parseInt(petAge.value),
    type: petType.value,
    weight: petWeight.value,
    length: petLength.value,
    color: petColor.value,
    breed: petBreed.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: '?',
    date: date + '/' + month + '/' + year,
  };
};

// Validate function
function validateForm() {
  let checked = true;

  for (let i = 0; i < petDataList.length; i++) {
    //check id is unique
    if (petDataList[i].id === petID.value) {
      alert('ID must unique!');
      checked = false;
      break;
    }
  }
  // check ID is required
  if (!petID.value) {
    alert(`Please enter ID!`);
    checked = false;
  }
  // check Pet name
  if (!petName.value) {
    alert(`Please enter name!`);
    checked = false;
  }
  // Check Pet age
  if (!petAge.value) {
    alert(`Please enter age!`);
    checked = false;
  } else if (petAge.value < 1 || petAge.value > 15) {
    alert(`Age must be between 1 and 15'`);
    checked = false;
  }
  // Check Pet weight
  if (!petWeight.value) {
    alert(`Please enter weight!`);
    checked = false;
  } else if (petWeight.value > 15 || petWeight.value < 1) {
    alert(`Weight must be between 1 and 15`);
    checked = false;
  }
  // Check Pet Length
  if (!petLength.value) {
    alert(`Please enter length!`);
    checked = false;
  } else if (petLength.value > 100 || petLength.value < 1) {
    alert(`Length must be between 1 and 100`);
    checked = false;
  }
  // Check Pet color
  if (!petColor.value) {
    alert(`Please enter color!`);
    checked = false;
  }
  // Check Pet Breed
  if (petBreed.value === 'Select Breed' || petBreed.value === '') {
    alert(`Please select breed!`);
    checked = false;
  }

  // Check Pet Type
  if (petType.value === 'Select Type' || petType.value === '') {
    alert(`Please select type!`);
    checked = false;
  }
  return checked;
}

//Filter Pet Types

const catTypes = (arr) => {
  return arr.filter((item) => {
    return item.type === 'Cat';
  });
};

const dogTypes = (arr) => {
  return arr.filter((item) => {
    return item.type === 'Dog';
  });
};

// Render function
const renderPet = (itemList) => {
  console.log(itemList);
  const row = itemList
    .map((pet) => {
      return `<tr>
                <th scope="row">${pet.id}</th>
                <td>${pet.name}</td>
                <td>${pet.age}</td>
                <td>${pet.type}</td>
                <td>${pet.weight} kg</td>
                <td>${pet.length} cm</td>
                <td>${pet.breed}</td>
                
                <td>
                  <i class="bi bi-square-fill" style="color:${pet.color}"></i>
                </td>
                <td>
                  <i class="bi ${pet.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} ">
                  </i>
                  </td>
                <td><i class="bi ${
                  pet.dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
                }"></i></td>
                <td><i class="bi ${
                  pet.sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
                }"></i></td>
                
                <td>
                  ${pet.date}
                </td>
                <td>
                  <button
                  type="button"
                  class="btn btn-danger "
                  onclick="deletePet('${pet.id}')">
                    Delete
                  </button>
                </td>
    </tr>`;
    })
    .join('');
  return (tbBodyElm.innerHTML = row);
};
renderPet(petDataList);

/////////////////////////

const renderBreed = (arr) => {
  return (petBreed.innerHTML =
    '<option>Select Breed</option>' +
    arr
      .map((item) => {
        return `<option>${item.breed}</option>`;
      })
      .join(''));
};

renderBreed([]);

// Input type On Change Event

petType.onchange = () => {
  if (petType.value === 'Dog') renderBreed(dogTypes(breedDataList));

  if (petType.value === 'Cat') renderBreed(catTypes(breedDataList));
  if (petType.value === 'Select Type') renderBreed([]);
};

// Clear input value function

const clearInput = () => {
  petID.value = '';
  petName.value = '';
  petAge.value = '';
  petType.value = 'Select Type';
  petWeight.value = '';
  petLength.value = '';
  petBreed.value = 'Select Breed';
  petColor.value = '#000000';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Delete pet function

const deletePet = (petID) => {
  if (confirm('Are you sure ?')) {
    for (let i = 0; i < petDataList.length; i++) {
      if (petDataList[i].id === petID) {
        petDataList.splice(i, 1);
      }
    }
  }
  renderPet(petDataList);
  savetoStorage(_KEY, petDataList);
};

///////////////////////

// Submit pet to List
submitBtn.onclick = () => {
  if (validateForm()) {
    petDataList.push(getPetData());
    savetoStorage(_KEY, petDataList);
    renderPet(petDataList);
    clearInput();
  }
};

// Show healthy pet List

let isHealthy = true;
showHealthyPet.onclick = (e) => {
  if (isHealthy) {
    // Case isHealthy = true -> filter new list -> renderPet new list -> assign isHealthy=false -> switch button

    isHealthy = false;
    let healthyPetList = petDataList.filter(
      (pet) => pet.vaccinated === true && pet.dewormed === true && pet.sterilized === true
    );

    showHealthyPet.textContent = 'Show All Pet';
    renderPet(healthyPetList);
  } else {
    // Case isHealthy = false -> assign isHealthy = true -> renderPet petDataList -> switch button
    isHealthy = true;
    showHealthyPet.textContent = 'Show Healthy Pet';
    renderPet(petDataList);
  }
};
