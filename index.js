let tg = window.Telegram.WebApp;
let btnstart = document.querySelector('.start')

function scrollDown() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}
btnstart.addEventListener('click', scrollDown)

let currentIndex = 0;
let btn_start = document.querySelector('.btn.start')



// class Question {
//     constructor(question, right_answer, wrong1, wrong2, wrong3) {
//         this.question = question
//         this.right_answer = right_answer
//         this.wrong1 = wrong1
//         this.wrong2 = wrong2
//         this.wrong3 = wrong3
//     }
// }

function shuffle(array) {
    array = [].slice.call(array);
    array.sort(() => Math.random() - 0.5);
    return array
}

let q_number = 0
let add_q_number = 0
let task_number = 0
let cur_result = 0
let questions_list
let add_questions_list
let tasks_list
let attempts_count = 3
let need_add_q = false
let need_task = false
// window.questions_list
let cur_question
let ans_buttons = document.querySelectorAll('.answer')
let question = document.querySelector('.question')
let task_descr = document.querySelector('.task_descr')
let open_question = document.querySelector('.open_question')
let right_ans = document.querySelector('.right_ans')
let question_block = document.querySelector('.question_block')
let task_block = document.querySelector('.task_block')
let btn_next = document.querySelector('.btn_next')
let btn_check = document.querySelector('.btn.check')
let btn_done = document.querySelector('.btn.ready')
let q_result_block = document.querySelector('.q_result_block')
let result_block = document.querySelector('.result_block')
let q_result = document.querySelector('.q_result')
let question_number = document.querySelector('.question_number')
let open_question_number = document.querySelector('.open_question_number')
let header = document.querySelector('header')
let attempts_count_p = document.querySelector('.attempt_count')
//let cur_score = document.querySelector('.cur_score')
//let result_score = document.querySelector('.result_score')
function ask(q_text, q, q_type = null) {
    cur_question = q

    if ('w_a1' in cur_question) {
        if (q_type === null) {
            question_number.innerHTML = 'ВОПРОС ' + (q_number + 1)
        } else {
            question_number.innerHTML = 'ДОПОЛНИТЕЛЬНЫЙ ВОПРОС ' + (add_q_number + 1)
        }
        let answers_list = [cur_question.r_a,
            cur_question.w_a1,
            cur_question.w_a2,
            cur_question.w_a3
        ]
        answers_list = shuffle(answers_list)
        for (let i = 0; i < answers_list.length; i++) {
            ans_buttons[i].innerHTML = answers_list[i]
        }
        show_question_with_ans()
        question.innerHTML = q_text
        right_ans.innerHTML = cur_question.r_a
    } else {


        attempts_count = 3
        attempts_count_p.innerHTML = `Количество попыток: ${attempts_count}`
        if (q_type === null) {
            open_question_number.innerHTML = 'ВОПРОС ' + (q_number + 1)
        } else {
            open_question_number.innerHTML = 'ДОПОЛНИТЕЛЬНЫЙ ВОПРОС ' + (add_q_number + 1)
        }

        show_question_without_ans()
        open_question.innerHTML = q_text
        right_ans.innerHTML = cur_question.r_a
    }
}
let code_input = document.querySelector('.input_code_field')

function give_task(q) {
    btn_done.setAttribute('disabled', '')


    // cur_question = q[Object.keys(q)[0]]
    show_task_block()
    task_descr.innerHTML = q
    // right_ans.innerHTML = cur_question.r_a


}

code_input.addEventListener('change', function () {

    if (code_input.value == 'Algo59') {
        btn_done.removeAttribute('disabled')
        need_task = false
        code_input.value = ''
    }
    btn_done.focus()
})




btn_done.addEventListener('click', function () {
    if (q_number >= questions_list.length) {
        //        result_score = cur_result
        finish_test()
    } else {
        next_question()
    }
})

function show_task_block() {
    q_result_block.style.display = 'none'
    result_block.style.display = 'none'
    task_block.style.display = 'block'
}

let open_question_block = document.querySelector('.open_question_block')

function show_question_without_ans() {
    task_block.style.display = 'none'
    q_result_block.style.display = 'none'
    result_block.style.display = 'none'
    open_question_block.style.display = 'block'

}

function show_question_with_ans() {
    task_block.style.display = 'none'
    q_result_block.style.display = 'none'
    result_block.style.display = 'none'
    question_block.style.display = 'block'
}

