let scrollPlace, modal;
$('.header__nav__menu').click(function(el) {
    if ($('.header__nav__menu').attr('data-check') == 0) {
        scrollPlace = el.originalEvent.pageY;
        window.scrollTo(0, 0);
        if ($('.header').attr('class').indexOf('show') != -1) $('.header').removeClass('show');
        $('.hide-menu').addClass('show').css('display', 'flex');
        //$('.header__nav__menu__line').css('background', 'black');
        $('.header__nav__menu__line').first().css('transform', 'rotate(45deg)');
        $('.header__nav__menu__line').last().css('transform', 'rotate(-45deg) translate(4px, -4px)');
        if ($(window).width() < 1200) { $('.header__nav__menu').attr('data-check', '1').css('width', '8vw'); }
        else { $('.header__nav__menu').attr('data-check', '1').css('width', '6vw'); }
        setTimeout(() => {$('html').data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden');}, 1000);
        
    } else {
        $('html').css('overflow', $('html').data('previous-overflow'));
        window.scrollTo(0, scrollPlace);
        $('.hide-menu').removeClass('show').css('display', 'none');
        $('.header').addClass('show');
        $('.header__nav__menu__line').first().css('transform', 'rotate(0deg)');
        $('.header__nav__menu__line').last().css('transform', 'rotate(0deg) translate(0px, 0px)');
        if ($(window).width() < 1200) { $('.header__nav__menu').attr('data-check', '0').css('width', '12vw'); }
        else { $('.header__nav__menu').attr('data-check', '0').css('width', '6vw'); }
    }
    
});

$('.anchor').click(function() {
    $('html').css('overflow', $('html').data('previous-overflow'));
        window.scrollTo(0, scrollPlace);
        $('.hide-menu').removeClass('show').css('display', 'none');
        $('.header').addClass('show');
        $('.header__nav__menu__line').first().css('transform', 'rotate(0deg)');
        $('.header__nav__menu__line').last().css('transform', 'rotate(0deg) translate(0px, 0px)');
        if ($(window).width() < 1200) { $('.header__nav__menu').attr('data-check', '0').css('width', '12vw'); }
        else { $('.header__nav__menu').attr('data-check', '0').css('width', '6vw'); }
});

// modal window ЗЕМЛЕВЛАДЕЛЬЦАМ И ЗАСТРОЙЩИКАМ      
let This;
$('.anketa').click(function() {
    This = $(this);
    $('.land').each(function() {
        if ($(this).attr('data-number') == This.attr('data-number')) {
            // добавляем модальное окно
            modal = $('<div class="modal__form"><form class="form"><div class="form__close"></div><h2>ЗЕМЛЕВЛАДЕЛЬЦАМ И ЗАСТРОЙЩИКАМ</h2><span>Заполните форму</span><div class="form__row"><input type="text" class="form__input" placeholder="ВВЕДИТЕ ИМЯ"><img src="img/user_1.png"></div><div class="form__row"><input type="tel" class="form__input" placeholder="+7 (XXX) XXX - XX - XX" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"><img src="img/Phone.png"></div><div class="form__row"><input type="email" class="form__input" placeholder="E-MAIL"><img src="img/mail.png"></div><div class="form__row" data-check="1"><input type="text" class="form__land" placeholder="Я ЗЕМЛЕВЛАДЕЛЕЦ" disabled><img src="img/down.png" class="form__icon"></div><div class="form__row" data-check="2"><input type="text" class="form__build" placeholder="Я ЗАСТРОЙЩИК" disabled></div><input type="submit" class="form__save" placeholder="СОХРАНИТЬ ДАННЫЕ"></form></div>');
            $(this).append(modal);
            // проматываем к верху
            window.scrollTo(0, $(this).offset().top);
            // отключаем прокрутку
            $('html').data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden');            
        }
    });
    $('.modal__form').css('display', 'flex');
    $('.form__row').click(function() {
        // если выбрали Я ЗЕМЛЕВЛАДЕЛЕЦ
        if ($(this).attr('data-check') == 1) {
            if ($('.form__row').last().css('display') == 'none') {
                $('.form__row').last().css('display', 'block'); // показываем элемент
            } else {
                $('.form__row').last().css('display', 'none'); // скрываем
            }
            
        }
        // если выбрали Я ЗАСТРОЙЩИК
        if ($(this).attr('data-check') == 2) { 
            let placeholder = $('.form__land').attr('placeholder');
            // меняем местами значения input
            $('.form__land').attr('placeholder', `${$('.form__build').attr('placeholder')}`);
            $('.form__build').attr('placeholder', `${placeholder}`);
            // прячем второй input
            $('.form__row').last().css('display', 'none');
        }
    });
    // закрываем модальное окно
    $('.form__close').click(function() {
        $('.modal__form').remove();
        // включаем прокрутку
        $('html').css('overflow', $('html').data('previous-overflow')); 
    });
}); 

// services dropdown
$('.services__dropdown').click(function() {
    if ($(this).children('.services__dropdown__hide').attr('class').indexOf('height-show') == -1) {
        $(this).children('.services__dropdown__hide').removeClass('height-close').addClass('height-show');
        setTimeout(() => {
            let services_height = $(this).children('.services__dropdown__hide').get(0).scrollHeight;
            $(this).css('height', services_height + 100);
        }, 100);
        $(this).find('.plus__line').last().css('transform', 'rotate(0deg)');
    } else {
        $(this).children('.services__dropdown__hide').removeClass('height-show').addClass('height-close');
        $(this).find('.plus__line').last().css('transform', 'rotate(90deg)');
        $(this).css('height', '90px');
    }
});


// lazy-load 
$(window).scroll(function() {
    $('.lazy-load').each(function() {
        if ($(window).scrollTop() + $(window).height() * 1.5 > $(this).offset().top)  {
            if ($(this).attr('data-src')) {
                $(this).attr('src', `${$(this).attr('data-src')}`);
                $(this).removeAttr('data-src');
            }
        }
    });
});

// slider projects

$('.slider__item').each(function() {
    if ($(this).attr('data-check') > 0) { $(this).css('display', 'none'); }
});

$('.arrow__right').click(function() {
        if (Number($('.control__left').html()) == 3) {
            $('.control__left').html('01');
            $('.slider__item').each(function() {
                if ($(this).attr('data-check') == '0') {
                    if ($(window).width() > 1200) { $(this).css('display', 'grid'); }
                    else { $(this).css('display', 'flex'); }
                } else {
                    $(this).css('display', 'none');
                }
            });
            $('.control__label').each(function() {
                if ($(this).attr('data-check') == '0') {
                    $(this).css('display', 'grid');
                } else {
                    $(this).css('display', 'none');
                }
            });
        } else {
            $('.control__left').html('0' + (Number($('.control__left').html()) + 1)); 
            $('.slider__item').each(function() {
                if ($(this).attr('data-check') == Number($('.control__left').html()) - 1) {
                    if ($(window).width() > 1200) { $(this).css('display', 'grid'); }
                    else { $(this).css('display', 'flex'); }
                } else {
                    $(this).css('display', 'none');
                }
            });
            $('.control__label').each(function() {
                if ($(this).attr('data-check') == Number($('.control__left').html()) - 1) {
                    $(this).css('display', 'grid');
                } else {
                    $(this).css('display', 'none');
                }
            });
        }
});
$('.arrow__left').click(function() {
    if (Number($('.control__left').html()) == 1) {
        $('.control__left').html('03');
        $('.slider__item').each(function() {
            if ($(this).attr('data-check') == '2') {
                if ($(window).width() > 1200) { $(this).css('display', 'grid'); }
                else { $(this).css('display', 'flex'); }
            } else {
                $(this).css('display', 'none');
            }
        });
        $('.control__label').each(function() {
            if ($(this).attr('data-check') == '2') {
                $(this).css('display', 'grid');
            } else {
                $(this).css('display', 'none');
            }
        });
    } else {
        $('.control__left').html('0' + (Number($('.control__left').html()) - 1)); 
        $('.slider__item').each(function() {
            if ($(this).attr('data-check') == Number($('.control__left').html()) - 1) {
                if ($(window).width() > 1200) { $(this).css('display', 'grid'); }
                else { $(this).css('display', 'flex'); }
            } else {
                $(this).css('display', 'none');
            }
        });
        $('.control__label').each(function() {
            if ($(this).attr('data-check') == Number($('.control__left').html()) - 1) {
                $(this).css('display', 'grid');
            } else {
                $(this).css('display', 'none');
            }
        });
    }
});

// переключатель темы

$('.theme').click(function(){
    if ($(this).attr('data-check') == 0) {
        $('body, .hide-menu').css({
            'background': '#ccc',
            'color': 'black'
        });
        $('a, h2, h3, span, p').css('color', 'black');
        $('button, textarea, input, .arrow, .arrow-left, .arrow-right, .services__dropdown, .anketa, .land__footer__item').css({
            'border-color': 'black',
            'color': 'black'
        });
        $('.header__nav__menu__line, .plus__line, .control__line').css('background', 'black');
        $('.change').css({
            'filter': 'saturate(0) invert(1) brightness(1)'
        });
        $(this).attr('data-check', '1');
    } else {
        $('body, .hide-menu').css({
            'background': 'black',
            'color': 'white'
        });
        $('a, h2, h3, span, p').css('color', 'white');
        $('button, textarea, input, .arrow, .arrow-left, .arrow-right, .services__dropdown, .anketa, .land__footer__item').css({
            'border-color': 'white',
            'color': 'white'
        });
        $('.header__nav__menu__line, .plus__line, .control__line').css('background', 'white');
        $('.change').css({
            'filter': 'none'
        });
        $(this).attr('data-check', '0');
    }
    
});

// projects dropdown filters
/*let count = 0;
let Thiss = 0;
$('.filter__first').click(function() {
    if ($(this).children().attr('data-check') == 0) {
        $('.filter__first').each(function() {
            $(this).parent().find('.filter__hide').removeClass('drop-show').addClass('drop-close').css('display', 'none');
            $(this).parent().find('img').css('transform', 'rotate(0deg)');
            $(this).children().attr('data-check', '0');
            Thiss = null;
        });
        $(this).children().attr('data-check', '1');
        Thiss = $(this);
        $(this).parent().find('.filter__hide').addClass('drop-show').removeClass('drop-close').css('display', 'block');
        $(this).parent().find('img').css('transform', 'rotate(180deg)');
        console.log(Thiss.children().attr('placeholder'));
        count = 0;
        $('.filter__hide__item').click(function() {
            if (count == 0) {
                let placeholder = $(this).attr('placeholder');
                console.log(placeholder, Thiss.children().attr('placeholder'));
                $(this).attr('placeholder', `${Thiss.children().attr('placeholder')}`);
                Thiss.children().attr('placeholder', `${placeholder}`);
                Thiss.parent().find('.filter__hide').removeClass('drop-show').addClass('drop-close').css('display', 'none');
                Thiss.parent().find('img').css('transform', 'rotate(0deg)');
                count = 1;
            }
        });
    } else {
        $(this).parent().find('.filter__hide').removeClass('drop-show').addClass('drop-close').css('display', 'none');
        $(this).parent().find('img').css('transform', 'rotate(0deg)');
        $(this).children().attr('data-check', '0');
    }
    
});*/