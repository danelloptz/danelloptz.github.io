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
// $('.burger_link').click(function() {
//     const itemLink = '.' + $(this).attr('data-link');
//     document.querySelector(itemLink).scrollIntoView({behavior: "smooth"});
//     $('.nav_burger').removeClass('open').addClass('close').attr('data-check', '0');
//     $('.nav_burger_wrapper').css('animation', 'NavWrapperRotateClose .8s forwards');
//     $('.burger').css('animation', 'BurgerClose .7s forwards');
//     setTimeout(() => $('.burger').css('display', 'none'), 800);
// });

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
    //   console.log(windowScrollPosition + window.innerHeight > blockPosition + window.innerHeight)
      if( (blockPosition < windowScrollPosition + window.innerWidth - 100) && (windowScrollPosition + window.innerHeight*0.5< blockPosition + window.innerHeight)) {
          $('body').css('background', 'rgb(37, 36, 34)');
          $('.help-text-label').css('opacity', '1');
          $('.help-text-p').css('opacity', '1');
          $('.button_dark').css('opacity', '1');
      } else {
        $('body').css('background', 'white');
      }
});

// Swiper.js 
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    mousewheel: false,
    keyboard: true,
  });

// Появление окна с информацией при наведении на фотографию в слайдере "НАШИ ПРОЕКТЫ"
// let mainImageWrapper = document.querySelector('.swiper-slide-mainImage-wrapper');
// let mainImageInfo = document.querySelector('.swiper-slide-mainImage-info');
// mainImageWrapper.onmouseover = mainImageWrapper.onmouseout = mainImageInfo.onmouseover = mainImageInfo.onmouseout = (event) => {
//     if (event.type == 'mouseover') mainImageInfo.style.animation = 'SliderPhoto .5s';
//     if (event.type == 'mouseout') mainImageInfo.style.animation = 'none';
// }
