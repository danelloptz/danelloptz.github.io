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


/*const smoothCoef = 0.05; // transition of scroll
const smoothScroll = document.querySelector(".body");


let prevY = window.scrollY;
let curY = window.scrollY;
let y = window.scrollY;
let dy;

function loop(now) { // function for shift page
  curY = window.scrollY;
  dy = curY - prevY;
  y = Math.abs(dy) < 1 ? curY : y + dy * smoothCoef;
  prevY = y;
  smoothScroll.style.transform = `translate3d(0,${-y}px,0)`;

  requestAnimationFrame(loop); // infinity recursion (like scroll event)
}
requestAnimationFrame(loop);*/

function CheckWidthForBlocks() {
    /*  
        Когда блоки history-item заменяются на history-itemMobile, логика функции Blocks ломается, 
        т.к у history-item offsetTop будет равен нулю и класс visible будет ставится не туда и 
        из массива будет удаляться не тот элемент. Чтобы этого избежать, надо удалять классы block у пк-шных
        блоков, если ширина экрана <= 900px. 
    */
   
   let historyItem;
   if (window.innerWidth <= 900) historyItem = document.querySelectorAll('.history-item')
   else historyItem = document.querySelectorAll('.history-itemMobile');

   historyItem.forEach(item => {
    item.classList.remove('block');
});
}
CheckWidthForBlocks();

function NumbersMotion() {
    Array.from(document.getElementsByClassName('awards_info_stats_item_num')).forEach(item => {
        let curr_num = item.getAttribute('data-num'); // end int 
        const motionCoef = 100; // smooth move
        let i = 0;
        let move = setInterval(() => {
            item.innerHTML++;
            i++;
            if (i > +curr_num) clearInterval(move); // in end stop interval
        }, motionCoef);
    });
}


let blocks = Array.from(document.querySelectorAll('.block')); // all big info blocks with same animations

let blocksLightSwitch = blocks;

window.addEventListener("scroll", Blocks);

let lastScrollTop = 0;
function MenuVisibility() {
    let currScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let nav = document.querySelector('.nav');

    if (currScrollTop > lastScrollTop) nav.style.transform = 'translateY(-150%)'
    else if (currScrollTop < lastScrollTop) nav.style.transform = 'translateY(0%)';

    lastScrollTop = currScrollTop <= 0 ? 0 : currScrollTop; // for mobile
    
}

/*
    Не работает анимцая появления у функции Blocks для мобилок. Если ставить класс block для
    history-itemMobile, то не робит ни на пк, ни на мобилке, но появляется на мобилке этот блок. Если
    убрать класс block, то работает всё на пк, кроме этого блока, но ничего не работает на мобиле.
*/

function Blocks() {
    MenuVisibility();
    blocksLightSwitch.forEach(x => {
        if (window.scrollY >= x.offsetTop - window.innerHeight / 2) {
            if (x.dataset.lightswitch == 'true') document.querySelector('.nav_burger').classList.toggle('nav_burger_dark')
            else x.style.background = '#2E2754';
        }
    });
    blocks.forEach(item => {
        if (window.scrollY >= item.offsetTop - window.innerHeight / 2) {   // Какая-то странная дичь с проверкой появления блока в зоне видимости. Непонятно почему item.offsetTop - window.innerHeight работает только с первым блоком. Поэтому подобрал кэфы к каждому блоку, чтобы всё работало. Их добавил в дата-селектор в хтмл.
            if (item.classList.contains('awards')) {
                document.querySelector('.awards_info').style.transform = 'translateX(0%)'; // появление фона у блока в awards
                setTimeout(() => NumbersMotion(), 700); // делаем задержку, чтобы анимация чисел начилась после появления фона
            } 
            item.classList.add('visible'); // добавляем класс с анимациями для элементов
            blocks.splice(0, 1); // удаляем текущий (первый) инфо-блок из списка blocks
        }
    });
}



// 1280x535

let kSlider = 0, paddingSlider = 0;
function SliderScroll(slider) {
   const countSlider = slider.dataset.slider;
   const waySlider = slider.dataset.way;
   function MaxWidthImg() {
    let maxOffSetWidth = 0;
    document.querySelectorAll('.history-item_slider_wrapper_img').forEach(x => {
        maxOffSetWidth = x.offsetWidth > maxOffSetWidth ? x.offsetWidth : maxOffSetWidth;
    })
    return maxOffSetWidth;
   }
   const widthImg = MaxWidthImg();
   let wrapperSlider = document.querySelectorAll('.history-item_slider_wrapper')[countSlider];
   let endSlider = -wrapperSlider.childElementCount + 1;
   let switchesSlider = document.querySelectorAll('.history-item_slider_switches')[countSlider].children;
   let flagSlider;

   if (waySlider == 'right' && kSlider > endSlider) {
    kSlider--; paddingSlider -= 100;
    flagSlider = false;
    for (let i = 0; i < switchesSlider.length; i++) {
        if (flagSlider) {
            switchesSlider[i].classList.toggle('history-item_slider_switches_item_active');
            break;
        }
        if (switchesSlider[i].classList.contains('history-item_slider_switches_item_active')) {
            switchesSlider[i].classList.remove('history-item_slider_switches_item_active');
            flagSlider = true;
        }
    }

   } 
   if (waySlider == 'left' && kSlider != 0) {
    kSlider++; paddingSlider += 100;

    flagSlider = false;
    for (let i = switchesSlider.length - 1; i >= 0; i--) {
        if (flagSlider) {
            switchesSlider[i].classList.toggle('history-item_slider_switches_item_active');
            break;
        }
        if (switchesSlider[i].classList.contains('history-item_slider_switches_item_active')) {
            switchesSlider[i].classList.remove('history-item_slider_switches_item_active');
            flagSlider = true;
        }
    }
   } 

   wrapperSlider.style.transform = `translate3d(${widthImg*kSlider + paddingSlider}px, 0px, 0px)`;
}
document.querySelectorAll('.arrow').forEach((item) => item.addEventListener('click', () =>  SliderScroll(item)));
