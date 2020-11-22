var anzahlVersuche = 2;

var lesenErlaubt = null;

// überprüft das eingegebene Ergebnis und reagiert mit entsprechendem Text als Rückmeldung für den Spieler
function lesen() {
    if (lesenErlaubt == true) {
        if (document.getElementById("textfeld").value == "87") {
            document.getElementById('tipp').style.display = 'none';
            document.getElementById('accessDenied').style.display = 'none';
            document.getElementById('accessAvailable').style.display = 'block';
            setTimeout(weiter, 2500);
        } else if (document.getElementById("textfeld").value != ""){
            document.getElementById('tipp').style.display = 'block';
            document.getElementById('accessDenied').style.display = 'block';
            document.getElementById('accessAvailable').style.display = 'none';
            if (anzahlVersuche == 1) {
                // schließt das Rätsel Modal Dialog und öffnet das Game Over Modal Dialog 
                document.getElementById("raetselModalDialog").style.visibility = 'hidden';
                document.getElementById("gameOverModalDialog").style.visibility = 'visible';
            }
            anzahlVersuche = anzahlVersuche - 1;

            var text = "Du hast noch ";
            var text2 = text.concat(" ", anzahlVersuche);
            var text3 = text2.concat(" ", "Versuche");
            var versucheControl = document.getElementById('versucheUebrig');
            versucheControl.innerHTML = text3;
        }
        lesenErlaubt = false;
    }
}

function weiter() {
    //SCHLIEßE MATHE MODAL
    document.getElementById("raetselModalDialog").style.visibility = 'hidden';
    //ÜBERGANG ZU HANGMAN
    document.getElementById("gmModalDialog").style.visibility = 'visible';
    findWord();
}

function textAusblenden() {
    lesenErlaubt = true;
    //lässt den Rückmeldetext zum falschen Ergebnis verschwinden, sobald das Ergebnis aus dem input gelöscht wird
    if (document.getElementById("textfeld").value == "") {
        document.getElementById('accessDenied').style.display = 'none';
    }
}
