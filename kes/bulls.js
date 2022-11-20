// drop to files
$('.btn--group--last').click(function() {
    $(location).attr('href','last_season.html');
});
$('.btn--group--curr').click(function() {
    $(location).attr('href','index.html');
});

// navigation
$('.nav--stat, .hidden--modal--stat').click(function() {
    $('.games, .best, .seasons, .hidden--modal').css('display', 'none');
    $('.games--stat').css('display', 'flex');
    $('.nav--games, .nav--players, .nav--seasons, .hidden--modal--games, .hidden--modal--players, .hidden--modal--seasons').removeClass('active');
    $(this).addClass('active');
    $('.hidden--modal').css('display', 'none').attr('aria-checked', '0'); 
    $('.hidden--menu--line:eq(0)').css('transform', 'rotate(0deg)');
    $('.hidden--menu--line:eq(1)').css('transform', 'rotate(0deg)');
    $('.hidden--menu').css('top', '20px');
    $('html').css('overflow', $('html').data('previous-overflow'));
});

$('.nav--games, .hidden--modal--games').click(function() {
    $('.games').css('display', 'flex');
    $('.games--stat, .best, .seasons, .hidden--modal').css('display', 'none');
    $('.nav--stat, .nav--players, .nav--seasons, .hidden--modal--stat, .hidden--modal--players, .hidden--modal--seasons').removeClass('active');
    $(this).addClass('active');
    $('.hidden--modal').css('display', 'none').attr('aria-checked', '0'); 
    $('.hidden--menu--line:eq(0)').css('transform', 'rotate(0deg)');
    $('.hidden--menu--line:eq(1)').css('transform', 'rotate(0deg)');
    $('.hidden--menu').css('top', '20px');
    $('html').css('overflow', $('html').data('previous-overflow'));
});

$('.nav--players, .hidden--modal--players').click(function() {
    $('.best').css('display', 'block');
    $('.games--stat, .games, .seasons, .hidden--modal').css('display', 'none');
    $('.nav--games, .nav--stat, .nav--seasons, .hidden--modal--games, .hidden--modal--stat, .hidden--modal--seasons').removeClass('active');
    $(this).addClass('active');
    $('.hidden--modal').css('display', 'none').attr('aria-checked', '0'); 
    $('.hidden--menu--line:eq(0)').css('transform', 'rotate(0deg)');
    $('.hidden--menu--line:eq(1)').css('transform', 'rotate(0deg)');
    $('.hidden--menu').css('top', '20px');
    $('html').css('overflow', $('html').data('previous-overflow'));
});

$('.nav--seasons, .hidden--modal--seasons').click(function() {
    $('.seasons').css('display', 'block');
    $('.games--stat, .games, .best, .hidden--modal').css('display', 'none');
    $('.nav--games, .nav--stat, .nav--players, .hidden--modal--games, .hidden--modal--stat, .hidden--modal--players').removeClass('active');
    $(this).addClass('active');
    $('.hidden--modal').css('display', 'none').attr('aria-checked', '0'); 
    $('.hidden--menu--line:eq(0)').css('transform', 'rotate(0deg)');
    $('.hidden--menu--line:eq(1)').css('transform', 'rotate(0deg)');
    $('.hidden--menu').css('top', '20px');
    $('html').css('overflow', $('html').data('previous-overflow'));
});

// modal stat

$('.games--stat--wrapper--line').click(function(el) {
    let modal = $(this).attr('aria-value');
    let id = $(this).attr('aria-name');
    let file_name;
    if ($(location)[0].pathname.indexOf('last') != -1) { 
        file_name = 'last';
        $(location).attr('href',`${file_name}_season.html#${id}`); 
    }
    else { 
        file_name = 'index'; 
        $(location).attr('href',`${file_name}.html#${id}`);
    }
    setTimeout(() => {
        $('html').data('scroll-position', $(this).offset().top).data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden'); // выключаем прокрутку
    }, 100);
    $(`.stat--modal:eq(${modal})`).css('display', 'block');
    $('.stat--modal--close').click(function() {
        $(`.stat--modal:eq(${modal})`).css('display', 'none');
        $('html').css('overflow', $('html').data('previous-overflow')); // включаем прокрутку
    });
});

// open and close stat

$('.games--stat--date').click(function() {
    let number = $(this).attr('aria-number');
    let checked = $(this).attr('aria-checked');
    if (checked == 0) { 
        $(`.games--stat--wrapper:eq(${number})`).css('display', 'flex');
        $(this).attr('aria-checked', '1');
        $(this).text('Закрыть статистику');
    }
    else { 
        $(`.games--stat--wrapper:eq(${number})`).css('display', 'none');
        $(this).attr('aria-checked', '0'); 
        $(this).text('Показать статистику');
    }
});

// drop to match stat

$('.wrapper--card').click(function() {
    let file_name;
    let match_name = $(this).attr('aria-value');
    let number = $(this).attr('aria-number');

    $('.games').css('display', 'none');
    $('.games--stat').css('display', 'flex');
    if ($(location)[0].pathname.indexOf('last') != -1) { 
        file_name = 'last';
        $(location).attr('href',`${file_name}_season.html#${match_name}`);
    }
    else { 
        file_name = 'index'; 
        $(location).attr('href',`${file_name}.html#${match_name}`);
    }
    $('.nav--games, .nav--players, .nav--seasons').removeClass('active');
    $('.nav--stat').addClass('active');
    $(`.games--stat--wrapper:eq(${number})`).css('display', 'flex');
    $(`.games--stat--date:eq(${number})`).attr('aria-checked', '1').text('Закрыть статистику');
});

// hidden menu

let scrollPlace;
$('.hidden--menu').click(function(el) {
    if ($('.hidden--modal').attr('aria-checked') == 0) { 
        scrollPlace = el.originalEvent.pageY;
        window.scrollTo(0, 0);
        $('.hidden--modal').css('display', 'flex').attr('aria-checked', '1');
        $('.hidden--menu--line:eq(0)').css('transform', 'rotate(45deg)');
        $('.hidden--menu--line:eq(1)').css('transform', 'rotate(-45deg) translate(4px, -4px)');
        $('.hidden--menu').css('top', '50px');
        setTimeout(() => {$('html').data('previous-overflow', $('html').css('overflow')).css('overflow', 'hidden');}, 200);
    }
    else { 
        $('html').css('overflow', $('html').data('previous-overflow'));
        window.scrollTo(0, scrollPlace);
        $('.hidden--modal').css('display', 'none').attr('aria-checked', '0'); 
        $('.hidden--menu--line:eq(0)').css('transform', 'rotate(0deg)');
        $('.hidden--menu--line:eq(1)').css('transform', 'rotate(0deg)');
        $('.hidden--menu').css('top', '20px');
    }
    
});

//hidden menu animation 

$(document).on('wheel', function(move) {
    if (move.originalEvent.wheelDelta >= 0) {
        $('.hidden--menu').css('transform', 'translateY(0px)');
    } else {
        $('.hidden--menu').css('transform', 'translateY(-50px)');
    }
})