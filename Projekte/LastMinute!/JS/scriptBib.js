var ev;

function aufgabePopUp() {
    document.getElementById("aufgabeModalDialog").style.visibility = 'hidden';
}

var versuch = 0;
var element;
var modal;

//Tischauswahl
function switchL() {
    document.getElementById("background").src = "Pic/bibhoverl.jpg";
}
function switchR() {
    document.getElementById("background").src = "Pic/bibhoverr.jpg";
}

//Linke oder rechte Aufgabe wird geöffnet
function openModalL() {
    document.getElementById("tischLModalDialog4").style.visibility = 'visible';
    //Auswähl-Funktion entfernen
    document.getElementById("tischL").style.display = "none";
    document.getElementById("tischR").style.display = "none";
    modal = "left";
}
function openModalR() {
    document.getElementById("tischRModalDialog5").style.visibility = 'visible';
    //Auswähl-Funktion entfernen
    document.getElementById("tischL").style.display = "none";
    document.getElementById("tischR").style.display = "none";
    modal = "right";
}

//pruefe ausgewaehlten Inventargegenstand
function check(ev) {
    //Wenn das Problem behoben wurde; schließe Modal Dialog
    var element = document.getElementById(ev.target.id);
    if (modal == "left") { //Der richtige Gegenstand wurde ausgewählt
        if (element == tuch) {
            document.getElementById("tischLModalDialog4").style.visibility = 'hidden';
            zuHangman();
        } 
    } else if (modal == "right") {
        if (element == kabel) {
            document.getElementById("tischRModalDialog5").style.visibility = 'hidden';
            zuHangman();
        } 
    } 
}

function zuHangman() {
    //Übergang zu Hangman
    document.getElementById("gmModalDialog").style.visibility = 'visible';
    findWord();
}

function gameOverL() {
    if (versuch == 0) {
        document.getElementById("mainTextL").innerHTML = "Habe ich es nicht eingepackt?";
        versuch++;
    } else {
        document.getElementById("tischLModalDialog4").style.visibility = 'hidden';
        document.getElementById("gameOverModalDialog").style.visibility = 'visible';
    }
}

function gameOverR() {
    if (versuch == 0) {
        document.getElementById("mainTextR").innerHTML = "Habe ich es nicht eingepackt?";
        document.getElementById("buttonR").innerHTML = "Einen Sitznachbar um Hilfe fragen";
        versuch++;
    } else {
        document.getElementById("tischRModalDialog5").style.visibility = 'hidden';
        modal = null;
        //Übergang zum Rätsel Pop up 
        openRaetselModal();
    }
}

function openRaetselModal() {
    document.getElementById("raetselModalDialog").style.visibility = 'visible';
}
