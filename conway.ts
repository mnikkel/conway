const grid = <HTMLDivElement> document.querySelector("#grid");

const next = <HTMLButtonElement> document.querySelector("#next");

let state: string[] = [];
const width = 20;
const height = 20;

const swap = function(e) {
    if (e.target.textContent == "O") {
        e.target.textContent = "X"
        state[e.target.id] = "X"
        e.target.setAttribute("style", "background-color:red");
    }
    else {
        e.target.textContent = "O"
        state[e.target.id] = "O"
        e.target.setAttribute("style", "background-color:green");
    }
}

function generate(w: number, h: number) : HTMLTableElement {
    const table = document.createElement("table");
    let current = 0;
    for (let i = 0; i < h; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < w; j++) {
            const cell = document.createElement("td");
            cell.id = current.toString();
            current++;
            cell.textContent = Math.random() > 0.5 ? "X" : "O";
            if (cell.textContent == "X") {
                cell.setAttribute("style", "background-color:red");
                state.push("X");
            }
            else {
                cell.setAttribute("style", "background-color:green");
                state.push("O");
            }
            cell.addEventListener('click', swap);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

function adjacent(pos: number) : number[] {
    let adjacent: number[] = [];
    let topEdge = false;
    let leftEdge = false;
    let rightEdge = false;
    let bottomEdge = false;
    if (pos < width) topEdge = true;
    if (pos % width == 0) leftEdge = true;
    if (pos % width == width - 1) rightEdge = true;
    if (pos >= width * (height - 1)) bottomEdge = true;
    if (!topEdge && !leftEdge) adjacent.push(pos - width -1);
    if (!topEdge) adjacent.push(pos - width);
    if (!topEdge && !rightEdge) adjacent.push(pos - width + 1);
    if (!leftEdge) adjacent.push(pos - 1);
    if (!rightEdge) adjacent.push(pos + 1);
    if (!bottomEdge && !leftEdge) adjacent.push(pos + width - 1);
    if (!bottomEdge) adjacent.push(pos + width);
    if (!bottomEdge && !rightEdge) adjacent.push(pos + width + 1);
    return adjacent;
}
function updateState() : string[] {
    const newState: string[] = state.map(isLiving);
    return newState;
}

const isLiving = function(curr: string, pos: number) : string {
    const nextTo: number[] = adjacent(pos);
    const alive: number = nextTo.filter(v => state[v] == "O").length;
    const dead: number = nextTo.filter(v => state[v] == "X").length;
    if (curr == "O") {
        if (alive < 2 || alive > 3) return "X";
        else return "O";
    }
    else if (curr == "X" && alive == 3) return "O";
    else return "X";
}

const nextRound = function() {
    state = updateState();
    const table = document.querySelector('table');
    grid.removeChild(table);
    const newTable = document.createElement("table");
    let current: number = 0;
    for (let i = 0; i < height; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < width; j++) {
            const cell = document.createElement("td");
            cell.textContent = state[current];
            cell.id = current.toString();
            current++;
            if (cell.textContent == "X") {
                cell.setAttribute("style", "background-color:red");
            }
            else {
                cell.setAttribute("style", "background-color:green");
            }
            cell.addEventListener('click', swap);
            row.appendChild(cell);
        }
        newTable.appendChild(row);
    }
    grid.appendChild(newTable);
}

grid.appendChild(generate(width, height));
next.addEventListener('click', nextRound);