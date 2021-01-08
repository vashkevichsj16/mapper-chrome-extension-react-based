/**
 * Map view starter and map wrapper controller
 */
console.log("Starting content Script")
insertMapApp();

function insertMapApp() {
    // Avoid recursive frame insertion...
    const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
    // eslint-disable-next-line no-restricted-globals
    if (!location.ancestorOrigins.contains(extensionOrigin)) {
        const div = document.createElement('div');
        const iframe = document.createElement('iframe');
        iframe.src = chrome.runtime.getURL('../map/map.html');
        iframe.id = "mapRoot";
        iframe.style.cssText = 'position:relative;display:block;' +
            'width:100%;height:100%;';


        div.style.cssText = 'position:fixed;top:0;right:0;display:block;' +
            'width:600px;height:350px;z-index:1000;';
        div.appendChild(iframe)
        div.id = "mapContainer";
        div.appendChild(createControlDiv())
        document.body.appendChild(div);
        renderDiv();
        document.getElementById("toggleController").addEventListener("click", toggleDiv);
    }
}

function createControlDiv() {
    const div = document.createElement('div');
    div.id = "toggleController";
    div.style.cssText = 'position:absolute;top:0;left:-25px;display:block;' +
        'width:25px;height:25px;z-index:1000;background-color:blue';
    return div;
}

function renderDiv() {
    chrome.storage.local.get("mapContainerOpened", function (data) {
        const elementDiv = document.getElementById("mapContainer");
        if (data && data["mapContainerOpened"]) {
            if (data["mapContainerOpened"] === "opened") {
                elementDiv.style.right = "0";
            } else {
                elementDiv.style.right = "-" + elementDiv.style.width;
            }
        } else {
            elementDiv.style.right = "-" + elementDiv.style.width;
        }
    });
}

function toggleDiv() {
    chrome.storage.local.get("mapContainerOpened", function (data) {
        const elementDiv = document.getElementById("mapContainer");
        if (data && data["mapContainerOpened"]) {
            if (data["mapContainerOpened"] === "hidden") {
                showDiv(elementDiv)
            } else {
                hideDiv(elementDiv)
            }
        } else {
            hideDiv(elementDiv)
        }
    });
}

function hideDiv(elementDiv) {
    elementDiv.style.right = "-" + elementDiv.style.width;
    chrome.storage.local.set(
        {
            mapContainerOpened: "hidden"
        }, function () {
        }
    );
}

function showDiv(elementDiv) {
    elementDiv.style.right = "0";
    chrome.storage.local.set(
        {
            mapContainerOpened: "opened"
        }, function () {

        }
    );
}