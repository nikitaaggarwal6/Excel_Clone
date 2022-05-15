allCells.forEach(cell => {
    cell.addEventListener("blur", (e) => {
        let address = addressBar.value;
        let [activeCell, cellProp] = getCellAndCellProp(address);
        let enteredData = activeCell.innerText;

        if (enteredData === cellProp.value) return;

        cellProp.value = enteredData;

        // If data modifies remove P-C relation, formula empty, update children with modified value
        removeChildFromParent(cellProp.formula);
        cellProp.formula = "";
        updateChildrenCells(address);
    })
})


formulaBar.addEventListener("keydown", (e) => {
    let inputFormula = formulaBar.value;
    if (e.key === "Enter" && inputFormula) {

        // If change in formula, break old P-C relation
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);
        if (inputFormula !== cellProp.formula) {
            removeChildFromParent(cellProp.formula);
        }

        let evaluatedValue = evaluateFormula(inputFormula);


        addChildToGraphComponent(inputFormula,  address);
        // Check formula is cyclic or not, then only evaluate
        // True -> cycle, False -> not cyclic
        let isCyclic = isGraphCyclic(graphComponentMatrix);
        if (isCyclic === true) {
            alert("Your formula forms cycle!");
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }

        setCellUIAndCellProp(evaluatedValue, inputFormula, address);   // To update UI, DB
        addChildToParent(inputFormula);   /// To add child (current) cell address to parents cell's children array
        updateChildrenCells(address);
        // console.log(cellProp.children);
    }
})


function removeChildFromGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRidCidUsingAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRidCidUsingAddress(encodedFormula[i]);
            // B1: A1 + 10
            // rid -> i, cid -> j
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}


function addChildToGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRidCidUsingAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRidCidUsingAddress(encodedFormula[i]);
            // B1: A1 + 10
            // rid -> i, cid -> j
            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}


function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        let [childCell, childCellProp] = getCellAndCellProp(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    encodedFormula.forEach((val, i) => {
        let asciiValue = val.charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(val);
            parentCellProp.children.push(childAddress);
        }
    })
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    encodedFormula.forEach((val, i) => {
        let asciiValue = val.charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(val);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    })
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    encodedFormula.forEach((val, i) => {
        let asciiValue = val.charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellProp] = getCellAndCellProp(val);
            encodedFormula[i] = cellProp.value;
        }
    })
    console.log(encodedFormula)
    let decodeFormula = encodedFormula.join(" ");
    return eval(decodeFormula);
}


function setCellUIAndCellProp(evaluatedValue, formula, address) {
    let [cell, cellProp] = getCellAndCellProp(address);

    cell.innerText = evaluatedValue;  // UI update

    cellProp.value = evaluatedValue;  // DB update
    cellProp.formula = formula;
}