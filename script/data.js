'use strict';

const exportBtn = $('#export-btn');
const importBtn = $('#import-btn');
const inputFile = $('#input-file');

// Export
exportBtn.onclick = () => {
  const blob = new Blob([JSON.stringify(petDataList)], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'Pet-List.txt');
};

// Import

importBtn.onclick = () => {
  if (!inputFile.value) {
    alert('Please choose a file to import !');
  } else {
    const isImport = confirm('Do you want to import this file ?');
    if (isImport) {
      const file = inputFile.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        savetoStorage(_KEY, JSON.parse(reader.result));
        alert('Import successfully !');
        console.log(reader.result);
        console.log(petDataList);
      };

      if (file) {
        reader.readAsText(file);
      }
    }
  }
};
