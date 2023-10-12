function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

let answers = ["speech", "suddenly", "to convince", "loop", "awful", "gradually", "desire", "frailed off", "thin", "therefore", "attached", "proceed", "obvious", "crisp", "anxious", "necessary", "blow", "thieve", "riddle" ];
let words = ["речь", "внезапно", "убеждать", "петля", "ужасный", "постепенно", "страсть", "умолк", "худой", "следовательно", "привязанный", "продолжить",  "очевидно", "чёткий", "обеспокоен", "необходимый", "дуть",  "вор", "загадка"];

const index = randomInteger(0, words.length);
let word = document.querySelector('.word');
let reload = document.querySelector('.reload');
let main = document.querySelector('.main');

word.innerHTML = words[index];


setTimeout(function check() {
    const answer = prompt(words[index]);

    if (answer.toLowerCase() == answers[index]) {
        main.classList.add('good');
        main.classList.remove('bad');
        setTimeout(() => location.reload(), 1000); 
    }
    else {
        main.classList.add('bad');
        main.classList.remove('good');
        setTimeout(() => check(), 1000);
    } 
}, 300);


reload.addEventListener('click', () => location.reload());

