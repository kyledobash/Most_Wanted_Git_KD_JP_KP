"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByMultipleTrait(people)
      displayPeople(searchResults);
      let selectedName = searchByName(searchResults);
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
      displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
      displayFamily(person, people);
    break;
    case "descendants":
      displayDescendants(GetDescendants(person, people));
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName == firstName && person.lastName == lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  let foundPersonObj = foundPerson[0];
  return foundPersonObj;
}

function searchByMultipleTrait(people){
  let input = promptFor("How many traits do you want to search for?", chars);
  let numberOfTraits = parseInt(input); //convert input to an int
  let filteredPeople = searchByTrait(people);

  while(numberOfTraits - 1 > 0){
    filteredPeople = searchByTrait(filteredPeople);
    numberOfTraits --;
  }
  return filteredPeople;
}


function searchByTrait(people) {
  let selectedTrait = promptFor("Which trait would you like to search by\n gender - date of birth - height - weight - eye color - occupation", chars);

  switch(selectedTrait) {
    case "gender":
      let selectedGender = promptFor("Type Male or Female", chars);
      return searchByGender(people, selectedGender);
    case "date of birth":
      let selectedDOB = promptFor("Enter date of birth (example: 1/24/1957)", chars);
      return searchByDOB(people, selectedDOB);
    case "height":
      let selectedHeight = promptFor("Enter height in inches", chars);
      return searchByHeight(people, selectedHeight);
    case "weight":
        let selectedWeight = promptFor("Enter weight in pounds (lbs)", chars);
        return searchByWeight(people, selectedWeight);
    case "eye color":
      let selectedEyeColor = promptFor("Enter eye color", chars);
      return searchByEyeColor(people, selectedEyeColor);
    case "occupation":
      let selectedOccupation = promptFor("Enter eye color", chars);
      return searchByOccupation(people, selectedOccupation);
  }
}

function searchByOccupation(people, selection) {
  let foundPeople = people.filter(function(person){
    if(person.occupation === selection){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByEyeColor(people, selection) {
  let foundPeople = people.filter(function(person){
    if(person.eyeColor === selection){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByWeight(people, selection) {
  let foundPeople = people.filter(function(person){
    if(person.weight == selection){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByHeight(people, selection) {
  let foundPeople = people.filter(function(person){
    if(person.height == selection){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByDOB(people, selection) {
  let foundPeople = people.filter(function(person){
    if(person.dob === selection){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPeople;
}

function searchByGender(people, selection) {
  let foundPeople = people.filter(function(person){
    if(person.gender === selection){
      
      return true;
    }
    else {
      return false;
    }
  })
  return(foundPeople);
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayFamily(person) {
  if (person.parents === null) {
    console.log("No parents found")
  }
  else {
    for (var i = 0; i < person.parents.length; i++) {
      displayPerson(parent);
    }
  }
}
function getSpouse(selectedPerson, people){
  var spouseId;
  spouseId = selectedPerson.currentSpouse;
  let foundSpouse = people.filter(function(person){
    if(spouseId === person.id){
      return true;
    }
    else {
      return false;
    }
  })
  return foundSpouse;
}

function getParents(selectedPerson, people){
  let foundParents = people.filter(function(person){
    if(selectedPerson.parents[0] === person.id || selectedPerson.parents[1] === person.id){
      return true;
    }
    else {
      return false;
    }
  })
  return foundParents;
}

function getSibs(selectedPerson, people){
  let foundParents = people.filter(function(person){
    if(selectedPerson.parents[0] === person.parents[0] || selectedPerson.parents[0] === person.parents[1]){
      return true;
    }
    else if (selectedPerson.parents[1] === person.parents[1] || selectedPerson.parents[1] === person.parents[0]) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundParents;
}

function displayFamily(person, people){
  let displayFamily = "";
  let selectedParents = getParents(person, people);
  let selectedSpouse = getSpouse(person, people);
  let selectedSibs = getSibs(person, people);
  
  displayFamily += displayHelper(selectedParents, displayFamily);
  displayFamily += displayHelper(selectedSpouse, displayFamily);
  displayFamily += displayHelper(selectedSibs, displayFamily);

  //declare display string
  //call all helper functions and set to variables
  //iterate over variables and concatenate string
  //alert with string
  alert(displayFamily);
}

function displayHelper(toDisplay, inputString){
  for (let i= 0; i < toDisplay.length; i++) {
    displayFamily += toDisplay[i].firstName + " " + toDisplay[i].lastName + "\n";    
  }
  return displayFamily;
}


function GetDescendants(selectedPerson, people, descendants = []) {
  
    // person.parents[0].id == selectedPerson.id || person.parents[1].id == selectedPerson.id
    for (var i = 0; i < people.length; i++) {
      if (people[i].parents[0] == selectedPerson.id || people[i].parents[1] == selectedPerson.id) {
        descendants.push(people[i]);
        GetDescendants(people[i], people, descendants);
      }
    }
  return descendants;
}

function displayDescendants(descendants) {
  let descendantsString = "";
  for (var i = 0; i < descendants.length; i++) {
    descendantsString += descendants[i].firstName + " " + descendants[i].lastName + "\n";
  }
  alert(descendantsString);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}


// Fix search by trait, uncomment out the switch case & helper methods 
// Fix the search Family method to inculde Spouses and Sibs