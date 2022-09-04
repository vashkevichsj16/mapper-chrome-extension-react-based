import {getFightUnits} from "../map/contentJS/analizers";

const CELL_SIZE = 26;


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.action.type) {
            case "CLEAR_THE_MAP" :
                startTheMap(request.action.payload.x, request.action.payload.y);
                break;
            case "UPDATE_LAB_STATE" :
                processLabState(request.action.payload);
                break;
            case "UPDATE_PLAYER_FIGHT_UNITS" :
                updateAvailableUnits(request.action.payload);
                break;
            case "GET_AUTO_PICK" :
                getAutoPick();
                break;
        }
        return true;
    })
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if ("pickLoot" in changes) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,
                {
                    action: {
                        type: "RETURN_AUTO_PICK",
                        payload: changes['pickLoot'].newValue
                    }
                },
                function(response) {});
        });
    }
    return true;
});
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
function getAutoPick() {
    chrome.storage.local.get("pickLoot", function (data) {
        if ("pickLoot" in data && data.pickLoot) {
            chrome.runtime.sendMessage(
                {
                    action: {
                        type: "RETURN_AUTO_PICK",
                        payload: data.pickLoot
                    }
                },
                function (response) {
                });
        }
    });
}

/**
 * Object example
 * {
        position: position,
        doors: doors,
        moves: moves
    }
 */
function processLabState(movePayload) {
    chrome.storage.local.get("mapModel", function (data) {
        if (model) {
            let model = model;
            const lvl = model.playerPosition.lvl;
            const borders = {
                top: mapMove(movePayload.doors.top),
                left: mapMove(movePayload.doors.left),
                bottom: mapMove(movePayload.doors.bottom),
                right: mapMove(movePayload.doors.right)
            }
            let cell = model.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 1];
            if (playerHaveMoved()) {
                increaseVisits()
            }
            cell = updateCell(cell, borders, movePayload.moves, movePayload.drops);
            model.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 1] = cell;
            updateBottomCell(movePayload, model);
            updateRightCellCell(movePayload, model);
            updateTopCell(movePayload, model);
            updateLeftCellCell(movePayload, model);
            updateMapModel(model);
        }
    });
}

function updateBottomCell(movePayload, model) {
    if (movePayload.playerPosition.y < model.labSize.y) {
        let bottomCell = model.cells[movePayload.playerPosition.y][movePayload.playerPosition.x - 1];
        updateCell(bottomCell, {top: borders.bottom}, bottomCell.moves);
        model.cells[movePayload.playerPosition.y][movePayload.playerPosition.x - 1] = bottomCell;
    }
}
function updateTopCell(movePayload, model) {
    if (movePayload.playerPosition.y > 1) {
        let topCell = model.cells[movePayload.playerPosition.y - 2][movePayload.playerPosition.x - 1];
        updateCell(topCell, {bottom: borders.top}, topCell.moves);
        model.cells[movePayload.playerPosition.y - 2][movePayload.playerPosition.x - 1] = topCell;
    }
}
function updateRightCellCell(movePayload, model) {
    if (movePayload.playerPosition.x < model.labSize.x) {
        let rightCell = model.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x];
        updateCell(rightCell, {left: borders.right}, rightCell.moves);
        model.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x] = rightCell;
    }
}
function updateLeftCellCell(movePayload, model) {
    if (movePayload.playerPosition.x > 1) {
        let leftCell = model.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 2];
        updateCell(leftCell, {right: borders.left}, leftCell.moves);
        model.cells[movePayload.playerPosition.y - 1][movePayload.playerPosition.x - 2] = leftCell;
    }
}

function playerHaveMoved(currentPosition, lastPosition) {
    return !(currentPosition.x === lastPosition.x 
        && currentPosition.y === lastPosition.y
        && currentPosition.lvl === lastPosition.lvl);
}

function increaseVisits(cell) {
    cell.visited = cell.visited + 1;
}

function updateMapModel(mapModel) {
    chrome.storage.local.set(
        {
            mapModel: mapModel
        },
        function () {
        }
    );
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
                moves: {},
                visited: 0
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