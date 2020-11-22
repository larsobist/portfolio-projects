var ev;
var versuch = 0;

function aufgabe() {
    //setTimeout(ordnen, 500);
    setTimeout(openTicket, 1500);
}

function check(ev) {
    //Wenn das Problem behoben wurde; schließe Modal Dialog
    //Der richtige Gegenstand wurde ausgewählt
    var element = document.getElementById(ev.target.id);
    if (element == ticket) {
        document.getElementById("ticketModalDialog5").style.visibility = 'hidden';
        startGif();
        setTimeout(angekommen, 1500);
        //openArrow();
    } else { //Der falsche Gegenstand wurde ausgewählt
        alert("Das hat kein sinnvollen Nutzen!"); //Patzhalter-----------------------------
    }
}

function openArrow() {
    document.getElementById("nextLevel").style.display = 'block';
}
  
function openTicket() {
    document.getElementById("ticketModalDialog5").style.visibility = 'visible';
}

function closeModal() {
    document.getElementById("ticketModalDialog5").style.visibility = 'hidden';
    startGif();
    setTimeout(angekommen, 1500)
}

function startGif() {
    document.getElementById("bahnGif").src = "Pic/Bahn/bahn2.gif"
}

function gameOver() {
    if(versuch == 0){
        document.getElementById("schaffner").innerHTML = "Habe ich es nicht eingepackt?";
        versuch++;
    } else{
       document.getElementById("gameOverModalDialog").style.visibility = 'visible'; //Game Over
        document.getElementById("ticketModalDialog5").style.visibility = 'hidden'; //aufgabe verschwindet
    }
}

function angekommen() {
    document.getElementById("bahnGif").style.display = "none";
    document.getElementById("menue").style.display = "none"
    document.getElementById("uni").style.display = 'block';
    document.getElementById('nextLevel').style.display = 'block';
}
