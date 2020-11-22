var cols, rows;
var scl = 40 // Quadrat darstellen, 40 ist Höhe und Breite
var grid = []; //ein Array für das Zeichnen
var stack = [];

var current; //Zelle die aktuell besucht wird bei Maze erstellung 
var player; //Spieler der gezeigt wird
var finish; //Ziel 
var after; // Feld nach spieler

var highlightShow = true;

function setup() {
    var meinCanvas = createCanvas(1161, 561); //Erstelle Canvas
    meinCanvas.parent("game"); //Um es in der richtigen Div anzuzeigen
    background(211, 211, 211); //Hintergrundfarbe
    cols = floor(width / scl); //Breite Spalte = Breite Canvas/Breite Quadrat, floor damit man int werte hat
    rows = floor(height / scl);

    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            var cell = new Cell(x, y); //Ich will an der stelle eine neue Zelle
            grid.push(cell); //Mache alle Zellen in das Array
        }
    }
    current = grid[index(2, 4)]; //Wo es startet zu zeichnen
    player = grid[index(0, 7)]; // Wo der spieler ist
    finish = grid[index(28, 7)]; // wo das ziel ist
    draw();

}

function draw() {
    for (var x = 0; x < grid.length; x++) {
        grid[x].show(); //Soll es zeigen
    }
    player.position();
    finish.place();

    current.visited = true; // Platz wird als besucht angezeigt wenn besucht 
    current.highlight(); // Um zu sehen wo er grad läuft, sieht man im Spiel nicht
    var next = current.checkNeighboursrs(); //Sucht sich Nachbarfeld aus

    if (next) { //Wenn Feld nicht undefined ist 
        next.visited = true;
        stack.push(current); //Mach die Zelle in den Stack
        removeLine(current, next); //Mach Linie zwischen Feldern weg
        current = next; //Neues Feld soll next sein
    } else if (stack.length > 0) {
        current = stack.pop(); //Pop wirft Sachen aus Stack wieder raus 
    }

}

function index(x, y) {
    if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
        return -1;
    }
    return x + y * cols;
}

function Cell(x, y) { //Mach eine Zelle 
    this.x = x; // x ist Spalte
    this.y = y; // y ist Zeile
    this.walls = [true, true, true, true]; //Boolean um zu sehen ob da eine Wand ist
    this.visited = false; //Boolean

    this.show = function () {
        var x = this.x * scl;
        var y = this.y * scl;

        stroke(0); //Farbton Linien

        if (this.walls[0]) {
            line(x, y, x + scl, y); //Zeilenlinie Oben
        }
        if (this.walls[1]) {
            line(x + scl, y, x + scl, y + scl); //Spaltenlinie Rechts
        }
        if (this.walls[2]) {
            line(x, y + scl, x + scl, y + scl); //Zeilenlinie Unten
        }
        if (this.walls[3]) {
            line(x, y, x, y + scl); //Spaltenlinie Links
        }

        if (this.visited) {
            noStroke(); // Damit er nicht die Linien zeichnet
            fill(211, 211, 211, 0); //Farbe
            rect(x, y, scl, scl); //Quadrat
        }
    }

    this.checkNeighboursrs = function () { //Prüft ob nachbarn frei sind
        var neighbours = []; //Array 

        var top = grid[index(x, y - 1)];
        var right = grid[index(x + 1, y)];
        var bottom = grid[index(x, y + 1)];
        var left = grid[index(x - 1, y)];

        if (top && !top.visited) { //top && nicht besucht; damit erstmal gecheckt wird dass es im Bereich ist 
            neighbours.push(top);
        }
        if (right && !right.visited) {
            neighbours.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }
        if (left && !left.visited) {
            neighbours.push(left);
        }

        if (neighbours.length > 0) { //Sucht irgendein Nachbarn aus
            var n = floor(random(0, neighbours.length));
            return neighbours[n];
        } else {
            back();
        }
    }

    this.highlight = function () {
        if (highlightShow) {
            var x = this.x * scl;
            var y = this.y * scl;
            noStroke();
            fill(211, 211, 211); //Farbe
            rect(x, y, scl, scl);
        }
    }

    this.place = function () { //Ziel 
        if (document.getElementById("aufgabeModalDialog").style.visibility == 'hidden') { // Erst anzeigt wenn Aufgabe weggeklickt
            var x = this.x * scl;
            var y = this.y * scl;
            noStroke();
            fill(51, 51, 51); //Farbe
            rect(x + 4, y + 4, scl - 8, scl - 8);
        }
    }

    this.position = function () { //Spieler 
        if (document.getElementById("aufgabeModalDialog").style.visibility == 'hidden') {
            var x = this.x * scl;
            var y = this.y * scl;
            noStroke();
            fill(105, 105, 105); //Farbe
            ellipse(x + 20, y + 20, scl - 10, scl - 10); //Kreis
        }
    }
    this.new = function () { //Feld nach spieler, damit das Feld wieder grau wird    
        var x = this.x * scl;
        var y = this.y * scl;
        noStroke();
        fill(211, 211, 211); //Farbe
        rect(x + 4, y + 4, scl - 8, scl - 8);
    }
}

