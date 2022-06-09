let tiles = [];
let freeCell = {y:3, x:3};
let shuffled = false;
freeCell.x=3;
freeCell.y=3;
function createCellNull() {
    let cell = document.createElement("div");
    cell.classList.add("field__cell", "field__cell--null");
    return cell;
}
function setCellOffset(cell) { 
cell.style.left = ( 15 + (15 + 81.25) * cell.x) + "px";
    cell.style.top = (15+(15 + 81.25) * cell.y) + "px";
    
}
function appendCell(cell) {
    let field = document.getElementById("field");
    field.appendChild(cell);
    
}
function createField() {   
    for(let y = 0; y < 4; ++y) {
        for(let x = 0; x < 4; ++x) {
            let cell = createCellNull();
            cell.y = y;
            cell.x = x;
            setCellOffset(cell);
            appendCell(cell);
        }
    }
}
createField();
function createCellTile() {
    let cell = document.createElement("div");
    cell.classList.add("field__cell", "field__cell--tile");
    return cell;
}
function createTiles() {
    let x, y, cell, n;
    for(y = 0; y < 4; ++y) {
    for(x = 0; x < 4; ++x) {
        n = y * 4 + x + 1;
        if (n < 16) {
       cell = createCellTile();
       cell.y = y;
       cell.x = x;
            cell.innerHTML = n;
            setCellOffset(cell);
            appendCell(cell);
            tiles.push(cell);
    }
    }
    }
}
createTiles();
function between (a, b, t) {
    return ((a<=t && t<=b) || (b<=t && t<=a));
}
function checkVictory() {
    let i, n;
    for (i = 0; i < tiles.length; ++i) {
        n = tiles[i].y * 4 + tiles[i].x + 1;
        if (tiles[i].innerHTML !=n) return;
//Исправлено. Квадратная скобка стояла после нижней строки//
}
    document.getElementById("modal").classList.add("modal--visible");

}
function tileClick(event) {
    let bar = event.target, i, tile;
    let oldX = bar.x, oldY = bar.y;
    if(bar.y == freeCell.y){
        for (i = 0; i < tiles.length; ++i) {
            tile = tiles[i];
            if (tile.y == bar.y && between(bar.x, freeCell.x, tile.x)){
                if(bar.x < freeCell.x) tile.x += 1;
                else tile.x -= 1;
                setCellOffset(tile);
                
            }
        }
        freeCell = {y: oldY, x: oldX};
    }
    else if (bar.x == freeCell.x) {
         for (i = 0; i < tiles.length; ++i) {
            tile = tiles[i];
            if (tile.x == bar.x && between(bar.y, freeCell.y, tile.y)){
                if(bar.y < freeCell.y) tile.y += 1;
                else tile.y -= 1;
                setCellOffset(tile);
                
            }
        }
    freeCell = {y: oldY, x: oldX};} 
if (shuffled) {checkVictory();}}
function animateTiles() {
    let i;
    for(i = 0; i < tiles.length; ++i) {
        tiles[i].addEventListener("click", tileClick);
    }
}
function shuffleTiles() {
    let i, index;
    for (i = 0; i < 1000; ++i) {
        index = Math.floor(Math.random() * tiles.length);
        tiles[index].click();
    }
    shuffled = true;
}
animateTiles();
shuffleTiles();


