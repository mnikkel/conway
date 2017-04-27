var grid = document.querySelector("#grid");
var next = document.querySelector("#next");
var state = [];
var width = 20;
var height = 20;
var swap = function (e) {
    if (e.target.textContent == "O") {
        e.target.textContent = "X";
        state[e.target.id] = "X";
        e.target.setAttribute("style", "background-color:red");
    }
    else {
        e.target.textContent = "O";
        state[e.target.id] = "O";
        e.target.setAttribute("style", "background-color:green");
    }
};
function generate(w, h) {
    var table = document.createElement("table");
    var current = 0;
    for (var i = 0; i < h; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < w; j++) {
            var cell = document.createElement("td");
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
function adjacent(pos) {
    var adjacent = [];
    var topEdge = false;
    var leftEdge = false;
    var rightEdge = false;
    var bottomEdge = false;
    if (pos < width)
        topEdge = true;
    if (pos % width == 0)
        leftEdge = true;
    if (pos % width == width - 1)
        rightEdge = true;
    if (pos >= width * (height - 1))
        bottomEdge = true;
    if (!topEdge && !leftEdge)
        adjacent.push(pos - width - 1);
    if (!topEdge)
        adjacent.push(pos - width);
    if (!topEdge && !rightEdge)
        adjacent.push(pos - width + 1);
    if (!leftEdge)
        adjacent.push(pos - 1);
    if (!rightEdge)
        adjacent.push(pos + 1);
    if (!bottomEdge && !leftEdge)
        adjacent.push(pos + width - 1);
    if (!bottomEdge)
        adjacent.push(pos + width);
    if (!bottomEdge && !rightEdge)
        adjacent.push(pos + width + 1);
    return adjacent;
}
function updateState() {
    var newState = state.map(isLiving);
    return newState;
}
var isLiving = function (curr, pos) {
    var nextTo = adjacent(pos);
    var alive = nextTo.filter(function (v) { return state[v] == "O"; }).length;
    var dead = nextTo.filter(function (v) { return state[v] == "X"; }).length;
    if (curr == "O") {
        if (alive < 2 || alive > 3)
            return "X";
        else
            return "O";
    }
    else if (curr == "X" && alive == 3)
        return "O";
    else
        return "X";
};
var nextRound = function () {
    state = updateState();
    var table = document.querySelector('table');
    grid.removeChild(table);
    var newTable = document.createElement("table");
    var current = 0;
    for (var i = 0; i < height; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < width; j++) {
            var cell = document.createElement("td");
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
};
grid.appendChild(generate(width, height));
next.addEventListener('click', nextRound);
