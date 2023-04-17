###APP

---

## Алгоритм действий

- 1.Постановка задачи (клиент-сервер)
- 2.Создание архитектуры (папка клиент(html,script), сервер)
- 3.Создаем архитектуру для сервера
- 4.Перейти в терменале в папку server ls(проверяет в какой мы папке) -> cd server (переносит работу терминала в нужную папку)
- 5.Инициализируем сервер
  `( nmp init-y ) создается json`
- 6.В папке сервер создаем app.js
- 7.Устанавливаем библиотеку
  `npm install express`
- 8.Создаем .gitignor и помещяем туда node_modules
- 9.Переход на ES6 module (type module) - в файл package.json
- 10.Создаем структуру сервера
- 11.Запускаем ноду
  `node app.js`

---

## helper (не обязательно)

- 1.Устанавливаем nodemon
  `npm instal -D nodemon`
- 2.Редактируем packaje.json
```
 "scripts": {
    "dev" : "nodemon app.js"
  }
для автоматического обновления сервера и его запуска
```
- 3.Запускаем nodemon
  `npm run dev`

---

## Server

1. Делаем обработчик
```
app.post("/user", (req, res) => {
})
```
2. Убираем оштбку CORS
- Устанавливаем библиотеку CORS
  `npm install cors`
- Подключаем ее
  ` import cors from "cors"`
- Используем
  `app.use(cors())`
3. Делаем bodyparser
`app.use(express.json())`
4. Реализация логики

---

## Git

-Создание новой ветки
`git branch <name>`
-Посмотреть все ветки
`git branch `
- Перейти в другую ветку
`git checkout <name>`

---

## Client

- Верстка
- Событие
- Отправка запроса
  -Обработка ошибок
  -Вывод результата
- Прерывание стандартного поведения формы
