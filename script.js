let antiScroll = 0, closeShow = 0;
window.onload = () => {
    window.scrollTo(0, 0);
    $('#body').css('position', 'fixed');
}

// удаляем прелоадер 
function DivRemove() {
    $('#animate_logo').hide();
    $('#body').css({
        'position': 'relative',
        'background' : '#0a192f'
    });
    $('#wrapper--colba').css('opacity', '.2'); // меняем прозрачность индикатора чтения текста 
}
setTimeout(DivRemove, 4000); // 4 секунды анимация прелоадера, потом убираем его

let i = 1; let x = 1;

/* Функции, связанные с положением пользователя на странице */

function ChangeBackground() { // меняем цвет фона при промотке 500 пискелей
    if (window.scrollY >= 500) {
        $('#body').css('background', 'black');
    }
    else {
        $('#body').css('background', '#0a192f');
    }
}

/* "Колба" - индикатор количества прочитанной страницы.
   В нормальном состоянии верх "жидкости" плоский, но когда 
   "вода" доходит верха, необходимо края закруглить.
   Скорее всего непонятно, что тут я написал, но визуально
   на странице всё просто. */ 
function BorderWater() { 
    if (parseInt($('#water').css('height').slice(0, -1), 10) > 90) {
        // получаем число из строки в 10 сс (у элемента water. получаем его высоту. убираем в конце знак %)
        $('#water').css('border-radius', '15px');
    } else {
        $('#water').css('border-radius', '0 0 15px 15px');
    }
}
/* функция, благодаря которой элементы появляются, когда пользователь
   прокручивает страницу до места, где находится этот элемент.
   Если прокрученное количество пикселей больше, чем расстояние до блока, то
   ему присваевается класс, с анимацией (visible).
*/
function VisibleArticles() {
    $('[id*="article"]').each(function() {
        if ((scrollY >= $(this).offset().top - $(this).innerHeight()) && ($(this).hasClass('visible') == false)) {
            $(this).addClass('visible');
        }
    });
    
}

window.onscroll = function() { // запускаем функции при скролле
    //ChangeBackground();
    BorderWater();
    VisibleArticles();
}

// анимация открытия и закрытия меню и смена иконки "меню" на иконку "закрыть"
let line_width;
$('.header_nav_menu').click(function() {
    if ($(this).attr('data-check') == 0) {
        $('.header_inner_menu').css('display', 'flex');
        $(this).attr('data-check', '1');
        line_width = Number($('.header_nav_menu_line').css('width').slice(0, -2));
        $('.header_nav_menu_line').first().css({
            'transform': 'rotate(45deg)',
            'width': `${line_width - 20}px`
        });
        $('.header_nav_menu_line').last().css({
            'transform': 'rotate(-45deg) translate(4px, -4px)',
            'width': `${line_width - 20}px`
        });
    } else {
        $('.header_inner_menu').css('display', 'none');
        $(this).attr('data-check', '0');
        $('.header_nav_menu_line').first().css('transform', 'rotate(0deg)');
        $('.header_nav_menu_line').last().css('transform', 'rotate(0deg) translate(0px, 0px)');
        $('.header_nav_menu_line').css('width', `${line_width}px`);
    }
});


/* При нажатии на один из пунктов меню, закрываем меню,
 меняем кнопку и переводим пользователя на нужный пункт */
$('.link').click(function() {
    $('.header_inner_menu').css('display', 'none');
        $(this).attr('data-check', '0');
        $('.header_nav_menu_line').first().css('transform', 'rotate(0deg)');
        $('.header_nav_menu_line').last().css('transform', 'rotate(0deg) translate(0px, 0px)');
        $('.header_nav_menu_line').css('width', `${line_width}px`);
});

/* анимация эллипсов */
let ellipse = document.querySelectorAll(".ellipse");
function EllipseJump() { 
        for (let i = 0; i<ellipse.length; i++) {
            setTimeout(() => {
                ellipse[i].style.animationPlayState = 'running';
                ellipse[i].style.width = '90px';
                ellipse[i].style.height = '90px';
                ellipse[i].style.background = '#f5f8ff3d';
            }, (i+1)*1000); // вот это
            setTimeout(() => {
                ellipse[i].style.animationPlayState = 'paused';
                ellipse[i].style.width = '80px';
                ellipse[i].style.height = '80px';
                ellipse[i].style.background = 'none';
            }, (i+1)*2000 - i*1000); // и это просто нужно, чтобы работало
        } 
}
setInterval(EllipseJump, 9000); // анимация повторяется каждые 9 секунд


