/* полноэкранный режим */
function Fullscreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}
function CancelFullscreen() {
    if(document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
$('.preloader_wrapper').click(Fullscreen);
$('.fullscreen').click(function() {
    if ($(this).attr('data-check') == 1) {
        Fullscreen();
        $(this).attr('data-check', '0');
        $('.fullscreen_btn').css('display', 'none');
        $('.minimaze_btn').css('display', 'block');
    } else {
        CancelFullscreen();
        $(this).attr('data-check', '1');
        $('.fullscreen_btn').css('display', 'block');
        $('.minimaze_btn').css('display', 'none');
    }
});
$('.project_slider').hide();
/* меняем логотип на галочку в прелоадере */
setTimeout(() => {
    $('.preloader').addClass('pulse');
}, 3500);

/* убираем прелоадер и показываем страницу */
$('.preloader_wrapper').click(function() {
    $('.preloader_logo').css('display', 'none');
    $('.preloader_check').css('display', 'block');
    $('.preloader_click_text').css('visibillity', 'hidden');
    setTimeout(() => {
        $('.preloader_wrapper').css('display', 'none');
        $('.header, .fullscreen').css('display', 'flex');
        $('.main').css('display', 'block'); // хз
    }, 1000);
});

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
let labels = ['Кто я?', 'Что умею?', 'Проекты', 'Хобби', 'Контакты'];

function SrollContentBefore(contentCount, way) {
    $('.content_bg').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show');
    $('.content_mobile_photo').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show');
    $('.content_opentag').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show').css('color', 'transparent');
    $('.content_closetag').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show').css('color', 'transparent');
    $('.content_photo').children().eq(contentCount).addClass('contentAnimation_close').removeClass('contentAnimation_show');
    $('.content_title').children().eq(contentCount).addClass('contentAnimationText_close').removeClass('contentAnimationText_show').css( {
        'color': 'transparent',
        'display': 'none'
    });
    $('.content_text').children().eq(contentCount).addClass('contentAnimationText_close').removeClass('contentAnimationText_show').css( {
        'color': 'transparent',
        'display': 'none'
    });
    $('.content_text').children().eq(contentCount).children().css('color', 'transparent');
}    
function SrollContentAfter(contentCount, way) {
    $('.content_bg').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_mobile_photo').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_opentag').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_closetag').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_photo').children().eq(contentCount).addClass('contentAnimation_show').removeClass('contentAnimation_close').css('display', 'block');
    $('.content_title').children().eq(contentCount).addClass('contentAnimationText_show').removeClass('contentAnimationText_close').css('display', 'block');
    $('.content_text').children().eq(contentCount).addClass('contentAnimationText_show').removeClass('contentAnimationText_close').css('display', 'block');
    $('.content_opentag').children().eq(contentCount).css('color', 'white');
    $('.content_closetag').children().eq(contentCount).css('color', 'white');
    $('.content_title').children().eq(contentCount).css('color', 'white');
    $('.content_text').children().eq(contentCount).css('color', 'white');
    $('.content_title').children().eq(contentCount).children().css('color', '#e5ff52');
    $('.content_text').children().eq(contentCount).children().css('color', '#e5ff52');
}

