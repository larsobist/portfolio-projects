var headerHeight = $(".start").height();
var marginTop = headerHeight.toString() + "px";
var startPoint = headerHeight / 2;
startPoint = startPoint.toString() + "px";
$(".content").css("margin-top", marginTop);

const titleScaleDown = basicScroll.create({
    elem: document.querySelector('h1'),
    from: '0',
    to: marginTop,
    direct: true,
    props: {
        '--scale': {
            from: '1',
            to: '0.9'
        }
    }
});

const titleFadeOut = basicScroll.create({
    elem: document.querySelector('h1'),
    from: 0,
    to: marginTop,
    direct: true,
    props: {
        '--opacity': {
            from: '1',
            to: '-1'
        }
    }
});

const backgroundFadeOut = basicScroll.create({
    elem: document.querySelector('.backgroundImage'),
    from: '0',
    to: marginTop,
    direct: true,
    props: {
        '--blur': {
            from: '5px',
            to: '40px'
        },
        '--scale': {
            from: '1.2',
            to: '1.5'
        }
    }
});

const fadeIn = basicScroll.create({
    elem: document.querySelector('h6'),
    from: 'top-bottom',
    to: 'middle-middle',
    direct: true,
    props: {
        '--opacity2': {
            from: '0',
            to: '1'
        },
        '--scale2': {
            from: '0.95',
            to: '1'
        }
    }
});

const fadeInText = basicScroll.create({
    elem: document.querySelector('p'),
    from: 'top-bottom',
    to: 'middle-middle',
    direct: true,
    props: {
        '--opacity3': {
            from: '0',
            to: '1',
            timing: 'quartIn'
        }
    }
});

const subtitleScaleDown = basicScroll.create({
    elem: document.querySelector('h2'),
    from: '0',
    to: marginTop,
    direct: true,
    props: {
        '--scale': {
            from: '1',
            to: '0.9'
        }
    }
});

const subtitleFadeOut = basicScroll.create({
    elem: document.querySelector('h2'),
    from: 0,
    to: marginTop * 2,
    direct: true,
    props: {
        '--opacity': {
            from: '1',
            to: '-1'
        }
    }
});

fadeInText.start();
fadeIn.start();
titleScaleDown.start();
titleFadeOut.start();
subtitleScaleDown.start();
subtitleFadeOut.start();
backgroundFadeOut.start();

$(window).scroll(function(event) {
    var scroll = $(window).scrollTop();
    if (scroll > headerHeight) {
        $("h1").addClass("hidden");
    } else if (scroll < headerHeight) {
        $("h1").removeClass("hidden");
    }
});