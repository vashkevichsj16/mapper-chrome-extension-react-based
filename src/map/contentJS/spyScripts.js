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
                        type: "UPDATE_LAB_STATE",
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
    chrome.runtime.sendMessage(
        {
            action: {
                type: "GET_AUTO_PICK"
            }
        },
        function (response) {
            return true;
        });
}

let pickInterval;
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.action.type) {
            case "RETURN_AUTO_PICK" :
                if (request.action.payload && isLab()) {
                    pickInterval = setPickingInterval();

                } else if (!request.action.payload) {
                    clearInterval(pickInterval);
                }
                break;
            case "CHANGE_AUTO_MOVE" :
                if (request.action.payload && isLab()) {
                    pickInterval = setPickingInterval();

                } else if (!request.action.payload) {
                    clearInterval(pickInterval);
                }
                break;
        }
        return true;
    });

function setPickingInterval() {
    return setInterval(function () {
        if (dropsAvailable()) {
            console.log("Picking loot object - " + pickObjects() + " items");
            refreshLoc();
        }
    }, 900);
}