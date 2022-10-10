'use strict';
const tbBodyElm = $('#tbody');
const editForm = $('#container-form');
const petEditID = $('#input-id');
const petEditName = $('#input-name');
const petEditAge = $('#input-age');
const petEditType = $('#input-type');
const petEditWeight = $('#input-weight');
const petEditLength = $('#input-length');
const petEditColor = $('#input-color-1');
const petEditBreed = $('#input-breed');
const vaccinatedEdit = $('#input-vaccinated');
const dewormedEdit = $('#input-dewormed');
const sterilizedEdit = $('#input-sterilized');

const submitEdit = $('#submit-btn');

//Check Values

function validateForm() {
  let checked = true;
  // check Pet name
  if (!petEditName.value) {
    alert(`Please enter name!`);
    checked = false;
  }
  // Check PetEdit age
  if (!petEditAge.value) {
    alert(`Please enter age!`);
    checked = false;
  } else if (petEditAge.value < 1 || petEditAge.value > 15) {
    alert(`Age must be between 1 and 15'`);
    checked = false;
  }
  // Check PetEdit weight
  if (!petEditWeight.value) {
    alert(`Please enter weight!`);
    checked = false;
  } else if (petEditWeight.value > 15 || petEditWeight.value < 1) {
    alert(`Weight must be between 1 and 15`);
    checked = false;
  }
  // Check PetEdit Length
  if (!petEditLength.value) {
    alert(`Please enter length!`);
    checked = false;
  } else if (petEditLength.value > 100 || petEditLength.value < 1) {
    alert(`Length must be between 1 and 100`);
    checked = false;
  }
  // Check PetEdit color
  if (!petEditColor.value) {
    alert(`Please enter color!`);
    checked = false;
  }
  // Check PetEdit Breed
  if (petEditBreed.value === 'Select Breed' || petEditBreed.value === '') {
    alert(`Please select breed!`);
    checked = false;
  }

  // Check PetEdit Type
  if (petEditType.value === 'Select Type' || petEditType.value === '') {
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
                <td><i class="bi ${
                  pet.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
                } "></i></td>
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
                  class="btn btn-warning"
                  onclick="startEditPet('${pet.id}')">
                    Edit
                  </button>
                </td>
    </tr>`;
    })
    .join('');
  return (tbBodyElm.innerHTML = row);
};

renderPet(petDataList);

const renderBreed = (arr) => {
  return (petEditBreed.innerHTML =
    '<option>Select Breed</option>' +
    arr
      .map((item) => {
        return `<option>${item.breed}</option>`;
      })
      .join(''));
};

renderBreed([]);

// Fill in Breed

const fillBreedOptions = (type) => {
  if (type === 'Dog') renderBreed(dogTypes(breedDataList));
  if (type === 'Cat') renderBreed(catTypes(breedDataList));
  if (type === 'Select Type') renderBreed([]);
};

// Change Type event

petEditType.onchange = () => {
  if (petEditType.value === 'Dog') renderBreed(dogTypes(breedDataList));
  if (petEditType.value === 'Cat') renderBreed(catTypes(breedDataList));
  if (petEditType.value === 'Select Type') renderBreed([]);
};

// Edit pet Function

const startEditPet = (id) => {
  petDataList.forEach((pet) => {
    if (pet.id === id) {
      editForm.classList.remove('hide');
      petEditID.value = pet.id;
      petEditName.value = pet.name;
      petEditAge.value = pet.age;
      petEditType.value = pet.type;
      petEditWeight.value = pet.weight;
      petEditLength.value = pet.length;
      petEditColor.value = pet.color;
      vaccinatedEdit.checked = pet.vaccinated;
      dewormedEdit.checked = pet.dewormed;
      sterilizedEdit.checked = pet.sterilized;
      fillBreedOptions(pet.type);
      petEditBreed.value = `${pet.breed}`;
    }
  });
};

// get value after edit
const getEditValue = () => {
  return {
    id: petEditID.value,
    name: petEditName.value,
    age: petEditAge.value,
    type: petEditType.value,
    weight: petEditWeight.value,
    length: petEditLength.value,
    color: petEditColor.value,
    breed: petEditBreed.value,
    vaccinated: vaccinatedEdit.checked,
    dewormed: dewormedEdit.checked,
    sterilized: sterilizedEdit.checked,
    date: date + '/' + month + '/' + year,
  };
};

// submit Values

submitEdit.onclick = () => {
  if (validateForm()) {
    const data = getEditValue();
    const index = petDataList.findIndex((pet) => pet.id === data.id);

    petDataList[index] = data;
    savetoStorage('petDataList', petDataList);
    renderPet(petDataList);

    editForm.classList.add('hide');
  }
};
