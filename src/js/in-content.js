/* in-content.js
*
* This file has an example on how to communicate with other parts of the extension through a long lived connection (port) and also through short lived connections (chrome.runtime.sendMessage).
*
* Note that in this scenario the port is open from the popup, but other extensions may open it from the background page or not even have either background.js or popup.js.
* */
console.log("Starting content Script")
insertMapApp();

// // Extension port to communicate with the popup, also helps detecting when it closes
// let port = null;
//
// // Send messages to the open port (Popup)
// const sendPortMessage = data => port.postMessage(data);
//
// // Handle incoming popup messages
// const popupMessageHandler = message => console.log('in-content.js - message from popup:', message);
//
// // Start scripts after setting up the connection to popup
// chrome.extension.onConnect.addListener(popupPort => {
//     // Listen for popup messages
//     popupPort.onMessage.addListener(popupMessageHandler);
//     // Set listener for disconnection (aka. popup closed)
//     popupPort.onDisconnect.addListener(() => {
//         console.log('in-content.js - disconnected from popup');
//     });
//     // Make popup port accessible to other methods
//     port = popupPort;
//     // Perform any logic or set listeners
//     sendPortMessage('message from in-content.js');
// });
//
// // Response handler for short lived messages
// const handleBackgroundResponse = response =>
//     console.log('in-content.js - Received response:', response);
//
// // Send a message to background.js
// chrome.runtime.sendMessage('Message from in-content.js!', handleBackgroundResponse);

function insertMapApp() {
    // Avoid recursive frame insertion...
    const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
    // eslint-disable-next-line no-restricted-globals
    if (!location.ancestorOrigins.contains(extensionOrigin)) {
        const iframe = document.createElement('iframe');
        // Must be declared at web_accessible_resources in manifest.json
        // eslint-disable-next-line no-undef
        iframe.src = chrome.runtime.getURL('../map/map.html');
        // Some styles for a fancy sidebar
        iframe.style.cssText = 'position:fixed;top:0;right:0;display:block;' +
            'width:600px;height:350px;z-index:1000;';
        iframe.id = "popUpRoot"
        document.body.appendChild(iframe);
    }
}
