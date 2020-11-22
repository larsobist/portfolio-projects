var x = documet.getElementById()
function aufgabe() {
    setTimeout(openModal, 2500);
}
//mit Tischauswahl öffnen

function openModal() {
    document.getElementById("druckerModalDialog5").style.visibility = 'visible';
}

function closeModal() {
    document.getElementById("druckerModalDialog5").style.visibility = 'hidden';
    loadArrow();
}
var element;
function check(ev) {
    var element = document.getElementById(ev.target.id);
    if (element == geld) {
        document.getElementById("druckerModalDialog5").style.visibility = 'hidden';
        openArrow();
    }
}
function openArrow() {
    document.getElementById("nextLevel").style.display = 'block';
}

function gameOver() {
    document.getElementById("gameOverModalDialog").style.visibility = 'visible';
    document.getElementById("druckerModalDialog5").style.visibility = 'hidden';
}

function loadArrow() {
    //arrow erscheinen
    document.getElementById('nextLevel').style.display= 'block';
}
