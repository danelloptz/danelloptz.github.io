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

// open and close burger menu
$('.nav_burger_wrapper').click(function() {
    if ($('.nav_burger').attr('data-check') == 0) {
        $('.nav_burger').addClass('open').removeClass('close').attr('data-check', '1');
        $('.nav_burger_wrapper').css('animation', 'NavWrapperRotate .8s forwards');
        $('.burger').css( {
            'animation': 'BurgerShow .7s forwards',
            'display': 'flex'
        });
    } else {
        $('.nav_burger').removeClass('open').addClass('close').attr('data-check', '0');
        $('.nav_burger_wrapper').css('animation', 'NavWrapperRotateClose .8s forwards');
        $('.burger').css('animation', 'BurgerClose .7s forwards');
        setTimeout(() => $('.burger').css('display', 'none'), 800);
    }
});
$('.burger_link').click(function() {
    const itemLink = '.' + $(this).attr('data-link');
    document.querySelector(itemLink).scrollIntoView({behavior: "smooth"});
    $('.nav_burger').removeClass('open').addClass('close').attr('data-check', '0');
    $('.nav_burger_wrapper').css('animation', 'NavWrapperRotateClose .8s forwards');
    $('.burger').css('animation', 'BurgerClose .7s forwards');
    setTimeout(() => $('.burger').css('display', 'none'), 800);
});

// Подчёркивание активного элемента меню в хедере
let header_items = document.querySelectorAll(".header_link");
header_items.forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector('.header_link_active').classList.remove('header_link_active');
        item.classList.add('header_link_active');
    });
});

// Изменение цвета фона на втором блоке с видео
$(window).on('scroll', () => { 
      let blockPosition = $('.help').offset().top, windowScrollPosition = $(window).scrollTop();
      if( blockPosition < windowScrollPosition + window.innerWidth - 100 ) {
          $('body').css('background', 'rgb(37, 36, 34)');
          $('.help-text-label').css('opacity', '1').addClass('animate__animated animate__fadeInLeft');
          $('.help-text-p').css('opacity', '1').addClass('animate__animated animate__bounceInUp');
          $('.button_dark').css('opacity', '1').addClass('animate__animated animate__bounceInRight');
      } else {
        $('body').css('background', 'white');
      }
});