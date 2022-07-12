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
let marginLeft;
setTimeout(() => {
    $('#preview').hide();
    ShowObjects();
    marginLeft = $('.featured').offset().left;
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

// reel video
let reelDown, interval;
let time = 0;
$('#header-cursor, .video, .header-sm-preview').click(function() {
    if ($('.full-video').attr('data-src')) {
        $('.full-video').attr('src', 'img/reel.mp4');
        $('.full-video').removeAttr('data-src');
    }
    time = 0;
    reelChek = true;
    HideObjects();
    $('#reel').show();
    if (reelChek) {
            interval = setInterval(() => {
                time++;
                if (time > 59) { time = 1; }
                if (time < 10) { $('#reel-time').html(`00:0${time}/00:59`);  }
                else { $('#reel-time').html(`00:${time}/00:59`);  }
                $('#reel-time').css('left', `${(time * 100) / 59}%`);
            }, 1000);
    }
    $('#reel').click(function() {
        clearInterval(interval);
        $('#reel-time').css('left', `${0}%`);
        $('#reel-time').html(`00:00/00:59`);
        $('.full-video').attr('data-src', 'img/reel.mp4');
        $('.full-video').removeAttr('src');
        $('#reel').mousemove(function() {
            $('#reel-time').mousedown(function () {
                reelDown = true; // отмечаем, что нажат
            });
            $('#reel-time').mouseup(function () {
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
});



//hide menu
$('.hide-sm-menu').hide();
$('.header-nav-menu, .header-nav-sm-menu').click(function() {
    if ($(window).width() > 1280) {
        HideObjects();
        $('.hide-menu').show();
        $('.hide-menu-header-close').css('background-image', 'img/close.png');
        $('.slider-item-img').each(function() {
            if ($(this).attr('data-src')) {
                $(this).attr('src', `${$(this).attr('data-src')}`);
                $(this).removeAttr('data-src');
            }
        });
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
    $('.slider-circle').css('visibility', 'visible');
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
        if (end - start < ($(window).width() * 23) / (-100)) {
            $('.slider').css({
                'transform': `translate3d(-${($(window).width() * 23) / 100}px, 0px, 0px)`,
                'transition': '1s'
            });
        } else if (end - start > ($(window).width() * 23) / 100) {
            $('.slider').css({
                'transform': `translate3d(${23}vw, 0px, 0px)`,
                'transition': '1s'
            });
        } else {
            if ((reelDown == true)) {
                $('.slider').css({
                    'transform': `translate3d(${end - start}px, 0px, 0px)`,
                    'transition': '1s'
                });
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
$('.hide-menu-header-close').click(function() {
    $('.slider-circle').css('visibility', 'hidden');
});

// featured slider pc
end = 0;
let sum = 0, sum1 = 0;
$(window).mousemove(function(move) {
    if ((move.pageY >= $('.featured').offset().top) && (move.pageY <= $('.featured').offset().top + $('.featured').height())) {
        $('.featured-circle').css('visibility', 'visible');
        $('.featured-circle').css({
            'left': `${move.pageX - $('.slider-circle').width() / 2}px`,
            'top': `${move.pageY - $('.slider-circle').height() / 2}px`,
            'transition': '.1s',
            'cursor': 'none'
        }); // ставим координаты мышки в позицию элемента
        $('.featured').css('cursor', 'none'); // убираем обычный курсор
        $('.featured, .featured-circle').mousedown(function (el) {
            $('.featured-circle').css('transform', 'scale(0.7, 0.7)');
            $('.featured-circle-text').hide();
            $('.featured-circle-figure-left, .featured-circle-figure-right').css('visibility', 'visible');
            if (check == 0) {
                start = el.pageX;
                check = 1;
            }
            reelDown = true; // отмечаем, что нажат
        });
        $('.featured, .featured-circle').mouseup(function (e) {
            $('.featured-circle').css('transform', 'scale(1, 1)');
            $('.featured-circle-text').show();
            $('.featured-circle-figure-left, .featured-circle-figure-right').css('visibility', 'hidden');
            end = e.pageX;
            if (end - start < ($(window).width() * 43) / (-100)) {
                $('.featured').css({
                    'transform': `translate3d(-${($(window).width() * 43) / 100}px, 0px, 0px)`,
                    'transition': '1s'
                });
            } else if (end - start > ($(window).width() * 43) / 100) {
                $('.featured').css({
                    'transform': `translate3d(${43}vw, 0px, 0px)`,
                    'transition': '1s'
                });
            } 
            if (reelDown) {
                sum1 += end - start;
                $('.featured').css({
                    'transform': `translate3d(${sum1}px, 0px, 0px)`,
                    'transition': '1s'
                });
                sum += ((((start - end) * 100) / $('.featured').width()) * $(window).width()) / 100;
                if (sum + $('.featured-wrapper-line').width() < 0) {
                    $('.featured-wrapper-line').css({
                        'left': `${0}px`,
                        'transition': '1s'
                    }); 
                } else if (sum + $('.featured-wrapper-line').width() > $('.featured-wrapper').width() - $('.featured-wrapper-line').width()) {
                    $('.featured-wrapper-line').css({
                        'right': `${0}px`,
                        'left': 'none',
                        'transition': '1s'
                    }); 
                } else {
                    $('.featured-wrapper-line').css({
                        'left': `${sum + $('.featured-wrapper-line').width()}px`,
                        'transition': '1s'
                    });
                }
            reelDown = false;
        }
        });      
    } else {
        $('.featured-circle').css({
            'left': '80vw',
            'top': `${$('.featured').offset().top + $('.featured').height() / 2}px`
        });
    }
});

// featured slider mobile
let featuredWidth, featuredTransform;
sum1 = 0, sum = 0;
$(window).bind('touchmove', function(move) {
    if ((move.changedTouches[0].pageY >= $('.featured').offset().top) && (move.changedTouches[0].pageY <= $('.featured').offset().top + $('.featured').height())) {
        $('.featured').bind('touchstart', function (el) {
            start = el.changedTouches[0].pageX;
            reelDown = true; // отмечаем, что нажат
        });
        $('.featured').bind('touchend', function (e) {
            end = e.changedTouches[0].pageX;
            if (reelDown) {
                    sum1 += end - start;
                    $('.featured').css({
                        'transform': `translate3d(${sum1}px, 0px, 0px)`,
                        'transition': '1s'
                    });
                    sum += ((((start - end) * 100) / $('.featured').width()) * $(window).width()) / 100;
                    if (sum + $('.featured-wrapper-line').width() < 0) {
                        $('.featured-wrapper-line').css({
                            'left': `${0}px`,
                            'transition': '1s'
                        }); 
                    } else if (sum + $('.featured-wrapper-line').width() > $('.featured-wrapper').width() - $('.featured-wrapper-line').width()) {
                        $('.featured-wrapper-line').css({
                            'right': `${0}px`,
                            'left': 'none',
                            'transition': '1s'
                        }); 
                    } else {
                        $('.featured-wrapper-line').css({
                            'left': `${sum + $('.featured-wrapper-line').width()}px`,
                            'transition': '1s'
                        });
                    }
                reelDown = false;
            }
        });
        if (($(window).width() < 600) && ($(window).width() > 450)) {
            featuredWidth = 40;
            featuredTransform = 67;
        } else if ($(window).width() <= 450) {
            featuredWidth = 50;
            featuredTransform = 92;
        } else {
            featuredWidth = 30;
            featuredTransform = 42;
        }
        if (end - start < ($(window).width() * featuredTransform) / (-100)) {
            $('.featured').css({
                'transform': `translate3d(-${($(window).width() * featuredTransform) / 100}px, 0px, 0px)`,
                'transition': '1s'
            });
        } else if (end - start > ($(window).width() * featuredTransform) / 100) {
            $('.featured').css({
                'transform': `translate3d(${featuredTransform}vw, 0px, 0px)`,
                'transition': '1s'
            });
        }
    }
});

// lazy-load and change body bg

if($(window).width() <= 600) {
    if ($('.header-sm-preview').attr('data-src')) {
        $('.header-sm-preview').attr('src', `${$('.header-sm-preview').attr('data-src')}`);
        $('.header-sm-preview').removeAttr('data-src');
    }
    
}
$(window).scroll(function() {
    $('.lazy-load').each(function() {
        if ($(window).scrollTop() + $(window).height() > $(this).offset().top)  {
            if ($(this).attr('data-src')) {
                $(this).attr('src', `${$(this).attr('data-src')}`);
                $(this).removeAttr('data-src');
            }
        }
    });
    if (($(window).scrollTop() > $('.help').offset().top - $(window).height() / 2) && ($(window).scrollTop() < $('.news').offset().top - $(window).height() / 2)) {
        $('body').css('background', '#252422');
        if ($('.help-video-play').attr('data-src')) {
            $('.help-video-play').attr('src', 'img/Culture-Loop_v1.mp4');
            $('.help-video-play').removeAttr('data-src');
        }
    } else {
        $('body').css('background', 'white');
    }
});
