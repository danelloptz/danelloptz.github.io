// drop to files
$('.btn--group--last').click(function() {
    $(location).attr('href','last_season.html');
});
$('.btn--group--curr').click(function() {
    $(location).attr('href','curr_season.html');
});

// navigation
$('.nav--stat').click(function() {
    $('.games').css('display', 'none');
    $('.games--stat').css('display', 'flex');
});

$('.nav--games').click(function() {
    $('.games').css('display', 'flex');
    $('.games--stat').css('display', 'none');
});

// modal stat

$('.games--stat--wrapper--line').click(function(el) {
    let modal = $(this).attr('aria-value');
    let id = $(this).attr('aria-name');
    let file_name;
    if ($(location)[0].pathname.indexOf('last') != -1) { file_name = 'last'; }
    else { file_name = 'curr'; }
    $(location).attr('href',`${file_name}_season.html#${id}`);
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
    }
    else { 
        file_name = 'curr'; 
    }
    $(location).attr('href',`${file_name}_season.html#${match_name}`);
    $(`.games--stat--wrapper:eq(${number})`).css('display', 'flex');
    $(`.games--stat--date:eq(${number})`).attr('aria-checked', '1').text('Закрыть статистику');
});