function show_result() {
    q_result_block.style.display = 'flex'
    question_block.style.display = 'none'
    question_block.style.display = 'none'
    open_question_block.style.display = 'none'
    result_block.style.display = 'none'
}

function show_correct(res) {
    q_result.innerHTML = res
    if (q_number >= questions_list.length) {
        btn_next.value = 'ЗАВЕРШИТЬ'
    }
    if (res == 'Неверно') {
        if (need_add_q == false) {
            need_add_q = true
        } else if (need_add_q == true) {
            need_add_q = false
            need_task = true
        }
        console.log(need_add_q, need_task)

    } else {
        need_add_q = false
        need_task = false
    }
    show_result()

}

function next_question() {
    if (need_add_q == false && need_task == false) {
        let q = questions_list[q_number][Object.keys(questions_list[q_number])[0]]
        ask(Object.keys(questions_list[q_number])[0], q)
        q_number += 1
    } else if (need_add_q == true) {
        console.log(add_questions_list[add_q_number])
        ask(add_questions_list[add_q_number]['вопрос'], {
                'r_a': add_questions_list[add_q_number]['ответ']
            },
            1
        )
        add_q_number += 1
    } else if (need_task == true) {
        console.log(tasks_list[task_number])
        give_task(tasks_list[task_number]['задание'])
        task_number += 1
    }

}

// function add_question() {
//     ask(add_questions_list[q_number])
//     q_number += 1
// }

function get_add_q_tasks(data) {
    let tasks = []
    let add_questions = []
    for (key in data) {
        if ('тип' in data[key]) {
            if (data[key]['тип'] == 'Доп вопрос') {
                add_questions.push(data[key])
            } else {
                tasks.push(data[key])
            }
        }
    }
    add_questions_list = add_questions
    tasks_list = tasks
}

let settings = document.querySelector('.settings')
let btn_sett = document.querySelector('.btn.sett')

btn_sett.addEventListener('click', function () {
    btn_sett.classList.remove('active');
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
    settings.style.display = 'none';
    let select_settings = document.querySelector('.select_settings').value
    // let course = select_settings.querySelector('')
    questions_list = shuffle(questions[select_settings])
    get_add_q_tasks(add_questions_tasks[select_settings])
    add_questions_list = shuffle(add_questions_list)
    tasks_list = shuffle(tasks_list)
    // question_block.style.display = 'block'
    next_question()
    // ask(questions_list[q_number])
    // q_number += 1


})

btn_start.addEventListener('click', function () {
    btn_start.classList.remove('active');

    // next_question()
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
    header.style.display = 'none'
    // scrollDown()
    settings.style.display = 'flex'


})

function finish_test() {
    q_result_block.style.display = 'none'
    question_block.style.display = 'none'
    result_block.style.display = 'block'

}

function check_answer(answer) {
    if (answer == cur_question.r_a) {
        cur_result += 1
        show_correct("Верно")
        // tg.sendData("Верно");

    } else {
        show_correct("Неверно")
        // tg.sendData("Неверно");

    }
}

function check_open_answer() {
    let answer_input = document.querySelector('.input_open_answer_field')
    let answer = answer_input.value
    if (cur_question.r_a.split(' ').map(v => v.toLowerCase()).includes(answer.toLowerCase()) ||
        cur_question.r_a == answer) {
        cur_result += 1
        show_correct("Верно")
        answer_input.value = ''
        // tg.sendData("Верно");

    } else {
        attempts_count -= 1
        if (attempts_count <= 0) {
            show_correct("Неверно")
        } else {
            attempts_count_p.innerHTML = `Количество попыток: ${attempts_count}`
            answer_input.value = ''
        }
    }
    answer_input.addEventListener('change', function () {
        btn_check.focus()
    })

}

btn_next.addEventListener('click', function () {
    if (q_number >= questions_list.length) {
        //        result_score = cur_result
        finish_test()
    } else {
        next_question()
    }
})

btn_check.addEventListener('click', function () {

    check_open_answer()
})

for (let i = 0; i < 4; i++) {
    ans_buttons[i].addEventListener('click', function () {
        check_answer(ans_buttons[i].innerHTML)

    })

}


// Вопросы

let questions_filename = 'questions.json'
let add_questions_filename = 'sec_part_ps1.json'


function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                return allText
            }
        }
    }
    rawFile.send(null);
    return rawFile.responseText
}


let questions = JSON.parse(readTextFile(questions_filename));
let add_questions_tasks = JSON.parse(readTextFile(add_questions_filename));













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