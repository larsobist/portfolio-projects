window.onload = function() {
    // Get the modal
    var circleOfLifeModal = document.getElementById("circleOfLifeModal");
    var zphereModal = document.getElementById("zphereModal");
    var eatabroadModal = document.getElementById("eatabroadModal");
    var schildkroeteModal = document.getElementById("schildkroeteModal");
    var eshopModal = document.getElementById("eshopModal");
    var lagomModal = document.getElementById("lagomModal");
    var portfolioModal = document.getElementById("portfolioModal");
    var runnershighModal = document.getElementById("runnershighModal");
    var buildarModal = document.getElementById("buildarModal");
    var lastminuteModal = document.getElementById("lastminuteModal");
    var throwbackModal = document.getElementById("throwbackModal");

    // Get the button that opens the modal
    var circleOfLifeBtn = document.getElementById("circleOfLifeBtn");
    var zphereBtn = document.getElementById("zphereBtn");
    var eatabroadBtn = document.getElementById("eatabroadBtn");
    var schildkroeteBtn = document.getElementById("schildkroeteBtn");
    var eshopBtn = document.getElementById("eshopBtn");
    var lagomBtn = document.getElementById("lagomBtn");
    var portfolioBtn = document.getElementById("portfolioBtn");
    var runnershighBtn = document.getElementById("runnershighBtn");
    var buildarBtn = document.getElementById("buildarBtn");
    var lastminuteBtn = document.getElementById("lastminuteBtn");
    var throwbackBtn = document.getElementById("throwbackBtn");

    // Get the <span> element that closes the modal
    var span0 = document.getElementsByClassName("close")[0];
    var span1 = document.getElementsByClassName("close")[1];
    var span2 = document.getElementsByClassName("close")[2];
    var span3 = document.getElementsByClassName("close")[3];
    var span4 = document.getElementsByClassName("close")[4];
    var span5 = document.getElementsByClassName("close")[5];
    var span6 = document.getElementsByClassName("close")[6];
    var span7 = document.getElementsByClassName("close")[7];
    var span8 = document.getElementsByClassName("close")[8];
    var span9 = document.getElementsByClassName("close")[9];
    var span10 = document.getElementsByClassName("close")[10];

    // When the user clicks the button, open the modal 
    circleOfLifeBtn.onclick = function() {
        circleOfLifeModal.style.display = "block";
    }
    zphereBtn.onclick = function() {
        zphereModal.style.display = "block";
    }
    eatabroadBtn.onclick = function() {
        eatabroadModal.style.display = "block";
    }
    schildkroeteBtn.onclick = function() {
        schildkroeteModal.style.display = "block";
    }
    eshopBtn.onclick = function() {
        eshopModal.style.display = "block";
    }
    lagomBtn.onclick = function() {
        lagomModal.style.display = "block";
    }
    portfolioBtn.onclick = function() {
        portfolioModal.style.display = "block";
    }
    runnershighBtn.onclick = function() {
        runnershighModal.style.display = "block";
    }
    buildarBtn.onclick = function() {
        buildarModal.style.display = "block";
    }
    lastminuteBtn.onclick = function() {
        lastminuteModal.style.display = "block";
    }
    throwbackBtn.onclick = function() {
        throwbackModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span0.onclick = function() {
        circleOfLifeModal.style.display = "none";
    }
    span1.onclick = function() {
        zphereModal.style.display = "none";
    }
    span2.onclick = function() {
        eatabroadModal.style.display = "none";
    }
    span3.onclick = function() {
        schildkroeteModal.style.display = "none";
    }
    span4.onclick = function() {
        eshopModal.style.display = "none";
    }
    span5.onclick = function() {
        lagomModal.style.display = "none";
    }
    span6.onclick = function() {
        portfolioModal.style.display = "none";
    }
    span7.onclick = function() {
        runnershighModal.style.display = "none";
    }
    span8.onclick = function() {
        buildarModal.style.display = "none";
    }
    span9.onclick = function() {
        lastminuteModal.style.display = "none";
    }
    span10.onclick = function() {
        throwbackModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == circleOfLifeModal) {
            circleOfLifeModal.style.display = "none";
        }
        if (event.target == zphereModal) {
            zphereModal.style.display = "none";
        }
        if (event.target == eatabroadModal) {
            eatabroadModal.style.display = "none";
        }
        if (event.target == schildkroeteModal) {
            schildkroeteModal.style.display = "none";
        }
        if (event.target == eshopModal) {
            eshopModal.style.display = "none";
        }
        if (event.target == lagomModal) {
            lagomModal.style.display = "none";
        }
        if (event.target == portfolioModal) {
            portfolioModal.style.display = "none";
        }
        if (event.target == runnershighModal) {
            runnershighModal.style.display = "none";
        }
        if (event.target == buildarModal) {
            buildarModal.style.display = "none";
        }
        if (event.target == lastminuteModal) {
            lastminuteModal.style.display = "none";
        }
        if (event.target == throwbackModal) {
            throwbackModal.style.display = "none";
        }
    }
};