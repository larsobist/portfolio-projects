var letter;
var rateWort;
var extra = 0;
var zaehler;
var correct = 0;
var wrong = 0;
var wort = [
    "VERGISSMEINNICHT", "FAUPAX", "PHOTOSYNTHESE", "GYMNASTIK", "ACRYLFARBE", "XYLOPHON", "RECYCLING", "ATMOSPHAEHRE", "POLYNOMDIVISION", "NICHTSDESTOTROTZ"
];

var alphabet = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]


//--------start functions---------------

function findWord() {
    if (rateWort == undefined) { //da findWord vorher manchmal zweimal aufgerufen wurde
        //zufälligen Satz aus wort[] auswählen
        rateWort = wort[Math.floor(Math.random() * wort.length)];
        vorbereitung(rateWort);
    }
}

function vorbereitung(rateWort) {
    //rateWort mit underlines ersetzten
    for (var i = 0; i < rateWort.length; i++) {
        //alles was keine Buchstaben sind zeigen
        if (rateWort[i] == " ") {
            document.getElementById('letter' + i).innerHTML = "&nbsp &nbsp &nbsp";
            extra++; //elemente des array, welche nicht eraten werden müssen
        } else if (rateWort[i] == "-") {
            document.getElementById('letter' + i).innerHTML = rateWort[i];
            extra++;
        } else {
            //hide rateWort[i];
            document.getElementById('letter' + i).innerHTML = "__";
        }
    }
}


//click entgegennehmen und prüfen ob es in rateWort ist
function pruefen(letter) {
    zaehler = 0;
    //zeige, dass letter unbrauchbar ist
    document.getElementById(letter).style.backgroundColor = 'dimgray';
    //lösche onclick
    document.getElementById(letter).onclick = null;

    //pruefe Buchstabe
    for (var j = 0; j < rateWort.length; j++) {
        if (rateWort[j] == letter) {
            zaehler++;
            correct++;
            //richtig geraten
            document.getElementById('letter' + j).innerHTML = rateWort[j];
        }
    }

    //falsch geraten    
    if (zaehler == 0) {
        wrong++;
        var versuch = 7 - wrong;
        if (wrong == 7) {
            document.getElementById("versuche").innerHTML = "Game Over!";
        } else if (wrong != 6) {
            document.getElementById("versuche").innerHTML = "Du hast noch " + versuch + " Versuche.";
        } else {
            document.getElementById("versuche").innerHTML = "Pass auf, das ist dein letzter Versuch!";
        }
        drawHangMan(wrong);
    }

    //Gelöst
    if (correct == rateWort.length - extra) {
        document.getElementById("aufgabe").innerHTML = "Super du hast es geschafft!"
        document.getElementById('nextLevel').style.display = 'block';
        //entferne oncklick von allen alphabet-Buttons
        for (var n = 0; n < alphabet.length; n++) {
            document.getElementById(alphabet[n]).onclick = null;
            document.getElementById(alphabet[n]).style.backgroundColor = 'dimgray';
        }
    }

}

function drawHangMan(wrong) {
    //Hangman zeichnen

    switch (wrong) {
        case 1:
            //draw bodenteil
            document.getElementById('GM1').style.visibility = "visible";
            break;
        case 2:
            //draw längstes vertikalteil
            document.getElementById('GM2').style.visibility = "visible";
            document.getElementById('GM1').style.visibility = "hidden";
            break;
        case 3:
            //draw längstes horizontalteil + stütze
            document.getElementById('GM3').style.visibility = "visible";
            document.getElementById('GM2').style.visibility = "hidden";
            break;
        case 4:
            //draw Seil + Kopf
            document.getElementById('GM4').style.visibility = "visible";
            document.getElementById('GM3').style.visibility = "hidden";
            break;
        case 5:
            //draw Körper
            document.getElementById('GM5').style.visibility = "visible";
            document.getElementById('GM4').style.visibility = "hidden";
            break;
        case 6:
            //draw Beine
            document.getElementById('GM6').style.visibility = "visible";
            document.getElementById('GM5').style.visibility = "hidden";
            break;
        case 7:
            //draw Arme + Augen
            document.getElementById('GM7').style.visibility = "visible";
            document.getElementById('GM6').style.visibility = "hidden";
            gameOver();
            break;
    }

    function gameOver() {
        //Verlohren
        if (wrong == 7) {
            setTimeout(over, 1500); //damit man Arme + Augen auch sieht
            //Dann muss automatisch weitergeleitet werden

        }
    }

    function over() {
        document.getElementById('GM7').style.visibility = 'hidden';
        document.getElementById("gmModalDialog").style.visibility = 'hidden';
        document.getElementById("gameOverModalDialog").style.visibility = 'visible';
    }
}
