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
    } else {
        $('.header_menuBtn').removeClass('open dark').addClass('close white').attr('data-check', '0');
        $('.header_menuBtn_wrapper').css('animation', 'NavWrapperRotateClose .8s forwards');
        $('.burgerMenu').css('animation', 'BurgerClose .7s forwards');
    }
});