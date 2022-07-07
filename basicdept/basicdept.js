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

//cursor
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

// video
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

//reel
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


//hide menu
$('.hide-sm-menu').hide();
$('.header-nav-menu, .header-nav-sm-menu').click(function() {
    if ($(window).width() > 1280) {
        HideObjects();
        $('.hide-menu').show();
        $('html').data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden');
    } else {
        HideObjects();
        $('.hide-sm-menu').show();
        $('html').data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden');
    }
});
$('.hide-menu-header-close').click(function() {
    $('.hide-menu').hide();
    $('.hide-sm-menu').hide();
    ShowObjects();
    $('html').css('overflow', $('html').data('previous-overflow'));
});

//slider

let start, end, cord, check = 0, leftClick;
$('#figure').hide();
$('.hide-menu').mousemove(function(move) {
    $('.slider').css('cursor', 'none');
    if ((move.pageY >= $('.hide-menu-header')[0].clientHeight + $('.hide-menu-header')[0].offsetTop) && (move.pageY <= $(window).height() - $('.hide-menu-footer').height())) {
        $('.slider-circle').css({
            'left': `${move.pageX - $('.slider-circle').width() / 2}px`,
            'top': `${move.pageY - $('.slider-circle').height() / 2}px`,
            'transition': '.1s',
            'cursor': 'none'
        }); // ставим координаты мышки в позицию элемента
        $('.slider').css('cursor', 'none'); // убираем обычный курсор
        $('.slider, .slider-circle').mousedown(function (el) {
            $('#figure').show();
            $('.slider-circle').css('transform', 'scale(0.7, 0.7)');
            $('.slider-circle-text').hide();
            $('.slider-circle-figure-left, .slider-circle-figure-right').css('visibility', 'visible');
            if (check == 0) {
                start = el.pageX;
                check = 1;
            }
            reelDown = true; // отмечаем, что нажат
        });
        $('.slider, .slider-circle').mouseup(function (e) {
            $('#figure').hide();
            $('.slider-circle').css('transform', 'scale(1, 1)');
            $('.slider-circle-text').show();
            $('.slider-circle-figure-left, .slider-circle-figure-right').css('visibility', 'hidden');
            end = e.pageX;
            reelDown = false; // отмечаем, что отжат
            check = 0;
        });
        /* Изменяем положение фигуры, когда передвигаем его мышкой.
        В условии проверяем, что элемент "зацеплен" (зажат мышкой) и
        мышка находится внутри поля. */
        if ((reelDown == true)) {
            if (($('.slider-content').last().offset().left >= $(window).width() - $('.slider-content').last().width()) && ($('.slider-content').first().offset().left <= 10)) {
                $('.slider').css({
                    'transform': `translate3d(${end - start}px, 0px, 0px)`,
                    'transition': '1s'
                }); // ставим координаты мышки в позицию элемента
            } else {
                $('.slider').css({
                    'transform': `translate3d(${0}px, 0px, 0px)`,
                    'transition': '1s'
                }); // ставим координаты мышки в позицию элемента
            }
                
        } 
        
    } else {
        $('.slider-circle').css({
            'left': '83vw',
            'top': '20vw'
        });
    }
    $('.slider-content').each(function(item) {
        if ((move.pageX >= $(this).offset().left) && (move.pageX <= $(this).offset().left + $(this).width())) {
            if ($('.slider-item-img-hover').length == 0) {
                $('.slider-item-img')[$(this)[0].dataset.number].className = 'slider-item-img-hover';
                $('.slider-item-hide-text')[$(this)[0].dataset.number].className = 'slider-item-hide-text-hover';
            } else {     
                    for (let i = 0; i < $('.slider-item-img-hover').length; i++) {
                        $('.slider-item-img-hover')[i].className = 'slider-item-img';
                        $('.slider-item-hide-text-hover')[i].className = 'slider-item-hide-text';
                    } 
                    $('.slider-item-img')[$(this)[0].dataset.number].className = 'slider-item-img-hover';
                    $('.slider-item-hide-text')[$(this)[0].dataset.number].className = 'slider-item-hide-text-hover';
            }
        }
    });
});