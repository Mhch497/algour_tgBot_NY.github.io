let tg = window.Telegram.WebApp;

let fBtn = document.getElementsByClassName("f-btn")[0]
let sBtn = document.getElementsByClassName("s-btn")[0]

fBtn.addEventListener("click", () => {
    document.getElementsByClassName("Main")[0].style.display = "none";
    document.getElementsByClassName("test-form")[0].style.display = "block";
});

sBtn.addEventListener("click", () => {
    tg.close();
});

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