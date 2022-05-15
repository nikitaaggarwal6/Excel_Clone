// Strorage
let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
        row.push([]);
    }
    graphComponentMatrix.push(row);
}


function isGraphCyclic(graphComponentMatrix) {
    // Dependency -> visited, DFSvisited (2D array)
    let visited = [];
    let DFSvisited = [];

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

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] === false) {
                // console.log(DFSvisited);
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, DFSvisited);
                if (response === true) return true;
            }
        }
    }

    return false;
}


// Start -> vis(True) dfsVis(True)
// End -> dfsVis(False)
// If vis[i][j] -> already explored path, so go back no use to explore again
// Cycle Detection condition -> if (vis[i][j] == true && dfsVis == true) -> cycle
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, DFSvisited) {
    // Start
    visited[srcr][srcc] = true;
    DFSvisited[srcr][srcc] = true;

    // A1 -> [[0, 1], [1, 0], [5, 10, ....]]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, DFSvisited);
            if (response === true) return true; // Cycle found, return immediately 
        } 
        else if (DFSvisited[nbrr][nbrc] === true) {
            return true;  // Cycle found, return immediately
        }

    }

    DFSvisited[srcr][srcc] = false;
    return false;
}