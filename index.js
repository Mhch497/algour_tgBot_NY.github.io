let tg = window.Telegram.WebApp;

//let btnstart = document.querySelector('.start')
//start_text = document.querySelectorAll('.start_text')
//console.log(start_text)
//function start_test(){
//  for (var elem = 0; elem < start_text.lenght; elem++) {
//    console.log('ertyuj')
//    start_text[elem].style.display = 'none';
//  }
//}
//
function scrollDown() {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
}
//btnstart.addEventListener('click', scrollDown)
//console.log('dth')
//
//
//
//document.querySelector('.arrow_div').addEventListener('click', scrollDown)


const titles = document.querySelectorAll('.slider p');
console.log(titles);
let currentIndex = 0;
let btn_start = document.querySelector('.btn.start')

function showTitle(index) {
    titles[currentIndex].classList.remove('active');
    titles[index].classList.add('active');
    currentIndex = index;
    console.log(currentIndex)
    if (currentIndex == titles.length - 1) {
        btn_start.classList.add('active');
        next.classList.remove('active');
        prev.classList.add('active');
    } else if (currentIndex == 0) {
        prev.classList.remove('active');
        next.classList.add('active');
    } else {
        btn_start.classList.remove('active');
        next.classList.add('active');
        prev.classList.add('active');
    }
}
let prev = document.querySelector('.prev')
let next = document.querySelector('.next')
showTitle(currentIndex);
prev.addEventListener('click', function () {
    //    if (event.target.classList.contains('prev')) {
    let index = currentIndex - 1;
    if (index < 0) {
        index = titles.length - 1;
    }
    showTitle(index);
});
//    else if (event.target.classList.contains('next')) {
next.addEventListener('click', function () {
    let index = currentIndex + 1;
    if (index >= titles.length) {
        index = 0;
    }
    showTitle(index);
});


class Question {
    constructor(question, right_answer, wrong1, wrong2, wrong3) {
        this.question = question
        this.right_answer = right_answer
        this.wrong1 = wrong1
        this.wrong2 = wrong2
        this.wrong3 = wrong3
    }
}

function shuffle(array) {
    array = [].slice.call(array);
    array.sort(() => Math.random() - 0.5);
    return array
}

let q_number = 0
let cur_result = 0
let cur_question
let ans_buttons = document.querySelectorAll('.answer')
let question = document.querySelector('.question')
let right_ans = document.querySelector('.right_ans')
let question_block = document.querySelector('.question_block')
let btn_next = document.querySelector('.btn_next')
let q_result_block = document.querySelector('.q_result_block')
let result_block = document.querySelector('.result_block')
let q_result = document.querySelector('.q_result')
let question_number = document.querySelector('.question_number')
let header = document.querySelector('header')
//let cur_score = document.querySelector('.cur_score')
//let result_score = document.querySelector('.result_score')
function ask(q) {
    //    console.log(ans_buttons)
    //    ans_buttons = shuffle(ans_buttons)
    //    console.log(ans_buttons)

    cur_question = q
    question_number.innerHTML = 'ВОПРОС ' + (q_number + 1)
    let answers_list = [q.right_answer, q.wrong1, q.wrong2, q.wrong3]
    console.log(answers_list)
    answers_list = shuffle(answers_list)
    console.log(answers_list)
    for (let i = 0; i < answers_list.length; i++) {
        ans_buttons[i].innerHTML = answers_list[i]
    }


    //    тут должен быть код для места, где будет вопрос
    question.innerHTML = q.question
    right_ans.innerHTML = q.right_answer
    show_question()
}

function show_question() {
    q_result_block.style.display = 'none'
    result_block.style.display = 'none'
    question_block.style.display = 'block'
}

function show_result() {
    q_result_block.style.display = 'flex'
    question_block.style.display = 'none'
    result_block.style.display = 'none'
}

function show_correct(res) {
    q_result.innerHTML = res
    //    cur_score.innerHTML = cur_result
    console.log(ans_buttons[0])
    if (q_number >= 28) {
        btn_next.value = 'ЗАВЕРШИТЬ'
    }

    show_result()

}

