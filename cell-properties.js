let allCells = document.querySelectorAll(".cell");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".bg-color-prop");
let alignment = document.querySelectorAll(".alignment");
let formulaBar = document.querySelector(".formula-bar");

let leftAlign = alignment[0];
let rightAlign = alignment[2];
let centerAlign = alignment[1];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// Storage
let sheetDB = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            bgColor: "#000000",
            value: "", 
            formula: "",
            children: []
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


// Application of two-way binding
// Attach property listerners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification 
    cellProp.bold = !cellProp.bold; // data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI change(1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change(2)
})

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

bgColor.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecactivecellAndPropell(address);

    cellProp.bgColor = bgColor.value;
    cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor;
    bgColor.value = cellProp.bgColor;
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; // Data change in object
        cell.style.textAlign = alignValue; // UI change (1);

        switch (alignValue) { // Ui change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

for (let i = 0; i < allCells.length; i++) {
    addListernterToAttachCellProperties(allCells[i]);
}

function addListernterToAttachCellProperties(cell) {
    cell.addEventListener("click", (e) => {
        let [rid, cid] = decodeRidCidUsingAddress(addressBar.value);
        let cellProp = sheetDB[rid][cid];

        cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI change(1)
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor;
        cell.style.textAlign = cellProp.alignment; // UI change (1);

        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change(2)
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        bgColor.value = cellProp.bgColor;
        switch (cellProp.alignment) { // Ui change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                break;
        }

        formulaBar.value = cellProp.formula;
        cell.value = cellProp.value;
    })
}
                    
             

function getCellAndCellProp(address) {
    let [rid, cid] = decodeRidCidUsingAddress(address);
    // Active cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRidCidUsingAddress(address) {
    let rid = Number(address.slice(1) - 1);
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid, cid];
}