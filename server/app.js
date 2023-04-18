// Структура сервера

import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

//наша база
const users = []; // {логин, пароль, todo (массив со списком)}

app.use(cors());
app.use(express.json());

//обработчик запроса
app.post("/user", (req, res) => {
  // req - обьект приходит от клинента
  const { login, password } = req.body; // разобрали обьект

  let user = users.find((user) => user.login === login);
  console.log(user);
  if (user) {
    if (user.password === password) {
      res.json({
        // возвращяет запрос клиенту
        massage: "вход",
        todo: user.todo ?? [],
      });
    } else {
      res.status(401).json({ massage: "Неверный пароль" });
    }
  } else {
    users.push({ login, password });
    res.status(201).json({ massage: "Создан" });
  }
});

// app.get("/data", (req, res) => {
//   res.json(users);
// });

app.listen(PORT, () => {
  console.log("Server has been started on port 5000...");
});