function next_question() {
    console.log(questions_list[q_number])
    ask(questions_list[q_number])
    q_number += 1
}
btn_start.addEventListener('click', function () {
    btn_start.classList.remove('active');

    next_question()
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    header.style.display = 'none'
})

function finish_test() {
    q_result_block.style.display = 'none'
    question_block.style.display = 'none'
    result_block.style.display = 'block'

}

function check_answer(answer) {
    console.log(answer)
    console.log(cur_question.right_answer)
    if (answer == cur_question.right_answer) {
        cur_result += 1
        show_correct("Верно")
        tg.sendData("Верно");

    } else {
        show_correct("Неверно")
        tg.sendData("Неверно");

    }
}

btn_next.addEventListener('click', function () {
    if (q_number >= 28) {
        //        result_score = cur_result
        finish_test()
    } else {
        next_question()
    }
})

for (let i = 0; i < 4; i++) {
    ans_buttons[i].addEventListener('click', function () {
        check_answer(ans_buttons[i].innerHTML)

    })

}




let questions_list = []
questions_list.push(new Question('Как называется язык разметки гипертекста?', 'HTML', 'CSS', 'Java Script', 'XML'))
questions_list.push(new Question('Как называются каскадные таблицы стилей?', 'CSS', 'HTML', 'Java Script', 'XML'))
// questions_list.push(new Question('Как называется конструктор сайтов, который мы изучали?', 'Тильда', 'Фигма', 'Тигма', 'Фильда'))
// questions_list.push(new Question('Как называется человек, который пишет тексты для сайта?', 'Копирайтер', 'Копипастер', 'Сценарист', 'Верстальщик'))
// questions_list.push(new Question('Что такое лендинг?', 'Одностраничный сайт', 'Многостраничный сайт', 'Конструктор сайтов', 'Измеритель длины'))
questions_list.push(new Question('<pre>Что пропущено?\n&lt;img ___="/uploads/Cats.jpg/"&gt;</pre>', 'src', 'scr', 'href', 'herf'))
questions_list.push(new Question('Что пропущено?\n&lt;__ href="http://ru.sport-wiki.org/"&gt; \nПодробнее об игре &lt;/__&gt;', 'a', 'p', 'div', 'img'))
questions_list.push(new Question('Какого тега не существует?', 'h', 'h3', 'h1', 'p'))
questions_list.push(new Question('Какой тег создает строку таблицы?', 'tr', 'td', 'th', 'tp'))
questions_list.push(new Question('style, href, src, width, height - что это за слова?', 'Атрибуты', 'Ссылки', 'Теги', 'Классы'))
questions_list.push(new Question('Какое свойство необходимо указать тегу table, чтобы границы не были двойными?', 'border-collapse:collapse', 'border-collapse:separate', 'border:collapse', 'border-count: one'))
questions_list.push(new Question('Какое свойство использовать, чтобы разместить текст по центру?', 'text-align', 'font-size', 'background-color', 'text-alignment'))
// questions_list.push(new Question('Любая информация, размещённая в Интернете называется...', 'Контент', 'Сайт','Текст', 'персональной'))
// questions_list.push(new Question('Как называются части, которыми передаются данные между сервером и клиентом?', 'Пакеты','Отрезы','Конверты','Куски'))
questions_list.push(new Question('Какой сайт использует безопасную передачу данных?', 'https://www.film.ru/', 'http://cat-love.tilda.ws/page118.html', 'http://cat-love.tilda.ws/', 'http://www.ivi.ru/'))
// questions_list.push(new Question('Что НЕЛЬЗЯ изменить у блока на Tilda?', 'Ширину', 'Высоту', 'Содержание', 'Оформление'))
questions_list.push(new Question('Три базовых цвета, из которых компьютер получает все остальные?', 'Красный, зелёный, синий', 'Красный, зелёный, белый', 'Белый, синий, красный', 'Жёлтый, зелёный, синий'))
// questions_list.push(new Question('Где хранятся уже просмотренные в браузере видео, страницы, картинки?', 'Кэш', 'Куш', 'Нигде', 'Куки'))
// questions_list.push(new Question('Где хранятся логин и пароль, информация о просмотренных товарах и тд?', 'Куки', 'Кэш', 'Нигде', 'История'))
questions_list.push(new Question('Количество пикселей, которые могут поместиться на экране по ширине и высоте это', 'Разрешение экрана', 'Расширение экрана', 'Положение экрана', 'Разметка'))
// questions_list.push(new Question('Какое изображение содержит пиксели?', 'Растровое', 'Векторное', 'Цветное', 'Линейное'))
// questions_list.push(new Question('Что из этого доменная зона?', 'com', 'https', '/decor', '/domen'))
questions_list.push(new Question('Как еще называют меню?', 'Навигация', 'Геолокация', 'Шапка', 'Подвал'))
questions_list.push(new Question('Какой тег НЕ пишется внутри тега body?', 'head', 'header', 'main', 'footer'))
// questions_list.push(new Question('Как пишется контекстный селектор?', 'footer a ', 'p,img', 'img', 'footer'))
questions_list.push(new Question('Как сделать внешний отступ?', 'margin', 'padding', 'text-decoration', 'border-radius'))
questions_list.push(new Question('Как называется правило применения браузером стилей к объектам?', 'Каскад', 'Водопад', 'Фонтан', 'Фейерверк'))
questions_list.push(new Question('У какого селектора самый высокий приоритет?', 'По классу', 'По тегу', 'У контекстного', 'По идентификатору'))
questions_list.push(new Question('Что свойственно для span?', 'Это строчный элемент', 'Это блочный элемент', 'Занимает 100% ширины', 'Можно задать ширину и высоту'))
questions_list.push(new Question('Какое значение свойства position располагает объект относительно родителя?', 'relative', 'static', 'absolute', 'parental'))
questions_list.push(new Question('hover - это?', 'псевдокласс', 'css_селектор', 'html-тег', 'подкласс'))
questions_list.push(new Question('Flexbox в CSS ― это способ...', 'расстановки элементов внутри контейнера', 'группировки HTML-элементов', 'деления веб-страницы на фрагменты', 'изменения внешнего вида элемента'))
questions_list.push(new Question('Фигма - это?', 'графический редактор', 'среда разработки', 'сток фотографий', 'конструктор сайтов'))
questions_list.push(new Question('Что создает этот тег? <input type="checkbox">', 'поле выбора с квадратом', 'поле выбора с кружком', 'поле ввода чека', 'поле ввода номера'))
questions_list.push(new Question('Правильный вариант создания переменной', 'let x = 10', 'let s 5', 'a = ‘Алгоритмика’', 'let 5 = 20 * 7 + "3"'))
questions_list.push(new Question('Что будет в результате: "6" + 9', '"69"', '69', '15', '"15"'))
questions_list.push(new Question('Кто родитель .navigator', 'BOM', 'DOM', 'COM', 'document'))
questions_list.push(new Question('Что будет в результате: "6" + 9', 'setTimeout(func, 500)', 'func.setTimeout(500)', 'setTimeout(500, func)', 'setTimeout(func(), 500)'))
questions_list.push(new Question('Класс в программировании — это', 'Описание сущности', 'Объект', 'Разделение в школе', 'Функция'))
questions_list.push(new Question('Ключевые кадры задаются с помощью конструкции', '@keyframes { ... }', '@translate { ... }', '@transform { ... }', '@keyvrames { ... }'))
questions_list.push(new Question('Promise в программировании - это объект, который', 'следит за состоянием асинхронной функции, ', 'следит за состоянием синхронной функции', 'хранит возвращаемое значение', 'следит за состоянием любой функции'))














// tg.initData - получение данных от пользователя как строку 
// tg.initDataUnsafe - получение данных от пользователя как объект
// tg.isExpanded - проверяет открыто ли мини-приложение полностью по высоте (true/false)
// tg.sendData(data) - отправка данных из приложения (в нашем случае из полей input)
// tg.expand() - растянет окно во всю высоту
// tg.close() - закрытие приложения

// Вот примеры как получать данные пользователя с помощью объекта tg:

// tg.initDataUnsafe.user.username - получение username

// tg.initDataUnsafe.user.first_name - получение first_name юзера

// Важно отметить, что такие параметры как initData и initDataUnsafe работают, 
// только если их запустить из меню команд бота, а sendData - только если через keyboard button. 
// Под это приходится адаптироваться.