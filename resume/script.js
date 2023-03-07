/* меняем логотип на галочку в прелоадере */
setTimeout(() => {
    $('.preloader_logo').css('display', 'none');
    $('.preloader_check').css('display', 'block');
}, 2500);

/* убираем прелоадер и показываем страницу */
setTimeout(() => {
    $('.preloader_wrapper').css('display', 'none');
    $('.header').css('display', 'flex');
    $('.main').css('display', 'block'); // хз
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

// Прыгающие логотипы на главное странице
let jumpCount = 0;
function JumpLogos() {
    if ($('.hello_icon').length == jumpCount) jumpCount = 0;
    $('.hello_icons_wrapper').children().eq(jumpCount - 1).removeClass('hello_icon_active');
    $('.hello_icons_wrapper').children().eq(jumpCount).addClass('hello_icon_active');
    jumpCount += 1;
}
setInterval(JumpLogos, 500); 


/* Переход на следующий блок при скролле. PC версия  */
let scrollCount = 0;
let scrollCan = true;
function SrollContentBefore(contentCount, way) {
    $('.content_bg').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show');
    $('.content_mobile_photo').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show');
    $('.content_opentag').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show').css('color', 'transparent');
    $('.content_closetag').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show').css('color', 'transparent');
    $('.content_photo').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show');
    $('.content_title').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show').css('color', 'transparent');
    $('.content_title').children().eq(contentCount).children().css('color', 'transparent');
    $('.content_text').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show').css('color', 'transparent');
    $('.content_text').children().eq(contentCount).children().css('color', 'transparent');
}    
function SrollContentAfter(contentCount, way) {
    $('.content_bg').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_mobile_photo').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_opentag').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_closetag').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_photo').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_title').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_text').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_opentag').children().eq(contentCount).css('color', 'white');
    $('.content_closetag').children().eq(contentCount).css('color', 'white');
    $('.content_title').children().eq(contentCount).css('color', 'white');
    $('.content_text').children().eq(contentCount).css('color', 'white');
    $('.content_title').children().eq(contentCount).children().css('color', '#e5ff52');
    $('.content_text').children().eq(contentCount).children().css('color', '#e5ff52');
}
let contentCount = 0;
$(window).bind('mousewheel', function(e) {
    if (scrollCan) {
        scrollCan = false;
        if (e.originalEvent.deltaY > 0) {
            let numActive = Number($('.main_active').attr('data-check'));
            if (scrollCount == 0) $('.hello_img_wrapper').addClass('hide_hello_img').removeClass('show_hello_img'); 
            if ($('.main_active').length == 0) {
                numActive = 0;
                scrollCount = 1;
                $('.main_item').first().addClass('main_close');
                $('.main').children().eq(1).addClass('main_active');
                setTimeout(() => $('.main_close').css('display', 'none'), 1000);
            } else {
                if ($('.main_active').length >= scrollCount) {
                    scrollCount += 1;
                    if (scrollCount == 2) { // ==
                        SrollContentBefore(contentCount, 'down');
                        contentCount++;
                        SrollContentAfter(contentCount, 'down');
                    } else {
                        $('.main_active').addClass('main_close').removeClass('main_active');
                        $('.main').children().eq(scrollCount).addClass('main_active').removeClass('main_close').css('display', 'grid');
                        setTimeout(() => $('.main_close').css('display', 'none'), 1000);
                    }
                    
                }
            }
        }
        else {
            if (scrollCount > 1) {
                scrollCount -= 1;
                SrollContentBefore(contentCount, 'up');
                contentCount--;
                SrollContentAfter(contentCount, 'up');
            }
            else {
                if (scrollCount - 1 >= 0) {
                    scrollCount -= 1;
                    $('.main_active').addClass('main_close').removeClass('main_active');
                    $('.hello_img_wrapper').addClass('show_hello_img').removeClass('hide_hello_img'); 
                    $('.main').children().eq(scrollCount).removeClass('main_close').addClass('main_active').css('display', 'flex');
                    setTimeout(() => $('.main_close').css('display', 'none'), 1000);
                } 
            } 
        } 
    }
    setTimeout(() => scrollCan = true, 800);
});

/* Переход на следующий блок при скролле. Mobile версия  */
let startScroll = 0;
let endScroll = 0;
let flag = 0;
$(window).bind('touchstart', function(e) {
    startScroll = e.originalEvent.touches[0].clientY;
    flag = 1;
});
$(window).bind('touchend', function(e) {
    endScroll = e.originalEvent.changedTouches[0].clientY;
    flag = 1;
});
$(window).bind('touchmove', function(e) {
    if (flag == 1 && scrollCan) {
        console.log(startScroll, endScroll);
        scrollCan = false;
        if (startScroll > endScroll) {
            let numActive = Number($('.main_active').attr('data-check'));
            if (scrollCount == 0) $('.hello_img_wrapper').addClass('hide_hello_img').removeClass('show_hello_img'); 
            if ($('.main_active').length == 0) {
                numActive = 0;
                scrollCount = 1;
                $('.main_item').first().addClass('main_close');
                $('.main').children().eq(1).addClass('main_active');
                setTimeout(() => $('.main_close').css('display', 'none'), 1000);
            } else {
                if ($('.main_active').length >= scrollCount) {
                    scrollCount += 1;
                    if (scrollCount == 2) {
                        SrollContentBefore(contentCount, 'down');
                        contentCount++;
                        SrollContentAfter(contentCount, 'down');
                    } else {
                        $('.main_active').addClass('main_close').removeClass('main_active');
                        $('.main').children().eq(scrollCount).addClass('main_active').removeClass('main_close').css('display', 'grid');
                        setTimeout(() => $('.main_close').css('display', 'none'), 1000);
                    }
                }
            }
        }
        else {
            if (scrollCount > 1) {
                scrollCount -= 1;
                SrollContentBefore(contentCount, 'up');
                contentCount--;
                SrollContentAfter(contentCount, 'up');
            }
            else {
                if (scrollCount - 1 >= 0) {
                    scrollCount -= 1;
                    $('.main_active').addClass('main_close').removeClass('main_active');
                    $('.hello_img_wrapper').addClass('show_hello_img').removeClass('hide_hello_img'); 
                    $('.main').children().eq(scrollCount).removeClass('main_close').addClass('main_active').css('display', 'flex');
                    setTimeout(() => $('.main_close').css('display', 'none'), 1000);
                } 
            } 
            
        }
        flag = 0;
        startScroll = 0;
        endScroll = 0;
    }  
    setTimeout(() => scrollCan = true, 800);
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