var element;
var versuch = 0;

//zeigen der Aufgabe nach Ende des Gif
function aufgabe() {
    setTimeout(openAufgabe, 2000);
}

function openAufgabe() {
    document.getElementById("aufgabeModalDialog").style.visibility = 'visible';
}

//pruefe den angeclickten Gegenstand
function check(ev) {
    var element = document.getElementById(ev.target.id);
    if(element == laptop){
        document.getElementById("aufgabeModalDialog").style.visibility = 'hidden';
        window.location.href = "Bib.html";
    }
}

function falscheEingabe(){ //der Spieler weiß nicht was er tun soll oder hat nicht den richtigen gegenstand mitgenommen 
    switch(versuch){
        case 0: document.getElementById("aufgabenText").innerHTML = "Habe ich den Laptop heute morgen nicht in meine Tasche eingepackt?";
            versuch++;
            break;
        case 1: window.location.href = "home.html";
    }
}