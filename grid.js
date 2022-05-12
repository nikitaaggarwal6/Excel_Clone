let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellCont = document.querySelector(".cell-cont");
let addressBar = document.querySelector(".address-bar");

let rows = 100;
let cols = 26;

for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol);
}

for (let i = 0; i < cols; i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}

for (let i = 0; i < rows; i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell, i, j);
    }
    cellCont.appendChild(rowCont);
}


function addListenerForAddressBarDisplay(cell, i, j) {
    cell.addEventListener("click", (e) => {
        let rowId = i + 1; 
        let colId = String.fromCharCode(65 + j);
        addressBar.value = `${colId}${rowId}`;
    })
}


// By default click on first cell via DOM
let firstCell = document.querySelector(".cell");
firstCell.click();