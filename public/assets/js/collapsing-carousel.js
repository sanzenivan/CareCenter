$(document).ready(function () {

    // Run it when the page loads
    var CurrentScroll = 0;

    // Run function when scrolling
    $(window).scroll(function () {
        var NextScroll = $(this).scrollTop();
        //console.log($(".carousel").is(":visible"));
        if (NextScroll > CurrentScroll && $(".carousel").is(":visible")) {
            // Go down
            if ($(this).scrollTop() > 0) {
                //disableScroll();
                $(".carousel").slideUp(500, "swing");
                //$(this).scrollTop(1);
                //enableScroll();
            }
        } else {
            // Go up
            if ($(this).scrollTop() == 0 && !$(".carousel").is(":visible")) {
                $(".carousel").slideDown(500, "swing");
                $(this).scrollTop(0);
            }
        }

        CurrentScroll = NextScroll;
    });
});


/*
    var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }


    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }
*/
