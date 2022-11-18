// drop to files
$('.btn--group--last').click(function() {
    $(location).attr('href','last_season.html');
});
$('.btn--group--curr').click(function() {
    $(location).attr('href','index.html');
});

// navigation
$('.nav--stat').click(function() {
    $('.games, .best, .seasons').css('display', 'none');
    $('.games--stat').css('display', 'flex');
    $('.nav--games, .nav--players, .nav--seasons').removeClass('active');
    $(this).addClass('active');
});

$('.nav--games').click(function() {
    $('.games').css('display', 'flex');
    $('.games--stat, .best, .seasons').css('display', 'none');
    $('.nav--stat, .nav--players, .nav--seasons').removeClass('active');
    $(this).addClass('active');
});

$('.nav--players').click(function() {
    $('.best').css('display', 'block');
    $('.games--stat, .games, .seasons').css('display', 'none');
    $('.nav--games, .nav--stat, .nav--seasons').removeClass('active');
    $(this).addClass('active');
});

$('.nav--seasons').click(function() {
    $('.seasons').css('display', 'block');
    $('.games--stat, .games, .best').css('display', 'none');
    $('.nav--games, .nav--stat, .nav--players').removeClass('active');
    $(this).addClass('active');
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
    }, 500);
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