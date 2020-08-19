//localStorage.clear();
const mulTable = document.querySelector("#mul-table");
document.addEventListener("DOMContentLoaded", getBackSquares); //refreshing the page

const cols = 10,
  rows = 10;

//functions

//first row for top nums
const newRow = document.createElement("tr");
mulTable.appendChild(newRow);

//top nums
for (let j = 0; j < cols; j++) {
  const newCol = document.createElement("th");
  newCol.innerText = `${j + 1}`;
  newCol.classList.add("topCols");
  newRow.appendChild(newCol);
  // console.log(newRow.classList);
}

//first square is the left frame and than creating td
for (let i = 0; i < rows - 1; i++) {
  const newRow = document.createElement("tr");
  // newRow.innerText = `${i + 1}`;
  mulTable.appendChild(newRow);

  let dgl = true;
  for (let j = 0; j < cols; j++) {
    if (dgl) {
      const newCol = document.createElement("th");
      newCol.innerText = `${i + 2}`;
      newCol.classList.add("cols");
      newRow.appendChild(newCol);
      // console.log(newRow.classList);
      dgl = false;
    } else {
      const newData = document.createElement("td");
      newData.innerText = (j + 1) * (i + 2);
      newData.classList.add("data");
      newRow.appendChild(newData);
    }
  }
}
const clickData = document.querySelectorAll(".data");
// console.log(clickData);
// console.log(clickData[23].innerText);

clickData.forEach(function (e, index) {
  e.addEventListener("click", function () {
    console.log(e.classList);
    if (e.classList[1] === "revealing") {
      e.classList.remove("revealing");
      console.log(e.classList[1]);
      //second click removes the square
      removeSquare(index);
    } else if (e.classList[0] === "data") {
      console.log(e.classList[0]);
      e.classList.toggle("revealing");
      saveSquare(index); //saving in local storage the index of the revealed square
    }
  });
});

//CHECK IF THERE IS A LOCALSTORAGE
function checkIfSquare() {
  let squares;

  if (localStorage.getItem("squares") === null) {
    squares = [];
  } else {
    squares = JSON.parse(localStorage.getItem("squares")); //converts the string from the web to object
  }

  return squares;
}

//PUSH THE SQUARE INDEX INTO THE local storage
function saveSquare(square) {
  let squares = checkIfSquare();
  squares.push(square);

  localStorage.setItem("squares", JSON.stringify(squares)); //converts the object to a stringb in order to storage it in web
}
//after refreshing
function getBackSquares() {
  //in squares there are indexes the was revealed before refreshing
  let squares = checkIfSquare();
  squares.forEach((square) => {
    clickData[square].classList.toggle("revealing");
  });
}

//SECOND CLICK REMOVES SQUARE FROM LS
function removeSquare(square) {
  let squares = checkIfSquare();
  squares.splice(squares.indexOf(square), 1); //deleting 1 element in the place i mentioned
  localStorage.setItem("squares", JSON.stringify(squares)); //localStorage.setItem(<itemName>,<itemValue>),
}
