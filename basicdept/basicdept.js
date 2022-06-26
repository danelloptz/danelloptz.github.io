function HideObjects() {
    $('#header').hide();
    $('#main').hide();
    $('#footer').hide();
}
function ShowObjects() {
    $('#header').show();
    $('#main').show();
    $('#footer').show();
}
HideObjects();
$('#reel').hide();
$('.hide-menu').hide();
setTimeout(() => {
    $('#preview').hide();
    ShowObjects();
}, 900); // прячем логотип preview

let checked, headerEl, headerDown;
let reelChek = false;
if ($(document).width() > 1250) {
    $('#header').mousemove(function (el) {
        if ((el.pageY >= ($('.header-nav').height() || $('.header-nav-sm').height())) && (el.pageY <= $('#header').height())) {
            $('#header-cursor').css('left', `${el.pageX}px`); // ставим координаты мышки в позицию элемента
            $('#header-cursor').css('top', `${el.pageY}px`);
            $('#header').css('cursor', 'none'); // убираем обычный курсор
        } else {
            $('#header-cursor').css('left', `47%`); // ставим координаты мышки в позицию элемента
            $('#header-cursor').css('top', `40%`);
            $('#header').css('cursor', 'auto');
        }
    });
}
let reelDown, interval;
$('#header-cursor, .video').click(function() {
    time = 0;
    reelChek = true;
    HideObjects();
    $('#reel').show();
    if (reelChek) {
        interval = setTimeout(function reel() {
            time++;
            if (time > 59) { time = 1; }
            if (time < 10) { $('#reel-time').html(`00:0${time}/00:59`);  }
            else { $('#reel-time').html(`00:${time}/00:59`);  }
            $('#reel-time').css('left', `${(time * 100) / 59}%`);
            setTimeout(reel, 1000);
        }, 1000);
    } else {
        interval = null;
        time = 0;
    }
});

let time = 0;
    $('#reel').click(function() {
        $('#reel').mousemove(function() {
            $('#reel-time').mousedown(function () {
                console.log('Down');
                reelDown = true; // отмечаем, что нажат
                console.log('Down');
            });
            $('#reel-time').mouseup(function () {
                console.log('Up');
                reelDown = false; // отмечаем, что отжат
            });
            /* Изменяем положение фигуры, когда передвигаем его мышкой.
            В условии проверяем, что элемент "зацеплен" (зажат мышкой) и
            мышка находится внутри поля. */
            if ((reelDown == true)) {
                $('#reel-time').css('left', `${el.pageX}px`); // ставим координаты мышки в позицию элемента
            }
        });
        $('#reel').hide();
        reelChek = false;
        ShowObjects();
    });

$('.header-nav-menu').click(function() {
    HideObjects();
    $('.hide-menu').show();
    $('html').data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden');
});
$('.hide-menu-header-close').click(function() {
    $('.hide-menu').hide();
    ShowObjects();
});
