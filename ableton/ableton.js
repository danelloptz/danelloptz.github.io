let count = 1;
$('#svg-minus').hide();
$('#svg-minus-sm').hide();
$('#rutube-video').hide();
$('#nav-sign-sm').hide().css('justify-content', 'flex-start');

if ($(document).width() <= 457) {
    $('#nav-sign').hide();
    $('#nav-sign-sm').show();
}
$(window).resize(function() {
    if ($(document).width() <= 457) {
        $('#nav-sign').hide();
    } else {
        $('#nav-sign').show();
    }
});
$('#more').on('click', function() {
    if (count % 2 != 0) {
        $('#nav-hide').css('display', 'flex');
        $('#svg-plus').hide();
        $('#svg-minus').show();
    } else {
        $('#nav-hide').css('display', 'none');
        $('#svg-plus').show();
        $('#svg-minus').hide();
    }
    count++;
});
$('#menu-sm').on('click', function() {
    if (count % 2 != 0) {
        $('#nav-hide').css('display', 'flex');
        $('#svg-plus-sm').hide();
        $('#svg-minus-sm').show();
    } else {
        $('#nav-hide').css('display', 'none');
        $('#svg-plus-sm').show();
        $('#svg-minus-sm').hide();
    }
    count++;
});

$('.main-nav-text').on('click', function() {
    for (let i = 0; i < $('.main-nav-text').length; i++) {
        if ($('.main-nav-text')[i].ariaChecked) {
            $('.main-nav-text')[i].className = 'main-nav-text';
            $('.main-nav-text')[i].ariaChecked = false;
        }
    }
    $(this).addClass('main-nav-text-active');
    $(this)[0].ariaChecked = true;
});

$('#preview').on('click', function() {
    $('#rutube-video').show();
    $('#preview').hide();
});

let ballEl, ball, ballDown;
let check = true;
/*let Cord = {
    y_top : ($(document).height() - $('#wrapper').height()) / 2 + $('#text')[0].offsetTop,
    y_bottom : ($(document).height() - $('#wrapper').height()) / 2 + $('#text')[0].offsetTop + $('#colba')[0].offsetTop
}*/


// mobile
$(document).ready(function() {
    $('html').data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden');
    $('#modal').show();
    if (!!('ontouchstart' in window)) {
        ballDown = true;
        $('#modal-colba').bind('touchmove', function (el) {
            $('#modal-ball').bind('touchstart',function () {
                ballDown = true; // отмечаем, что нажат
            });
            $('#modal-ball').bind('touchend', function () {
                ballDown = false; // отмечаем, что отжат
            });
            /* Изменяем положение фигуры, когда передвигаем его мышкой.
            В условии проверяем, что элемент "зацеплен" (зажат мышкой) и
            мышка находится внутри поля. */
            if ((ballDown == true) && (el.changedTouches[0].pageY <= ($(window).height() - $('#modal-wrapper').height()) / 2 + $('#modal-colba')[0].offsetTop)) {
                $('#modal-ball').css('top', `${el.changedTouches[0].pageY - ($(window).height() - $('#modal-colba').height()) / 2 - 50}px`);
            }
            if (($('#modal-ball')[0].offsetTop <= 30) && (check == true)) {
                $('#modal').hide();
                $('html').css('overflow', $('html').data('previous-overflow'));
                check = false;
                ballDown = false;
            }
            if (ballDown == false) {
                $('#modal-ball').css('top', `${$('#modal-colba').height() - $('#modal-ball').height()}px`);
            }
        });
    } else {
        ballDown = false;
        $('#modal').show();
        $('#modal-colba').mousemove(function (el) {
            $('#modal-ball').mousedown(function () {
                ballDown = true; // отмечаем, что нажат
            });
            $('#modal-ball').mouseup(function () {
                ballDown = false; // отмечаем, что отжат
            });
            /* Изменяем положение фигуры, когда передвигаем его мышкой.
            В условии проверяем, что элемент "зацеплен" (зажат мышкой) и
            мышка находится внутри поля. */
            if ((ballDown == true) && (el.pageY <= ($(window).height() - $('#modal-wrapper').height()) / 2 + $('#modal-colba')[0].offsetTop)) {
                $('#modal-ball').css('top', `${el.pageY - ($(window).height() - $('#modal-wrapper').height()) / 2 - $('#modal-text')[0].offsetTop - $('#modal-ball').height() / 2}px`);
            }
            if (($('#modal-ball')[0].offsetTop <= 30) && (check == true)) {
                check = false;
                ballDown = false;
                $('#modal').hide();
                $('html').css('overflow', $('html').data('previous-overflow'));
            }
            if (ballDown == false) {
                $('#modal-ball').css('top', `${$('#modal-colba').height() - $('#modal-ball').height()}px`);
            }
        });
    }
});