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

// Функция видимости элемента на экране
function IsVisible(classname) {
    return ($(classname).offset().top < $(window).scrollTop() + $(window).height() - 100) && ($(window).scrollTop() + $(window).height()*0.5 < $(classname).offset().top + $(window).height());
}

// Изменение цвета фона на втором блоке с видео
$(window).on('scroll', () => { 
      let blockPosition = $('.help').offset().top, windowScrollPosition = $(window).scrollTop();
    //   console.log(windowScrollPosition + window.innerHeight > blockPosition + window.innerHeight)
    // console.log();
    if (IsVisible('.about_text_h2')) $('.about_text_h2').css('opacity', '1').addClass('animate__animated animate__fadeInLeft');
    if (IsVisible('.about_text_p')) $('.about_text_p').css('opacity', '1').addClass('animate__animated animate__fadeInUp');
    if (IsVisible('.about_img')) $('.about_img').css('opacity', '1').addClass('animate__animated animate__slideInRight');
    if (IsVisible('.projects_h2')) $('.projects_h2').css('opacity', '1').addClass('animate__animated animate__fadeInUp');
    if (IsVisible('.swiper')) $('.swiper').css('opacity', '1').addClass('animate__animated animate__fadeIn');
      if(IsVisible('.help')) {
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

// let mainImages = document.querySelectorAll('.swiper-slide-mainImage');
// let smImages = document.querySelectorAll('.swiper-slide-smImage');



