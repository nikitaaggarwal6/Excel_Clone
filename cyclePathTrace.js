async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    // Dependency -> visited, DFSvisited (2D array)
    let visited = [];
    let DFSvisited = [];
    let [srcr, srcc] = cycleResponse;

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let DFSvisitedRow = [];
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            DFSvisitedRow.push(false);
        }
        visited.push(visitedRow);
        DFSvisited.push(DFSvisitedRow);
    }

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, DFSvisited);
    if (response) return Promise.resolve(true);
    return Promise.resolve(false);
}


function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}
// Coloring cell for tracking
async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, DFSvisited) {
    // Start
    visited[srcr][srcc] = true;
    DFSvisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);

    cell.style.backgroundColor = "lightblue";
    await colorPromise();

    // A1 -> [[0, 1], [1, 0], [5, 10, ....]]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, DFSvisited);
            if (response === true) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();

                return Promise.resolve(true); // Cycle found, return immediately
            }
        }
        else if (DFSvisited[nbrr][nbrc] === true) {
            let cyclicCell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);

            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();

            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise();

            cell.style.backgroundColor = "transparent";
            await colorPromise();

            return Promise.resolve(true);  // Cycle found, return immediately
        }

    }


    DFSvisited[srcr][srcc] = false;
    return Promise.resolve(false);
}