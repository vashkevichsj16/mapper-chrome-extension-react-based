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
        playerPosition: parsePosition(),
        doors: doors,
        moves: moves,
        drops: objectsAvailable()
    }
}

exports.dropsAvailable = function dropsAvailable() {
    return document
        .getElementById('loc')
        .contentWindow.document.getElementById('noCombat')
        .contentWindow.document.querySelectorAll("#picks > table > tbody > tr")
        .length > 0
}

exports.isCombat = function isCombat() {
    return document.getElementById('loc')
        .contentWindow.document
        .getElementById('combatPanelDiv');
}

exports.getFightUnits = function getFightUnits() {
    document.querySelector("#divDrak")
    document.querySelectorAll(".ArmyShow")
    return {
        drakes: getOneTypeUnits("#divDrak"),
        lords: getOneTypeUnits("#divRyc"),
        dames: getOneTypeUnits("#divDam"),
    }
}

function getOneTypeUnits(type) {
    return Array.from(document.getElementById('loc')
        .contentWindow.document.getElementById('your_army')
        .contentWindow.document.querySelector(type)
        .querySelectorAll(".ArmyShow"))
        .map(
            el => ({
                id: el.id,
                src: "https://www.fantasyland.ru/" + el.querySelector("table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div:nth-child(3)")
                    .style.backgroundImage.slice(4, -1).replace(/"/g, "")
            })
        )
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
        case "go2_s" :
            return "red";
        case "go3" :
        case "go3_s" :
            return "green";
        case "go4" :
        case "go4_s" :
            return "blue";
        case "go5" :
        case "go5_s" :
            return "white";
        case "go_n_s" :
        case "go_n" :
        case "go_e" :
        case "go_e_s" :
        case "go_s" :
        case "go_s_s" :
        case "go_w" :
        case "go_w_s" :
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

function objectsAvailable() {
    if (document.getElementById('loc')
        .contentWindow.document.getElementById('noCombat')
        .contentWindow.document.querySelector("#picks")) {
        return Array.from(document.getElementById('loc')
            .contentWindow.document.getElementById('noCombat')
            .contentWindow.document.querySelectorAll("#picks > table > tbody > tr"))
            .map(el => ({
                left: el.cells[0].querySelector("img").src,
                right: el.cells[1].innerText,
            }))
    }
    return [];
}