let scrollInt;
let xPos, yPos;
function AboutMenuOpen() {
    $('.header').css('visibility', 'hidden');
    let scrollHeight = window.scrollY; // на сколько прокрутили страницу 
    $('#aboutMenu').removeClass('header_inner_menu_close').addClass('about_inner_menu').css('display', 'block');
    $('#mainAbout').css('display', 'none');
    scrollInt = document.getElementById("aboutMenu").scrollIntoView(true); // перемещаем к блоку с текстом, т.к. по другому не получалось
    setTimeout(() => {
        $('html').data('scroll-position', scrollHeight).data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden'); // выключаем прокрутку
    }, 1000);

}
function AboutMenuClose() {
    $('#aboutMenu').removeClass('about_inner_menu').addClass('header_inner_menu_close').css('display', 'none');
    $('#mainAbout').css('display', 'flex');
    $('.header').css('visibility', 'visible');
    $('html').css('overflow', $('html').data('previous-overflow')); // включаем прокрутку
}

/* Функция для движения воды в колбе и появления пузырьков */

let countOfScroll = 0; // помогательная переменная для появления пузырьков
function Oxygen() {
    window.addEventListener('scroll', function() {
        let screenHeight = window.innerHeight; // высота разрешения экрана
        let pageHeight = Math.max( // высота всей страницы
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          );
          let scrollHeight = window.scrollY; // на сколько прокрутили страницу 
          let colbaHeight = (scrollHeight * 100) / (pageHeight - screenHeight); // высчитываем высоту в процентах
          $('#water').css('height', `${colbaHeight}%`); // присваиваем её
          if (countOfScroll == 0) {
              if (scrollY > 200) {
                let xMin = 2; // 4 точки отсчёта для высчитывания рандомных координат пузырьков
                let yMin = 30;
                let xMax = $('#wrapper--colba').width() - 5;
                let yMax = $('#wrapper--colba').height() - 5;
                    setInterval(() => {
                        if ($('#water').height() < 20) { // если высота воды меньше 20, то пузырьки не дабавляем, т.к мало места
                            $('#water').empty(); // очищаем все пузырьки
                        } else {
                            let waterMargin = $('#colba').height() - $('#water').height(); // высчитываем высоту пространства между верхом колбы и уровнем воды
                            /* ниже создаём div с position: absolute, указываем координаты (получили через random) 
                            с помощью left и top.
                            */
                            $('#water').append($('<div class="oxygen--fixed"></div>').css("left", `${Math.floor(Math.random() * (xMax - xMin + 1)) + xMin}px`).css("top", `${Math.floor(Math.random() * (yMax - + waterMargin - 5)) + waterMargin}px`));
                            $('#wrapper--colba').css('opacity', '.4'); // просто так надо
                        }
                    }, 300); // повторяем каждые 300 мс
                    setInterval(() => {
                        $('#water').empty(); // каждые 10 сек чистим воду от пузырьков
                    }, 10000); 
                countOfScroll = 1;
              }
          }
    });
}
setTimeout(Oxygen, 4000);

$("#wrapper--colba").mouseenter(function() { // делаем opacity при hover на fixed колбе
    $(this).css('opacity', '1');
}).mouseleave(function() {
    $(this).css('opacity', '.4');
});

/*let star = document.querySelectorAll("colba--modal--star");
function StarClick() { 
    let modalArr = $('.colba--modal--star');
    modalArr.each(function() {
        $(this).on('click', function() {
            let countStar = $(this).text();
            let newStar = ($.grep(modalArr, function(n, i){
                return i < countStar;
            }));
            newStar.forEach((item) => {
                item.style.background = 'url("img/starClicked.png") no-repeat';
                item.style.backgroundSize = 'cover';
            });
            let screenHeight = window.innerHeight;
            if (screenHeight <=700) {
                $('#colba--modal--inner').css('height', '40vh');
            } else {
                $('#colba--modal--inner').css('height', '30vh');
            }
            
            $('#colba--modal--close').show();
            $('#colba--modal--close').on('click', function() {
                $('#modal--wrapper').css({
                    'opacity': '0',
                    'pointer-events': 'none'
                });
                antiScroll = 1;
                window.scrollTo(0, 0);
                $('html').css('overflow', $('html').data('previous-overflow'));
                setTimeout(() => {
                    modalArr.each(function() {
                        $(this).css('pointer-events', 'none');
                    });
                    closeShow = 1;
                }, 2000);
            });
        });
    });

}
StarClick();*/

function ProjectsMenu() {
    $('.zag').on('click', function() {
        let zagId = $(this)[0].id;
        $('.projects--item').each(function() {
            if ($(this)[0].className.indexOf(zagId) == -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
}
ProjectsMenu();