
const CELL_SIZE = 26;


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.action.type) {
            case "CLEAR_THE_MAP" :
                startTheMap(request.action.payload.x, request.action.payload.y);
                break;
            case "UPDATE_PLAYER_POSITION" :
                processPlayerMove(request.action.payload);
                break;
            case "UPDATE_PLAYER_FIGHT_UNITS" :
                updateAvailableUnits(request.action.payload);
                break;
        }

    })

function updateSelectedUnits(units) {
    chrome.storage.local.set(
        {
            selectedUnits: units,
        }, function () {
            console.log('Updated selected Units');
        }
    );
}

function updateAvailableUnits(units) {
    chrome.storage.local.set(
        {
            availableUnits: units,
        }, function () {
            console.log('Updated Available Units');
        }
    );
}

/**
 * Object example
 * {
        position: position,
        doors: doors,
        moves: moves
    }
 */
function processPlayerMove(movePayload) {
    chrome.storage.local.get("mapModel", function (data) {
        if (data.mapModel) {
            const borders = {
                top: mapMove(movePayload.doors.top),
                left: mapMove(movePayload.doors.left),
                bottom: mapMove(movePayload.doors.bottom),
                right: mapMove(movePayload.doors.right)
            }
            console.log(movePayload.drops);
            let cell = data.mapModel.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 1];
            cell = updateCell(cell, borders, movePayload.moves, movePayload.drops);
            data.mapModel.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 1] = cell;
            console.log(data.mapModel.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 1]);

            if (movePayload.playerPosition.y < data.mapModel.labSize.y) {
                let bottomCell = data.mapModel.cells[movePayload.playerPosition.y][movePayload.playerPosition.x - 1];
                updateCell(bottomCell, {top: borders.bottom}, bottomCell.moves);
                data.mapModel.cells[movePayload.playerPosition.y][movePayload.playerPosition.x - 1] = bottomCell;
            }
            if (movePayload.playerPosition.x < data.mapModel.labSize.x) {
                let rightCell = data.mapModel.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x];
                updateCell(rightCell, {left: borders.right}, rightCell.moves);
                data.mapModel.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x] = rightCell;
            }
            if (movePayload.playerPosition.y > 1) {
                let topCell = data.mapModel.cells[movePayload.playerPosition.y - 2][movePayload.playerPosition.x - 1];
                updateCell(topCell, {bottom: borders.top}, topCell.moves);
                data.mapModel.cells[movePayload.playerPosition.y - 2][movePayload.playerPosition.x - 1] = topCell;
            }
            if (movePayload.playerPosition.x > 1) {
                let leftCell = data.mapModel.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 2];
                updateCell(leftCell, {right: borders.left}, leftCell.moves);
                data.mapModel.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 2] = leftCell;
            }
            chrome.storage.local.set(
                {
                    mapModel: data.mapModel,
                    playerPosition: movePayload.playerPosition
                }, function () {
                    console.log('Updating Map');
                }
            );
        }
    });
}

function updateCell(cell, borders, moves, drops = cell.drops) {
    cell.borders = {
        top: "top" in borders ? borders.top  : cell.borders.top,
        left: "left" in borders ? borders.left  : cell.borders.left,
        bottom: "bottom" in borders ? borders.bottom  : cell.borders.bottom,
        right: "right" in borders ? borders.right  : cell.borders.right,
    };
    cell.moves = moves;
    cell.drops = drops;
    return cell;
}

function mapMove(move) {
    switch (move) {
        case "blocked" :
            return "black";
        case "red" :
            return "red";
        case "green" :
            return "green";
        case "blue" :
            return "blue";
        case "white" :
            return "white";
        case "normal" :
        default :
            return "gray";
    }
}

function createCells(x, y) {
    let cells = []
    for (let i = 0; i < x; i++) {
        cells.push([]);
        for (let j = 0; j < y; j++) {
            cells[i].push({
                key: i + 1 + " " + (j + 1),
                x: j + 1,
                y: i + 1,
                borders: {},
                moves: {}
            });
        }
    }
    return cells;
}

function startTheMap(x, y) {
    chrome.storage.local.set(
        {
            mapModel: {
                cells: createCells(x, y),
                cellSize: CELL_SIZE,
                labSize: {
                    x: x,
                    y: y
                }
            }
        }, function () {
            console.log('Restarting Map');
        }
    );
}


// setInterval(function () {
//     const newX = getRandomInt(100);
//     const newY = getRandomInt(100);
//     console.log("new values a " + newX + " " + newY);
//     chrome.storage.local.set(
//         {
//             playerPosition: {
//                 x: newX,
//                 y: newY
//             }
//         }, function () {
//             console.log('Value is set');
//         }
//     );
// }, 5000)
//
// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }