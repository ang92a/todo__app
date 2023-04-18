// Структура сервера

import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

//наша база
const users = [];

app.use(cors());
app.use(express.json());

//обработчик запроса
app.post("/user", (req, res) => {
  const { login, password } = req.body;
  // console.log(users);
  let user = users.find((user) => user.login === login);

  if (user) {
    if (user.password === password) {
      res.json({
        message: "вход",
        todo: user.todo ?? [],
      });
    } else {
      res.status(401).json({ mes: "Неверный пароль" });
    }
  } else {
    users.push({ login, password });
    res.status(201).json({ mes: "Создан" });
  }
});

app.listen(PORT, () => {
  console.log("Server has been started on port 5000...");
});
