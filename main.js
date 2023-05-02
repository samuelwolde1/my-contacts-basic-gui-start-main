// My Contacts Basic
// localStorage.setItem("contacts", "[]")


// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variables
let contacts = loadContacts();
displayContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === 'display-email'){
    displayByEmail();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = '';
  for (let i = 0; i < contacts.length; i++){
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
  saveContacts();
}

function addContact() {
  let name = prompt("Enter a name");
  let phone = prompt("Please enter a phone number");
  let email = prompt("Please enter an email");
  let country = prompt("Please enter your country");
  contacts.push(newContacts(name, phone, email, country));
  for (let i = 0; i < contacts.length; i++){
  outputEl.innerHTML = `New Contact Added: <b>${i}:<b> ${name}`
  saveContacts();
  }
}

// Remove contact by index
function removeContact() {
  let email = prompt("Enter the email of the contact you would like to remove:");
  let index = findByEmail(email)
  if (index === undefined){
    alert("Email is not valid");
  }
  else {
    outputEl.innerHTML = `Contact with that email is found at ${index}`
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
  }
}

function displayByName() {
  outputEl.innerHTML = "";
  let searchByName = prompt("Enter the name for the contact you are looking for:");
  for (let i = 0; i < contacts.length; i++){
    if (contacts[i].name.includes(searchByName)) {
      outputEl.innerHTML += getContactHTMLStr(contacts[i], i);
    }
  }

}

function displayByCountry() {
  outputEl.innerHTML = "";
  let countrySearch = prompt("Enter the country for the contact you are looking for:");
  for (let i = 0; i < contacts.length; i++) {
  if (countrySearch === contacts[i].country) {
    outputEl.innerHTML += getContactHTMLStr(contacts[i], i);
    }
  }
}

function displayByEmail(){
  outputEl.innerHTML = "";
  let searchByEmail = prompt("Enter the email for the contact you are looking for:");
    for (let i = 0; i < contacts.length; i++){
      if(contacts[i].email.includes(searchByEmail)){
        outputEl.innerHTML += getContactHTMLStr(contacts[i], i);
    }
  }
}


function findByEmail(email){
  for (let i = 0; i < contacts.length; i++){
    if(contacts[i].email === email){
      return i;
   }
  }
}


// Helper Functions
function newContacts(name, phone, email, country) {
  return {
    'name': name, 'phone': phone, 'email': email, 'country':country
  };
}

function getContactHTMLStr(contacts, i) {
  return `
    <div> 
    Contact(s): <b>${i}: ${contacts.name}</b> <p>${contacts.email}</p> ${contacts.phone} (${contacts.country})<hr><hr>
    </div>`
}
// Save global contact to local storage

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load global contact to local storage
function loadContacts() {
  let contactStr = localStorage.getItem('contacts');
  return JSON.parse(contactStr) ?? [];
}