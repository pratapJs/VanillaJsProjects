const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaire');
const sortBtn = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate_wealth');

let data = [];

//fetch random user and add  money

async function getRandomUser() {
  const res = await fetch(`https://randomuser.me/api`);
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

//Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//Double the money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//sort users by money

function sortHandler() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//show millionaires
function showMillionaires() {
  data = data.filter((item) => item.money >= 1000000);
  updateDOM();
}

//calculate total wealth
function totalWealth() {
  const total = data.reduce((acc, user) => acc + user.money, 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3> Total Wealth: ${formatMoney(total)}</h3>`;
  main.appendChild(wealthEl);
}

//Update DOM
function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong> ${item.name} </strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortHandler);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealth.addEventListener('click', totalWealth);
