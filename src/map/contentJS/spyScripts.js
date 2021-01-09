import {dropsAvailable, getMoves} from "./analizers";
import {pickObjects, refreshLoc} from "./Actions";

setTimeout(function () {
    setInterval(function () {
        chrome.runtime.sendMessage(
            {
                action: {
                    type: "UPDATE_PLAYER_POSITION",
                    payload: getMoves()
                }
            },
            function (response) {
                console.log("Send to request to clear the map")
            });
    }, 500);
    startPicker();
}, 2000);

function startPicker() {
    let pickInterval;
    chrome.storage.local.get("pickLoot", function (data) {
        if ("pickLoot" in data && data.pickLoot) {
            pickInterval = setPickingInterval();
        }
        chrome.storage.onChanged.addListener(function (changes, namespace) {
            if ("pickLoot" in changes && changes['pickLoot'].newValue) {
                console.log("Pick loot change detected, starting")
                pickInterval = setPickingInterval();
            } else if ("pickLoot" in changes && !changes['pickLoot'].newValue) {
                console.log("Pick loot change detected, stopping")
                clearInterval(pickInterval);
            }
        });
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