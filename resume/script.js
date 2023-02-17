/* меняем логотип на галочку в прелоадере */
setTimeout(() => {
    $('.preloader_logo').css('display', 'none');
    $('.preloader_check').css('display', 'block');
}, 2500);

/* убираем прелоадер и показываем страницу */
setTimeout(() => {
    $('.preloader_wrapper').css('display', 'none');
    $('.header').css('display', 'flex');
}, 4500);

/* Меню навигации */
$('.header_menuBtn_wrapper').click(function() {
    if ($('.header_menuBtn').attr('data-check') == 0) {
        $('.header_menuBtn').addClass('open dark').removeClass('close white').attr('data-check', '1');
        $('.header_menuBtn_wrapper').css('animation', 'NavWrapperRotate .8s forwards');
        $('.burgerMenu').css('animation', 'BurgerShow .7s forwards');
        $('.bigMenu_header_item_line').addClass('bigMenu_header_item_lineShow').removeClass('bigMenu_header_item_lineClose');
    } else {
        $('.header_menuBtn').removeClass('open dark').addClass('close white').attr('data-check', '0');
        $('.bigMenu_header_item_line').addClass('bigMenu_header_item_lineClose').removeClass('bigMenu_header_item_lineShow');
        $('.tab').each(function() {
            $(this).addClass('bigMenu_container_close').css('display', 'none');
        });
        setTimeout(() => {
            $('.header_menuBtn_wrapper').css('animation', 'NavWrapperRotateClose .8s forwards');
            $('.burgerMenu').css('animation', 'BurgerClose .7s forwards');
        }, 400);
        setTimeout(() => {
            $('.tab').each(function() {
                if ($(this).hasClass('bigMenu_container_show')) $(this).removeClass('bigMenu_container_close').css('display', 'flex');
            });
        }, 700)
    }
});

/* Вкладки в меню навигации */
$('.bigMenu_header_item').hover(function() {
    let num = $(this).attr('data-num');
    $('.bigMenu_header_item').each(function() {
        if ($(this).attr('data-num') == num) {
            $(this).children().first().addClass('bigMenu_header_item_numActive ');
            $(this).children().last().addClass('bigMenu_header_item_lineActive');
            if ($(this).hasClass('burger')) $('.bigMenu_slider_right, .bigMenu_slider_left').css('display', 'flex')
            else $('.bigMenu_slider_right, .bigMenu_slider_left').css('display', 'none');
        } 
        else {
            $(this).children().first().removeClass('bigMenu_header_item_numActive');
            $(this).children().last().removeClass('bigMenu_header_item_lineActive');
        } 
    });
    $('.tab').each(function() {
        if ($(this).attr('data-num') == num) {
            $(this).addClass('bigMenu_container_show').removeClass('bigMenu_container_close').css('display', 'flex');
        } 
        else {
            $(this).addClass('bigMenu_container_close').removeClass('bigMenu_container_show').css('display', 'none');
        }
    });
});

/* Слайдер в бургер меню */
let currTranslate = 0;
let sumTranslate = 0;
$('.bigMenu_slider_right, .bigMenu_slider_left').click(function() {
    let cardWidth = Number($('.bigMenu_container_projects_card').css('width').slice(0, -2));
    if ($(this).hasClass('bigMenu_slider_right') && (sumTranslate < Number($('.bigMenu_container_projects_slider').css('width').slice(0, -2)))) {
        currTranslate += 1;
        sumTranslate += currTranslate * cardWidth;
        $('.bigMenu_container_projects_slider').css('transform', `translate3d(-${currTranslate * cardWidth}px, 0px, 0px)`);

    } else {
        if ($(this).hasClass('bigMenu_slider_left')) {
            if ((currTranslate - 1 > 0)) {
                currTranslate -= 1;
                sumTranslate -= currTranslate * cardWidth;
                $('.bigMenu_container_projects_slider').css('transform', `translate3d(-${currTranslate * cardWidth}px, 0px, 0px)`);
            }
            else {
                currTranslate = 0;
                sumTranslate = 0;
                $('.bigMenu_container_projects_slider').css('transform', `translate3d(${currTranslate}, 0px, 0px)`);
            }
        }
    }
});

/* lazy-load */
$(window).on('scroll click', function() {
    $('.lazy-load').each(function() {
        if ($(window).scrollTop() + $(window).height() * 1.5 > $(this).offset().top)  {
            if ($(this).attr('data-src')) {
                $(this).attr('src', `${$(this).attr('data-src')}`);
                $(this).removeAttr('data-src');
            }
        }
    });
});