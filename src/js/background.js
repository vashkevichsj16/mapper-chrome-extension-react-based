
chrome.storage.local.set(
    {
        playerPosition: {
            x: 10,
            y: 20
        }
    }, function () {
        console.log('Value is set');
    }
);
setInterval( function (){
    const newX = getRandomInt(100);
    const newY = getRandomInt(100);
    console.log("new values a " + newX + " " + newY );
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