var inventar = {};

function addItem(key, value, itemsclass) { //Home: ein Gegenstand wird im Inventar hinzugefuegt
    for (keyx in inventar) {
        if (inventar[keyx] == value) { //Wenn item schonmal im Inventar vorhanden ist
            delete inventar[keyx];
        }
    }
    inventar[key] = value;
    console.log(key);
    window.sessionStorage.setItem("data", JSON.stringify(inventar));//konvertieren des strings zum Objekt
    if (value == "drag14" ) { //Schlüssel werden gedropt
        if (itemsclass == "items"){ //wenn in inventar werden die angezeigt 
            document.getElementById("arrow").style.visibility = 'visible';
        }
        else { //ohne schlüssel kann man das lvl nicht verlasssen
            document.getElementById("arrow").style.visibility = 'hidden';
        }
    }
}

function loadInventar() { 
    inventar = JSON.parse(window.sessionStorage.getItem("data"));//Inventar wiederherstellen
    for (key in inventar) { //
        console.log(key + " - " + inventar[key]); //anzeige in der konsole
        
    var image = inventar[key];
    switch(image) { //gemalte Bilder mit Icons ersetzten
        case "drag1": //buch    
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag1.png" id="buch" class="images" title="Buch" onclick="check(event)" style="width: 100%; height:auto;">';
            break;
        case "drag2": //buch  
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag2.png" title="Buch" id="buch" class="images" onclick="check(event)" style="width: 100%; height:auto;">';
            break;
        case "drag4": //flasche    
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag4.png" id="flasche" title="Flasche" class="images" onclick="check(event)">';
            break;
        case "drag5": //laptop    
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag5.png" id="laptop" title="Laptop" class="images" onclick="check(event)">';
            break;    
        case "drag7": //musikbox    
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag7.png" id="musik" class="images" title="Musikbox" onclick="check(event)" >';
            break;    
        case "drag8":  //taschentücher   
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag8.png" id="tuch" title="Taschentuch" class="images" onclick="check(event)">';
            break;    
        case "drag9":  //Aufladekabel   
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag9.png" title="Kabel" id="kabel" class="images" onclick="check(event)">';
            break;    
        case "drag10":  //semesterticket   
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag10.png" id="ticket" title="Ticket" class="images" style="width: 100%; height:auto;" onclick="check(event)">';
            break;    
        case "drag11": //geld    
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag11.png" id="geld" class="images" title="Geld" onclick="check(event)">';
            break;    
        case "drag12":  //handy   
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag12.png" id="handy" class="images" title="iPhone" onclick="check(event)">';
            break;    
        case "drag13":  //teddy   
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag13.png" id="teddy" class="images" title="Teddy" onclick="check(event)">';
            break;    
        case "drag14":  //schluessel   
            document.getElementById(key).innerHTML = '<img src="pic/Icons/drag14.png" id="key" class="images" title="Schlüssel" style="width: 100%; height:auto;" onclick="check(event)">';
            break;    
           }
    }
}


function inventarReset() { //Inventar löschen
    window.sessionStorage.clear();
}

function drop(ev) { //ein Gegenstand wird losgelassen
    ev.preventDefault(); //standarteinstellung ausschalten
    
    var data = ev.dataTransfer.getData("img");
    ev.target.style.border = "0px dashed transparent";
    if (ev.target=="[object HTMLImageElement]"){ //nur ein objekt in jeden kasten
           ev.target = ev.target.parentNode;
        }
    else { 
        ev.target.appendChild(document.getElementById(data));
        addItem(ev.target.id, data,  ev.target.className);
    }
}