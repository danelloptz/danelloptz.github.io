function CreateData() {
    for (let j = 0; j < $('.sm-img').length; j++) {
        $('.number')[j].innerHTML = j;
        $('.sm-img')[j].innerHTML = `<img src="img/${j}.jpg" width="70px" height="40px">`;
        $('.name-img')[j].innerHTML = `${j}.jpg`;
        //if (!($('.image')[j].className.includes('active'))) {}
        if (j != 5) $('#circles-wrapper').append($('<div class="circle"></div>'));
    }
}
CreateData();

$('.side').on('click', function() {
    if ($(this)[0].className.indexOf('first') != -1) {
            for (let i = 0; i < 7; i++) {
                if (($('#wrapper').css('background').includes(i + '.jpg')) && (i != 0)) {
                    $('#wrapper').css('background', `url('img/${i-1}.jpg')`).css('background-size', 'cover');
                    $('.photo')[i].className = 'photo';
                    $('.photo')[i-1].className = 'photo active';
                    $('.circle')[i].className = 'circle';
                    $('.circle')[i-1].className = 'circle active';
                    break;
                }
                /*if ( ($('.image')[i].className.includes('active')) && (i != 0) ) {
                    $('.image')[i].className = 'image';
                    $('.image')[i-1].className = 'image active';
                    $('.photo')[i].className = 'photo';
                    $('.photo')[i-1].className = 'photo active';
                    $('.circle')[i].className = 'circle';
                    $('.circle')[i-1].className = 'circle active';
                    break;
                }*/
            }
    } else {
        for (let i = 0; i < 7; i++) {
            if (($('#wrapper').css('background').includes(i + '.jpg')) && (i != 6)) {
                $('#wrapper').css('background', `url('img/${i+1}.jpg')`).css('background-size', 'cover');
                $('.photo')[i].className = 'photo';
                $('.photo')[i+1].className = 'photo active';
                $('.circle')[i].className = 'circle';
                $('.circle')[i+1].className = 'circle active';
                break;
            }
            /*if ( ($('.image')[i].className.includes('active')) && (i != 6) ) {
                $('.image')[i].className = 'image';
                $('.image')[i+1].className = 'image active';
                $('.photo')[i].className = 'photo';
                $('.photo')[i+1].className = 'photo active';
                $('.circle')[i].className = 'circle';
                $('.circle')[i+1].className = 'circle active';
                break;
            }*/
        }
    }
});

$('.close').on('click', function() {
    let val = $(this)[0].dataset.value;
    $('.photo')[val].remove();
    $('.circle')[val].remove();
    for (let k = val; k < $('.photo').length; k++) {
        $('.number')[k].innerHTML = Number($('.number')[k].innerHTML) - 1;
        $('.photo')[k].dataset.value = Number($('.photo')[k].dataset.value) - 1;
        $('.close')[k].dataset.value = Number($('.close')[k].dataset.value) - 1;
    }
    $()
});
