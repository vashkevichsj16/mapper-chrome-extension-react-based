

exports.pickObjects = function pickObjects() {
    let counter = 0;
    console.log("Some drop available");
    document.getElementById('loc')
        .contentWindow.document.getElementById('noCombat')
        .contentWindow.document.querySelectorAll("#picks > table > tbody > tr")
        .forEach(function (item) {
            item.querySelector("td:nth-child(1) > img").click();
            counter++;
        })
    return counter;
}

exports.refreshLoc = function refreshLoc() {
    document.getElementById('loc')
        .contentWindow.document.getElementById('noCombat')
        .contentWindow.document.querySelector("#d4").click();
}