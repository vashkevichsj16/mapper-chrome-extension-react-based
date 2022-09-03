import {dropsAvailable, getFightUnits, getMoves, isCombat, isLab} from "./analizers";
import {pickObjects, refreshLoc} from "./Actions";

setTimeout(function () {

    if (isCombat()) {
        chrome.runtime.sendMessage(
            {
                action: {
                    type: "UPDATE_PLAYER_FIGHT_UNITS",
                    payload: getFightUnits()
                }
            },
            function (response) {
                return true;
            });
    } else if (isLab()) {
        setInterval(function () {
            chrome.runtime.sendMessage(
                {
                    action: {
                        type: "UPDATE_PLAYER_POSITION",
                        payload: getMoves()
                    }
                },
                function (response) {
                    return true;
                });
        }, 500);
        startPicker();
    } else {
        // Actions out of the combat
    }
}, 2000);

function startPicker() {
    let pickInterval;
    chrome.runtime.sendMessage(
        {
            action: {
                type: "GET_AUTO_PICK"
            }
        },
        function (response) {
            return true;
        });
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            switch (request.action.type) {
                case "RETURN_AUTO_PICK" :
                    if (request.action.payload) {
                        pickInterval = setPickingInterval();

                    } else if (!request.action.payload) {
                        clearInterval(pickInterval);
                    }
                    break;
            }
            return true;
        });
}

function setPickingInterval() {
    return setInterval(function () {
        if (dropsAvailable()) {
            console.log("Picking loot object - " + pickObjects() + " items");
            refreshLoc();
        }
    }, 900);
}