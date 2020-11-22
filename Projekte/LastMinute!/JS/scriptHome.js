function allowDrop(ev) {
    if (ev.target.className === "items") {
        ev.target.style.border = "3px dashed black"; //Rahmen um den Inventar wenn ein objekt rüber gezogen wird
    }
    ev.preventDefault();  //standarteinstellung ausschalten 
}

function drag(ev) {
    ev.dataTransfer.setData("img", ev.target.id); 
}

function dragleave(ev) {
    if (ev.target.className === "items") { 
        ev.target.style.border = "0px dashed transparent"; //border soll wieder unsichbar werden
    }
}   

function closeAufgabeModal(){
    document.getElementById("aufgabeModalDialog").style.visibility = 'hidden';
}