let contentCount = 0;
let currProjects = 0;
let sumProjects = 0;
let flagMobilePhoto = false;
let photographyFlag = false;
$('.project_slider_right, .project_slider_left').click(function() {
    let projectsCardWidth = Number($('.project_slider_container_img').css('width').slice(0, -2));
    if ($(this).hasClass('project_slider_right') && (currProjects + 1 < $('.project_slider_container_img').length)) {
        currProjects += 1;
        sumProjects += projectsCardWidth;
        console.log(currProjects, sumProjects);
        $('.project_slider_container').css('transform', `translate3d(-${currProjects * projectsCardWidth}px, 0px, 0px)`);
    } else {
        if ($(this).hasClass('project_slider_left')) {
            if ((currProjects - 1 > 0)) {
                currProjects -= 1;
                sumProjects -= projectsCardWidth;
                console.log(currProjects, sumProjects);
                $('.project_slider_container').css('transform', `translate3d(-${currProjects * projectsCardWidth}px, 0px, 0px)`);
            }
            else {
                currProjects = 0;
                sumProjects = 0;
                $('.project_slider_container').css('transform', `translate3d(${currProjects}px, 0px, 0px)`);
            }
        }
    }
});
$('.photography_img').click(function() {
    if ($('.modalPhoto').children().length == 1) {
        $('.header').css('display', 'none');
        $('.content_bg, .content_info, .photography').css('filter', 'brightness(0.7) blur(5px)');
        let wayPhoto = $(this).attr('src');
        let classPhoto;
        if ($(window).width() > $(window).height()) classPhoto = 'modalPhoto_pc'
        else classPhoto = 'modalPhoto_mobile'
        $('.modalPhoto').append(`<img src="${wayPhoto}" class="${classPhoto}">`);
        $('.modalPhoto').css('display', 'flex');
    }
});
$('.modalPhoto_close_wrapper').click(function() {
    $('.modalPhoto_pc, .modalPhoto_mobile').remove();
    $('.modalPhoto').css('display', 'none');
    $('.header').css('display', 'flex');
    $('.content_bg, .content_info, .photography').css('filter','none');
});
$(window).bind('mousewheel', function(e) {
    $('.photography').mouseenter(function() {
        photographyFlag = true;
        $(this).mouseenter(function() {
            $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
        });
        $(this).mouseleave(function() {
            if ($('.modalPhoto').css('display') == 'none') $('.content_bg, .content_info').css('filter', 'none');
        });
    });
    $('.photography').mouseleave(function() {
        photographyFlag = false;
    });
    if (scrollCan && photographyFlag == false) {
        scrollCan = false;
        if (flagMobilePhoto) {
            $('.content_mobile_photo').show();
            flagMobilePhoto = false;
        } 
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
                scrollCount += 1;
                $('.basketball, .photography').css('display', 'none');
                $('.basketball_video').trigger('pause');
                if (scrollCount >= 2) {
                    SrollContentBefore(contentCount, 'down');
                    $('.content_line').eq(contentCount).addClass('dot_line_active');
                    contentCount++;
                    SrollContentAfter(contentCount, 'down');
                    if (scrollCount == 3) {
                        if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                            flagMobilePhoto = true;
                            $('.content_mobile_photo').hide();
                        }
                        $('.project_slider').show();
                        $('.project_slider_wrapper').addClass('contentAnimation_show').removeClass('contentAnimation_close');
                        $('.content_photo').hide();
                        $('.content').css('grid-template-columns', '7fr 7fr');
                        $('.project_slider').mouseenter(function() {
                            $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
                        });
                        $('.project_slider').mouseleave(function() {
                            $('.content_bg, .content_info').css('filter', 'none');
                        });
                    } else if (scrollCount == 4) {
                        $('.basketball').css('display', 'block');
                        $('.project_slider').hide();
                        if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                            flagMobilePhoto = true;
                            $('.content_mobile_photo').hide();
                        }
                        $('.content_text').css('height', 'auto');
                        $('.basketball_video').trigger('play');
                        $('.basketball_video').mouseenter(function() {
                            $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
                        });
                        $('.basketball_video').mouseleave(function() {
                            $('.content_bg, .content_info').css('filter', 'none');
                        });
                    } else if (scrollCount == 5) {
                        $('.photography').css('display', 'flex');
                        $('.project_slider').hide();
                        if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                            flagMobilePhoto = true;
                            $('.content_mobile_photo').hide();
                        }
                        $('.content_mobile_photo').hide();
                    } else {
                        currProjects = 0;
                        sumProjects = 0;
                        $('.project_slider_wrapper').addClass('contentAnimation_close').removeClass('contentAnimation_show');
                        $('.project_slider_container').css('transform', `translate3d(${currProjects}px, 0px, 0px)`);
                        $('.project_slider').hide();
                        $('.content_photo').show();
                        $('.content').css('grid-template-columns', '7fr 5fr');
                    }
                    let marginLeft = $('.content_line').width() * contentCount + $('.content_line_dot').width()*(contentCount + 1) - $('.content_line_text').width() / 2;
                    $('.content_line_text').html(labels[contentCount]).css('left', `${marginLeft}px`);
                    $('.content_line_dot').eq(contentCount).addClass('dot_line_active');
                } else {
                    $('.main_active').addClass('main_close').removeClass('main_active');
                    $('.main').children().eq(scrollCount).addClass('main_active').removeClass('main_close').css('display', 'grid');
                    setTimeout(() => $('.main_close').css('display', 'none'), 1000);
                } 
            }
        }
        else {
            if (scrollCount > 1) {
                scrollCount -= 1;
                $('.basketball, .photography').css('display', 'none');
                $('.basketball_video').trigger('pause');
                SrollContentBefore(contentCount, 'up');
                $('.content_line_dot').eq(contentCount).removeClass('dot_line_active');                
                contentCount--;
                SrollContentAfter(contentCount, 'up');
                if (scrollCount == 3) {
                    if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                        flagMobilePhoto = true;
                        $('.content_mobile_photo').hide();
                    }
                    $('.project_slider').show();
                    $('.content_photo').hide();
                    $('.content').css('grid-template-columns', '7fr 7fr');
                    $('.project_slider').mouseenter(function() {
                        $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
                    });
                    $('.project_slider').mouseleave(function() {
                        $('.content_bg, .content_info').css('filter', 'none');
                    });
                } else if (scrollCount == 4) {
                    $('.basketball').css('display', 'block');
                        $('.project_slider').hide();
                        if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                            flagMobilePhoto = true;
                            $('.content_mobile_photo').hide();
                        }
                        $('.content_text').css('height', 'auto');
                        $('.basketball_video').trigger('play');
                        $('.basketball_video').mouseenter(function() {
                            $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
                        });
                        $('.basketball_video').mouseleave(function() {
                            $('.content_bg, .content_info').css('filter', 'none');
                        });
                } else if (scrollCount == 5) {
                    $('.photography').css('display', 'flex');
                    $('.project_slider').hide();
                    if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                        flagMobilePhoto = true;
                        $('.content_mobile_photo').hide();
                    }
                    $('.content_mobile_photo').hide();
                } else{
                    $('.project_slider').hide();
                    $('.content_photo').show();
                    $('.content').css('grid-template-columns', '7fr 5fr');
                }
                $('.content_line_text').html(labels[contentCount]).css('left', `${22*contentCount}%`);
                $('.content_line').eq(contentCount).removeClass('dot_line_active');
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
    $('.photography').bind('touchstart',function() {
        photographyFlag = true;
        $(this).bind('touchstart',function() {
            $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
        });
        $(this).bind('touchend',function() {
            if ($('.modalPhoto').css('display') == 'none') $('.content_bg, .content_info').css('filter', 'none');
        });
    });
    $('.photography').bind('touchend',function() {
        photographyFlag = false;
    });
    if (flag == 1 && scrollCan && photographyFlag == false) {
        scrollCan = false;
        if (flagMobilePhoto) {
            $('.content_mobile_photo').show();
            flagMobilePhoto = false;
        } 
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
                scrollCount += 1;
                $('.basketball, .photography').css('display', 'none');
                $('.basketball_video').trigger('pause');
                if (scrollCount > 1) {
                    SrollContentBefore(contentCount, 'down');
                    $('.content_line').eq(contentCount).addClass('dot_line_active');
                    contentCount++;
                    SrollContentAfter(contentCount, 'down');
                    if (scrollCount == 3) {
                        if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                            flagMobilePhoto = true;
                            $('.content_mobile_photo').hide();
                        }
                        $('.project_slider').show();
                        $('.project_slider_wrapper').addClass('contentAnimation_show').removeClass('contentAnimation_close');
                        $('.content_photo').hide();
                        $('.content').css('grid-template-columns', '7fr 7fr');
                        $('.project_slider').mouseenter(function() {
                            $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
                        });
                        $('.project_slider').mouseleave(function() {
                            $('.content_bg, .content_info').css('filter', 'none');
                        });
                    } else if (scrollCount == 4) {
                        $('.basketball').css('display', 'block');
                            $('.project_slider').hide();
                            if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                                flagMobilePhoto = true;
                                $('.content_mobile_photo').hide();
                            }
                            $('.content_text').css('height', 'auto');
                            $('.basketball_video').trigger('play');
                            $('.basketball_video').mouseenter(function() {
                                $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
                            });
                            $('.basketball_video').mouseleave(function() {
                                $('.content_bg, .content_info').css('filter', 'none');
                            });
                    } else if (scrollCount == 5) {
                        $('.photography').css('display', 'flex');
                        $('.project_slider').hide();
                        if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                            flagMobilePhoto = true;
                            $('.content_mobile_photo').hide();
                        }
                    } else {
                        currProjects = 0;
                        sumProjects = 0;
                        $('.project_slider_wrapper').addClass('contentAnimation_close').removeClass('contentAnimation_show');
                        $('.project_slider_container').css('transform', `translate3d(${currProjects}px, 0px, 0px)`);
                        $('.project_slider').hide();
                        $('.content_photo').show();
                        $('.content').css('grid-template-columns', '7fr 5fr');
                    }
                    $('.content_line_text').html(labels[contentCount]).css('left', `${22*contentCount}%`);
                    $('.content_line_dot').eq(contentCount).addClass('dot_line_active');
                } else {
                    $('.main_active').addClass('main_close').removeClass('main_active');
                    $('.main').children().eq(scrollCount).addClass('main_active').removeClass('main_close').css('display', 'grid');
                    setTimeout(() => $('.main_close').css('display', 'none'), 1000);
                }
            }
        }
        else {
            if (scrollCount > 1) {
                scrollCount -= 1;
                $('.basketball, .photography').css('display', 'none');
                $('.basketball_video').trigger('pause');
                SrollContentBefore(contentCount, 'up');
                $('.content_line_dot').eq(contentCount).removeClass('dot_line_active');                
                contentCount--;
                SrollContentAfter(contentCount, 'up');
                if (scrollCount == 3) {
                    if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                        flagMobilePhoto = true;
                        $('.content_mobile_photo').hide();
                    }
                    $('.project_slider').show();
                    $('.content_photo').hide();
                    $('.content').css('grid-template-columns', '7fr 7fr');
                    $('.project_slider').mouseenter(function() {
                        $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
                    });
                    $('.project_slider').mouseleave(function() {
                        $('.content_bg, .content_info').css('filter', 'none');
                    });
                } else if (scrollCount == 4) {
                    $('.basketball').css('display', 'block');
                        $('.project_slider').hide();
                        if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                            flagMobilePhoto = true;
                            $('.content_mobile_photo').hide();
                        }
                        $('.content_text').css('height', 'auto');
                        $('.basketball_video').trigger('play');
                        $('.basketball_video').mouseenter(function() {
                            $('.content_bg, .content_info').css('filter', 'brightness(0.7) blur(5px)');
                        });
                        $('.basketball_video').mouseleave(function() {
                            $('.content_bg, .content_info').css('filter', 'none');
                        });
                } else if (scrollCount == 5) {
                    $('.photography').css('display', 'flex');
                    $('.project_slider').hide();
                    if (flagMobilePhoto == false && $('.content_mobile_photo').css('display') == 'block') {
                        flagMobilePhoto = true;
                        $('.content_mobile_photo').hide();
                    }
                } else {
                    $('.project_slider').hide();
                    $('.content_photo').show();
                    $('.content').css('grid-template-columns', '7fr 5fr');
                }
                $('.content_line_text').html(labels[contentCount]).css('left', `${22*contentCount}%`);
                $('.content_line').eq(contentCount).removeClass('dot_line_active');
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