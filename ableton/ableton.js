let count = 1;
$('#svg-minus').hide();
$('#svg-minus-sm').hide();
$('#rutube-video').hide();
$('#nav-sign-sm').hide().css('justify-content', 'flex-start');

if ($(document).width() <= 457) {
    $('#nav-sign').hide();
    $('#nav-sign-sm').show();
}
$(window).resize(function() {
    if ($(document).width() <= 457) {
        $('#nav-sign').hide();
    } else {
        $('#nav-sign').show();
    }
});
$('#more').on('click', function() {
    if (count % 2 != 0) {
        $('#nav-hide').css('display', 'flex');
        $('#svg-plus').hide();
        $('#svg-minus').show();
    } else {
        $('#nav-hide').css('display', 'none');
        $('#svg-plus').show();
        $('#svg-minus').hide();
    }
    count++;
});
$('#menu-sm').on('click', function() {
    if (count % 2 != 0) {
        $('#nav-hide').css('display', 'flex');
        $('#svg-plus-sm').hide();
        $('#svg-minus-sm').show();
    } else {
        $('#nav-hide').css('display', 'none');
        $('#svg-plus-sm').show();
        $('#svg-minus-sm').hide();
    }
    count++;
});

$('.main-nav-text').on('click', function() {
    for (let i = 0; i < $('.main-nav-text').length; i++) {
        if ($('.main-nav-text')[i].ariaChecked) {
            $('.main-nav-text')[i].className = 'main-nav-text';
            $('.main-nav-text')[i].ariaChecked = false;
        }
    }
    $(this).addClass('main-nav-text-active');
    $(this)[0].ariaChecked = true;
});

$('#preview').on('click', function() {
    $('#rutube-video').show();
    $('#preview').hide();
});

$(window).scroll(function() {
    $('.lazy-load').each(function() {
        if ($(window).scrollTop() + $(window).height() * 1.5 > $(this).offset().top)  {
            if ($(this).attr('data-src')) {
                $(this).attr('src', `${$(this).attr('data-src')}`);
                $(this).removeAttr('data-src');
            }
        }
    });
});