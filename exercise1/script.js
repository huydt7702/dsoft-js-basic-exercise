function throttle(mainFunction, delay) {
  let timerFlag = null;

  return (...args) => {
    if (timerFlag === null) {
      mainFunction(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
}

let dataArray = [];

for (let i = 0; i < 2000; i++) {
  let item = {
    id: i + 1,
    name: `Name${i}`,
    address: `Address${i}`,
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    phoneNumber: `0123456789${i.toString().padStart(3, '0')}`,
    description: `Description${i}`,
    source: `Source${i}`,
  };
  dataArray.push(item);
}

// Usual way
function searchItemByNameOrSource(nameOrSource) {
  return dataArray.find(
    (item) => item.name.toLowerCase() === nameOrSource || item.source.toLowerCase() === nameOrSource
  );
}

// Use hash table algorithm to optimized performance
function improveSearchItemByNameOrSource(nameOrSource) {
  let hashTable = {};
  for (let i = 0; i < dataArray.length; i++) {
    const item = dataArray[i];
    hashTable[item.name.toLowerCase()] = item;
    hashTable[item.source.toLowerCase()] = item;
  }
  return hashTable[nameOrSource];
}

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const resultTable = document.querySelector('table');
const errorMessage = document.querySelector('.error-message');

const tableHead = `
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Address</th>
    <th>Gender</th>
    <th>Phone Number</th>
    <th>Description</th>
    <th>Source</th>
    </tr>
`;

function handleSearchItemByNameOrSource() {
  const searchValue = input.value.toLowerCase().trim();
  const result = improveSearchItemByNameOrSource(searchValue);

  if (result) {
    errorMessage.innerText = '';
    resultTable.innerHTML = tableHead;
    const tableRow = document.createElement('tr');

    for (const key in result) {
      const tableData = document.createElement('td');
      tableData.textContent = result[key];
      tableRow.appendChild(tableData);
    }

    resultTable.appendChild(tableRow);
  } else {
    resultTable.innerText = '';
    errorMessage.innerText = 'Item table not found!!';
  }
}

// Use throttle to limits how often a function can be called in a given period of time
const throttledSearch = throttle(handleSearchItemByNameOrSource, 500);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  throttledSearch();
});
