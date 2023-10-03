function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

let words = ["яркий", "умный", "трудолюбивый", "занятой", "вежливый", "тихий", "дружелюбный", "радостный", "активный", "серьёзный", "мудрый", "спокойный", "справедливый", "щедрый", "добродушный", "любопытный", "специализированный", "быть в хорошем настроении", "держать обещания", "чувственный", "самомотивированный", "грубый", "глупый", "гордый", "ленивый", "нервный", "мрачный", "стеснительный", "нечестный", "нервный", "злой", "расслабленный", "жестокий", "нетерпеливый", "подлый", "скупой", "манипулирующий", "агрессивный", "любит поспорить", "упрямый", "вспыльчивый", "скрытный", "угрюмый", "без настроения", "хорошо воспитанный", "ответственный", "общительный", "социальный", "разговорчивый", "юморной", "честный", "дружелюбный", "мужество", "заботливый о ком-то", "отзывчивый", "преданный", "скромный", "целеустремлённый", "аналитический", "кооперативный", "уверенный", "конкурентный", "открытый для людей", "достоенный доверия", "нервный", "безответственный", "болтун", "косноязычный", "рассеяный", "нечестный", "врать", "быть в плохом настроении", "трус", "страх", "гордый", "бессердечный", "любит управлять", "высокомерный", "тщеславный", "неуверенный", "узкомыслящий"];
let answers = ["bright", "clever", "hardworking", "busy", "polite", "quiet", "friendly", "cheerful", "active", "serious", "wise", "patient", "fair", "generous", "kind-hearted", "curious", "dedicated", "to be in good mood", "to keep promises", "sensible", "self-motivated", "rude", "big-headed", "proud of oneself", "lazy", "jumpy", "gloomy", "shy", "unfair", "nervous", "wicked", "to put one`s feet up", "cruel", "impatient", "sneaky", "mean", "manipulative", "aggressive", "argumentative", "stubborn", "hot-tempered", "cage", "grumpy", "moody", "well-behaved", "responsible", "sociable", "a good mixer", "talkative", "witty", "honest", "friendly", "courage", "attentive to somebody", "considerate", "loyal", "modest", "ambitious", "analytical", "cooperative", "confident", "competitive", "open-minded", "trustworthy","jumpy","irresponsible","a chatter-box","tongue-tied","absent-minded","dishonest","to lie","to feel blue","a coward","fear","selfish","heartless","bossy","condescending", "vain","unassertive","narrow-minded"];

const index = randomInteger(0, words.length);
let word = document.querySelector('.word');
let reload = document.querySelector('.reload');
let main = document.querySelector('.main');

word.innerHTML = words[index];


setTimeout(function check() {
    const answer = prompt("Ответ");

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

