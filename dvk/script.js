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

const smoothCoef = 0.05; // transition of scroll
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
requestAnimationFrame(loop);

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

function CheckPosition(curr, end) {
    return curr >= end ? true : false; 
}

let blocks = Array.from(document.querySelectorAll('.block')); // all big info blocks with same animations

window.addEventListener("scroll", Blocks);
function Blocks() {
    blocks.forEach(item => {
        if (CheckPosition(window.scrollY, item.offsetTop - window.innerHeight*item.dataset.heightcoef)) {   // Какая-то странная дичь с проверкой появления блока в зоне видимости. Непонятно почему item.offsetTop - window.innerHeight работает только с первым блоком. Поэтому подобрал кэфы к каждому блоку, чтобы всё работало. Их добавил в дата-селектор в хтмл.
            if (item.classList.contains('awards')) {
                document.querySelector('.awards_info').style.transform = 'translateX(0%)'; // появление фона у блока в awards
                setTimeout(() => NumbersMotion(), 700); // делаем задержку, чтобы анимация чисел начилась после появления фона
            } 
            item.classList.add('visible'); // добавляем класс с анимациями для элементов
            blocks.splice(0, 1); // удаляем текущий (первый) инфо-блок из списка blocks
        }
    });
}


