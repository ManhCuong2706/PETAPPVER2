'use strict';

const searchByID = $('#input-id');
const searchByName = $('#input-name');
const searchByType = $('#input-type');
const searchByBreed = $('#input-breed');
const searchByVaccinated = $('#input-vaccinated');
const searchByDewormed = $('#input-dewormed');
const searchBySterilized = $('#input-sterilized');
const tbBodyElm = $('#tbody');

const searchBtn = $('#find-btn');

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

const renderSearch = (arr) => {
  const row = arr
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
    </tr>`;
    })
    .join('');
  return (tbBodyElm.innerHTML = row);
};

const renderBreed = (arr) => {
  return (searchByBreed.innerHTML =
    '<option>Select Breed</option>' +
    arr
      .map((item) => {
        return `<option>${item.breed}</option>`;
      })
      .join(''));
};

renderBreed(breedDataList);

// Clear input value function

const clearInput = () => {
  searchByID.value = '';
  searchByName.value = '';
  searchByType.value = 'Select Type';
  searchByBreed.value = 'Select Breed';
  searchByVaccinated.checked = false;
  searchBySterilized.checked = false;
  searchByDewormed.checked = false;
};

// *** SEARCH OPTIONS ***

searchBtn.onclick = () => {
  let searchArr = petDataList;

  // By ID
  if (searchByID.value) {
    searchArr = petDataList.filter((pet) =>
      pet.id.toUpperCase().includes(searchByID.value.toUpperCase())
    );
  }

  // By Name

  if (searchByName.value) {
    searchArr = petDataList.filter((pet) =>
      pet.name.toUpperCase().includes(searchByName.value.toUpperCase())
    );
  }

  // By Type
  if (searchByType.value && searchByType.value !== 'Select Type') {
    searchArr = petDataList.filter((pet) => pet.type === searchByType.value);
  }

  // By Breed

  if (searchByBreed.value && searchByBreed.value !== 'Select Breed') {
    searchArr = petDataList.filter((pet) => pet.breed === searchByBreed.value);
  }
  // By check box

  if (searchByVaccinated.checked) {
    searchArr = petDataList.filter((pet) => pet.vaccinated === true);
  }

  if (searchBySterilized.checked) {
    searchArr = petDataList.filter((pet) => pet.sterilized === true);
  }

  if (searchByDewormed.checked) {
    searchArr = petDataList.filter((pet) => pet.dewormed === true);
  }
  // Clear value
  clearInput();

  // renderSearch(petDataList);
  renderSearch(searchArr);
};
