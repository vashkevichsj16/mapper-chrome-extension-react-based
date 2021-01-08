const CELL_SIZE = 28;


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action.type === "CLEAR_THE_MAP") {
            startTheMap(request.action.payload.x, request.action.payload.y);
        }
    })


function createCells(x, y) {
    let cells = []
    for (let i = 0; i < 100; i++) {
        cells.push([]);
        for (let j = 0; j < 100; j++) {
            cells[i].push({
                key: i + 1 + " " + (j + 1),
                x: j + 1,
                y: i + 1,
                borders: {}
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

chrome.storage.local.set(
    {
        playerPosition: {
            x: 10,
            y: 20
        },
    }, function () {
        console.log('Value is set');
    }
);
setInterval(function () {
    const newX = getRandomInt(100);
    const newY = getRandomInt(100);
    console.log("new values a " + newX + " " + newY);
    chrome.storage.local.set(
        {
            playerPosition: {
                x: newX,
                y: newY
            }
        }, function () {
            console.log('Value is set');
        }
    );
}, 5000)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}