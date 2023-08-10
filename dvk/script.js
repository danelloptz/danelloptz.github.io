$('.nav_burger_wrapper').click(function() {
    if ($('.nav_burger').attr('data-check') == 0) {
        $('.nav_burger').addClass('open').removeClass('close').attr('data-check', '1');
        $('.nav_burger_wrapper').css('animation', 'NavWrapperRotate .8s forwards');
        $('.burger').css('animation', 'BurgerShow .7s forwards');
    } else {
        $('.nav_burger').removeClass('open').addClass('close').attr('data-check', '0');
        $('.nav_burger_wrapper').css('animation', 'NavWrapperRotateClose .8s forwards');
        $('.burger').css('animation', 'BurgerClose .7s forwards');
    }
});
