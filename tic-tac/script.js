let x = []; let o = []; let checkX = []; let checkY = []; let zz; let i = 0; let j = 0; let p = 0; let z; let k = 2; let ch, a; let rez = 0;  let rezChek = 0; let sum = 0; let sum1 = 0;
let arr = [ // массив, где хранятся варианты победы у крестиков
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  let arr1 = [ // массив, где хранятся варианты победы у ноликов
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
for (z = 0; z < 9; z++) checkX[z] = 0; // заполняем массивы нулями
for (z = 0; z < 9; z++) checkY[z] = 0;
/* Функция, которая находит ячейку на поле, где нет ни крестика, ни нолика.
Изначально у каждой клетки стоит value равный её порядковому номеру, так мы узнаём позицию ячейки, куда надо поставить
крестик или нолик.
*/
function Rand() {
    do {
        ch = Math.random(); // получаем рандомное число в диапазоне [0;1)
        ch = ch * 10; 
        ch = Math.trunc(ch); // берём только первое число после запятой и отбрасываем остальную часть
        if (ch == 0) ch += 1; // если получаем 0, то просто прибавляем 1, т.к ячейки нумеруются от 1 до 9
        for (i = 0; i < 9; i++) {
            if ((ch == x[i]) || (ch == o[i])) { // проверяем, есть ли на поле ячейка с номером сгенерированного числа
                k = 0;
                break; // если есть, то цикл обрывается и число ищется заново
            } else {k = 1;}
        }
        if (k == 1) break; // проверяем на уникальность
    }
    while (ch > 0); // бесконечный цикл, из которого можно выйти только найдя необходимое число
}
/* Костыльная функция проверки победы на поле. Всего существует 8 случаев победы для крестиков и 8 случаев победы
для ноликов. Например: 123, 456, 789 и т.д. В основной фун-ии после нажатия для постановки крестика в массив x[] записывается
номер этой ячейки. Аналогично после постановки нолика, в массив o[] записывается номер этой ячейки. Эта функция вызывается
после каждой постановки крестика или нолика. Она проверяет какие числа есть на поле и при наличии их пишет значение 1 в определённый массив
Для наглядности: 
arr[
   0 [0, 0, 0] этот массив отведён под значения победы 1, 2, 3
   1 [0, 0, 0] 4, 5, 6
   2 [0, 0, 0] 7, 8, 9
   3 [0, 0, 0] 1, 4, 7
   4 [0, 0, 0] 2, 5, 8
   5 [0, 0, 0] 3, 6, 9
   6 [0, 0, 0] 1, 5, 9
   7 [0, 0, 0] 3, 5, 7
]
Если я нажимаю на ячейку 1, то в массив 0 под номером 0 пишется значение 1, в массив 3 под номером 0 пишется значение 1,
в массив 6 под номером 0 пишется значение 1. Т.е 1 обозначает, что эта ячейка на поле занята, 0 - свободна. 
И когда сумма такого массива становится равна 3, то крестики/нолики побеждают.
*/
function Check() { 
    for (p = 0; p < 9; p++) {
       if (x[p] == 1) {
        arr[0][0] = 1;
        arr[3][0] = 1;
        arr[6][0] = 1;
       }
       if (x[p] == 2) {
        arr[0][1] = 1;
        arr[4][0] = 1;
       }
       if (x[p] == 3) {
        arr[0][2] = 1;
        arr[5][0] = 1;
        arr[7][0] = 1;
       }
       if (x[p] == 4) {
        arr[1][0] = 1;
        arr[3][1] = 1;
       }
       if (x[p] == 5) {
        arr[1][1] = 1;
        arr[4][1] = 1;
        arr[6][1] = 1;
        arr[7][1] = 1;
       }
       if (x[p] == 6) {
        arr[1][2] = 1;
        arr[5][1] = 1;
       }
       if (x[p] == 7) {
        arr[2][0] = 1;
        arr[3][2] = 1;
        arr[7][2] = 1;
       }
       if (x[p] == 8) {
        arr[2][1] = 1;
        arr[4][2] = 1;
       }
       if (x[p] == 9) {
        arr[2][2] = 1;
        arr[5][2] = 1;
        arr[6][2] = 1;
       }
       //
       if (o[p] == 1) {
        arr1[0][0] = 1;
        arr1[3][0] = 1;
        arr1[6][0] = 1;
       }
       if (o[p] == 2) {
        arr1[0][1] = 1;
        arr1[4][0] = 1;
       }
       if (o[p] == 3) {
        arr1[0][2] = 1;
        arr1[5][0] = 1;
        arr1[7][0] = 1;
       }
       if (o[p] == 4) {
        arr1[1][0] = 1;
        arr1[3][1] = 1;
       }
       if (o[p] == 5) {
        arr1[1][1] = 1;
        arr1[4][1] = 1;
        arr1[6][1] = 1;
        arr1[7][1] = 1;
       }
       if (o[p] == 6) {
        arr1[1][2] = 1;
        arr1[5][1] = 1;
       }
       if (o[p] == 7) {
        arr1[2][0] = 1;
        arr1[3][2] = 1;
        arr1[7][2] = 1;
       }
       if (o[p] == 8) {
        arr1[2][1] = 1;
        arr1[4][2] = 1;
       }
       if (o[p] == 9) {
        arr1[2][2] = 1;
        arr1[5][2] = 1;
        arr1[6][2] = 1;
       }
    }
    // проверка на наличие победы
    for (p = 0; p < 8; p++) {
        for (z = 0; z < 3; z++) {
            sum += arr[p][z];
            sum1 += arr1[p][z];
        }
        if (sum == 3) { // победа крестиков
            rezChek = 1;
            break;
        }
        if (sum1 == 3) { // победа ноликов
            rezChek = 2;
            break;
        }
        sum = 0; sum1 = 0; // обнуляем сумму, если никто не выиграл
    }
    sum = 0; sum1 = 0;  // обнуляем сумму, если никто не выиграл
}
function A() {
    let buckets = document.querySelectorAll('.buckets'); // элемент с всеми ячейками на поле
    buckets.forEach(buckets => {
        buckets.addEventListener('click', () => { // "слушаем" нажатия на ячейки поля
            x[j] = buckets.value; // записываем номер нажатой ячейки
            buckets.value = 'X';
            buckets.style.color = 'black'; // изначально цвет был белый, т.к. там были номера ячейки
            Check(); // проверяем нет ли победы у крестиков
            if (rezChek == 1) alert('Победа!!!'); // если возвращается 1, то победа
            if ((j == 4) && (rezChek != 1) && (rezChek != 2)) alert('Ничья!'); // на 5 ходе остаётся 1 ячейка, поэтому проверяем на ничью
            if ((rezChek != 1) && (rezChek != 2)) { // если никто не выиграл, то ставим нолик
                if (j != 4) { // на 5 ходе нельзя ставить нолик, ибо поле кончается и происходит зацикливание
                    let bucketsNew = document.querySelectorAll('.buckets'); // создаём новый елемент, чтобы запусить ещё один forEach
                    Rand(); // получаем число из фун-ии Rand()
                    bucketsNew.forEach(bucketsNew => { // forEach проходит по каждой ячейке поля и проверяет её номер с номером полученным из фун-ии Rand()
                        if (bucketsNew.value == ch) { // находим нужную ячейку
                            o[j] = bucketsNew.value; // запоминае её номер
                            bucketsNew.value = 'O';
                            bucketsNew.style.color = 'black';
                        }
                    });
                    j++; // следующий ход
                }
            }
            Check(); // проверяем нет ли победы
            if (rezChek == 2) alert('Проиграл!!!'); // проверяем победу ноликов
            //Rand();
        });
    });
}
A();
