let ballEl, ball, ballDown;
let check = true;
let Cord = {
    y_top : ($(document).height() - $('#colba').height()) / 2 + $('#ball').height() / 2,
    y_bottom : $(document).height() - (($(document).height() - $('#colba').height()) / 2) - $('#ball').height() / 2
}


// mobile

function is_touch_device() {
    if (!!('ontouchstart' in window)) {
        ballDown = true;
        $('#colba').bind('touchmove', function (el) {
            $('#ball').bind('touchstart',function () {
                ballDown = true; // отмечаем, что нажат
            });
            $('#ball').bind('touchend', function () {
                ballDown = false; // отмечаем, что отжат
            });
            /* Изменяем положение фигуры, когда передвигаем его мышкой.
            В условии проверяем, что элемент "зацеплен" (зажат мышкой) и
            мышка находится внутри поля. */
            if ((ballDown == true) && (el.changedTouches[0].pageY >= Cord.y_top) && (el.changedTouches[0].pageY <= Cord.y_bottom)) {
                $('#ball').css('top', `${el.changedTouches[0].pageY - ($(document).height() - $('#colba').height()) / 2 - 50}px`);
                //console.log(el.pageY - ($('#ball').height() * 1.5));
            }
            if (($('#ball')[0].offsetTop <= 30) && (check == true)) {
                check = false;
                alert('Вы не робот!');
                ballDown = false;
                console.log($('#ball'));
            }
            if (ballDown == false) {
                $('#ball').css('top', `${$('#colba').height() - $('#ball').height()}px`);
            }
        });
    } else {
        ballDown = false;
        $('#colba').mousemove(function (el) {
            $('#ball').mousedown(function () {
                ballDown = true; // отмечаем, что нажат
            });
            $('#ball').mouseup(function () {
                ballDown = false; // отмечаем, что отжат
            });
            /* Изменяем положение фигуры, когда передвигаем его мышкой.
            В условии проверяем, что элемент "зацеплен" (зажат мышкой) и
            мышка находится внутри поля. */
            if ((ballDown == true) && (el.pageY >= Cord.y_top) && (el.pageY <= Cord.y_bottom)) {
                $('#ball').css('top', `${el.pageY - ($('#ball').height() * 1.5)}px`);
                //console.log($('#ball'));
            }
            if (($('#ball')[0].offsetTop <= 30) && (check == true)) {
                check = false;
                alert('Вы не робот!');
                ballDown = false;
                console.log($('#ball'));
            }
            if (ballDown == false) {
                $('#ball').css('top', `${$('#colba').height() - $('#ball').height()}px`);
            }
        });
    }
}
is_touch_device();