import {getMoves} from "./analizers";

setTimeout(function () {
    setInterval(function () {
        chrome.runtime.sendMessage(
            {
                action: {
                    type: "UPDATE_PLAYER_POSITION",
                    payload: getMoves()
                }},
            function (response) {
                console.log("Send to request to clear the map")
            });
    }, 500);
}, 2000);