'use strict';

const breedValues = $('#input-breed');
const typeValues = $('#input-type');
const submitBreedBtn = $('#submit-btn');
const tbBodyBreedElm = $('#tbody');

// Get input values
const getBreed = () => {
  return {
    breed: breedValues.value,
    type: typeValues.value,
  };
};

// Validate function
function validateBreed() {
  let checked = true;

  // check Breed is required
  if (!breedValues.value) {
    alert(`Please enter Breed!`);
    checked = false;
  }
  // check Pet name
  if (typeValues.value === 'Select Type') {
    alert(`Please select type !`);
    checked = false;
  }
  return checked;
}

// Render Breed List
const renderBreedToTable = (arr) => {
  const row = arr
    .map((item, i) => {
      return `
                <tr>
                    <td>${i + 1}</td>
                    <td>${item.breed}</td>
                    <td>${item.type}</td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-danger "
                            onclick="deleteBreed('${i}')">
                        Delete
                    </button>
                    </td>
                </tr>
      `;
    })
    .join('');
  return (tbBodyBreedElm.innerHTML = row);
};

renderBreedToTable(breedDataList);

// Clear input
const clearInput = () => {
  breedValues.value = '';
  typeValues.value = 'Select Type';
};

// submit Data
submitBreedBtn.onclick = () => {
  if (validateBreed()) {
    breedDataList.push(getBreed());

    savetoStorage(_BR, breedDataList);
    renderBreedToTable(breedDataList);
    clearInput();
  }
};

// Delete breed function

const deleteBreed = (index) => {
  if (confirm('Are you sure ?')) {
    for (let i = 0; i < breedDataList.length; i++) {
      if (i === parseInt(index)) {
        breedDataList.splice(i, 1);
      }
    }
  }

  savetoStorage(_BR, breedDataList);
  renderBreedToTable(breedDataList);
};