function removeLine(a, b) { //Macht die Linie weg
    var x = a.x - b.x;
    if (x == 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x == -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.y - b.y;
    if (y == 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y == -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

back = function () {
    if (!allChecked()) {
        return undefined;
        current = stack[stack.length - 1];
    } else {
        highlightShow = false; //Wenn alle geckecked, dann Feld nicht mehr Anzeigen (Highlight)
    }
}

allChecked = function () {
    var finished = true;
    for (var i = 0; i < grid.length - 1; i++) {
        if (!grid[i].visited) {
            finished = false;
            document.getElementById("zurueckButton").innerHTML = "Lädt..."; 
        }
    }
    if (finished) {
        highlightShow = false;
        document.getElementById("zurueckButton").innerHTML = "Los geht's!"; //Wenn fertig = Inhalt Button verändern
        losGehtEs = true;
    }
}

var losGehtEs = false;

function starte() { //start Timer
    if (losGehtEs == true) {
        if (document.getElementById("aufgabeModalDialog").style.visibility = 'hidden') {
            bar(); //Starte Zeit
        }
    }
}


var lastKeyCode = 0;
function handleKeyboardEvent(event) {

    var keyCode = event.keyCode;
    if (keyCode == lastKeyCode) {
        keyCode = 0;
    }

    lastKeyCode = keyCode;

    switch (keyCode) {
        case 65: //A
        case 37: //Pfeiltaste Links
            if (!player.walls[3] && seconds !== 0 && document.getElementById("aufgabeModalDialog").style.visibility == 'hidden') {
                player = grid[index(player.x - 1, player.y)]; //Ein Feld nach Links
                after = grid[index(player.x + 1, player.y)]; //Feld von vorher wieder "grau" machen
            }
            break;
        case 87: //W
        case 38: //Oben
            if (!player.walls[0] && seconds !== 0 && document.getElementById("aufgabeModalDialog").style.visibility == 'hidden') {
                player = grid[index(player.x, player.y - 1)];
                after = grid[index(player.x, player.y + 1)]; 
            }
            break;
        case 68: //D
        case 39: //rechts
            if (!player.walls[1] && seconds !== 0 && document.getElementById("aufgabeModalDialog").style.visibility == 'hidden') {
                player = grid[index(player.x + 1, player.y)];
                after = grid[index(player.x - 1, player.y)];
            }
            break;
        case 83: //S
        case 40: //unten
            if (!player.walls[2] && seconds !== 0 && document.getElementById("aufgabeModalDialog").style.visibility == 'hidden') {
                player = grid[index(player.x, player.y + 1)];
                after = grid[index(player.x, player.y - 1)];
            }
            break;
    }
    after.new(); //Macht das Feld nach dem Spieler wieder unsichtbar

    if (player == finish) {
        document.location.href = "ende.html"; //Leite weiter wenn er im Ziel ist
    }
}
document.addEventListener("keydown", handleKeyboardEvent);

var seconds = 61;
var CountdownBar = document.getElementById("CountdownBar");
var gesamtzeit = seconds * 1000; //Millisekunden
var pxInSec = Math.floor(CountdownBar.clientWidth / seconds + 0.5);

function bar() {
    var TimeLeft = document.getElementById("TimeLeft");
    var interval = gesamtzeit / CountdownBar.clientWidth;
    var startTimer = setInterval(barCount, interval) // Millisekunden 
}

var pxZaehler = 0;

function barCount() {
    if (seconds > 0) {
        if (TimeLeft.clientWidth <= CountdownBar.clientWidth) {
            TimeLeft.style.width = TimeLeft.clientWidth + 1 + "px";
        }
        pxZaehler = pxZaehler + 1;
        if (pxZaehler >= pxInSec) {
            pxZaehler = 0;
            seconds = seconds - 1; // eine sekunde weniger alle 1000 millisek
            var countDiv = document.getElementById('countdown');
            countDiv.innerHTML = toMMSS(seconds);
        }
    } else {
        clearInterval(startTimer);
    }
    if (seconds == 0) {
        document.getElementById("gameOverModalDialog").style.visibility = 'visible'; //Game Over
    }
}

function toMMSS(seconds) {
    var m, s, result = '';
    //Minuten
    m = Math.floor(seconds / 60);
    seconds -= m * 60;
    result += m < 10 ? '0' + m + ':' : m + ':';
    //Sekunden
    s = seconds % 60;
    result += s < 10 ? '0' + s : s;
    return result;
}
