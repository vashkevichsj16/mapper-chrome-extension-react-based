exports.isLab = function isLab() {
    return document.getElementById('loc')
            .contentWindow.document.getElementById('noCombat') &&
        document.getElementById('loc')
            .contentWindow.document.getElementById('noCombat')
            .contentWindow.document.querySelector("#hru");
}

exports.isCombat = function isCombat() {
    return document.getElementById('loc').contentWindow.document.getElementById('combatPanelDiv');
}

exports.getMoves = function getMoves() {
    const position = parsePosition();
    const movementDocument = document.getElementById('loc')
        .contentWindow.document.getElementById('noCombat')
        .contentWindow.document;

    const doors = {
        top: getMappedDoor(movementDocument, "#d1"),
        left: getMappedDoor(movementDocument, "#d3"),
        bottom: getMappedDoor(movementDocument, "#d7"),
        right: getMappedDoor(movementDocument, "#d5"),
    }
    const moves = {
        top: isPossibleMove(movementDocument, "#d1"),
        left: isPossibleMove(movementDocument, "#d3"),
        bottom: isPossibleMove(movementDocument, "#d7"),
        right: isPossibleMove(movementDocument, "#d5"),
    }
    return {
        position: position,
        doors: doors,
        moves: moves
    }
}

function isPossibleMove(movementElement, positionElementId) {
    return !movementElement
        .querySelector(positionElementId + " > img")
        .getAttribute("src").includes("go_default");
}

function getMappedDoor(movementElement, positionElementId) {
    const splittedPath = movementElement
        .querySelector(positionElementId + " > img")
        .getAttribute("src")
        // example of source ../images/miscellaneous/go_default.gif
        .split("/");
    const imageName = splittedPath[splittedPath.length - 1].replace(".gif", "");
    return mapDoor(imageName);
}

function mapDoor(moveImage) {
    switch (moveImage) {
        case "go_default" :
            return "blocked";
        case "go2" :
            return "red";
        case "go3" :
            return "green";
        case "go4" :
            return "blue";
        case "go5" :
            return "white";
        case "go_n" :
        case "go_e" :
        case "go_s" :
        case "go_w" :
            return "normal";
        default :
            return "blocked";
    }
}

function parsePosition() {
    const positionContent = document.getElementById('loc')
        .contentWindow.document.getElementById('noCombat')
        .contentWindow.document.querySelector("#title > b").textContent;
    const splitArray = positionContent.split(' ');
    return {
        lvl: parseInt(splitArray[0].replace(/^\D+/g, '')),
        x: parseInt(splitArray[1].replace(/^\D+/g, '')),
        y: parseInt(splitArray[2].replace(/^\D+/g, '')),
    }
}