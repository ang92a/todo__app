// Форма регистрации

const box = document.querySelector(".box");

async function createPage() {
  // отрисовывается форма регистрации

  box.innerHTML = `<div class="Myform">
            <h1>Регистрация на сайте</h1>
            <div class="inp">
                <form name="regisrration">
                    <input class="log" type="text" required value="Логин" name="login">
                    <input class="pass" type="password" required value="Пароль" name="password">
                    <input class="btn" type="submit" value="Login">
                </form>
            </div>`;

  let log = box.querySelector(".log");
  let pass = box.querySelector(".pass");

  // создается обьект из логина и пароля

  let user = {
    log: log.value,
    pass: pass.value,
  };

  let btn = box.querySelector(".btn");
  btn.addEventListener("click", () => answerServer());

  // Отправляется на сервер
  async function answerServer() {
    let response = await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  }
  let result = await answerServer();

  //Функция получает массив с сервера со списком дел и их статусом
  let arr = result.todo;
  console.log(result.todo);

  btn.addEventListener("click", () => resultServer(arr));
}

// функция для отрисовки тудушника

function resultServer(list) {
  box.inner = `<h1 class="title">ToDo List</h1>
<div class="todo">
    <div class="form__wrapper">
        <form class="form" action="">
            <input class="input" type="text" placeholder="Добавить">
            <button class="button">Добавить</button>
        </form>
        <div class="info">
        </div>
    </div>
    <div class="delete">
        <button class="delEnd">Удалить завершенные</button>
        <button class="delAll">Удалить все</button>
    </div>
</div> `;

  // let info = box.querySelector(".info");
  // const input = box.querySelector(".input");
  // const button = box.querySelector(".button");
  // const form = box.querySelector(".form");
  // const delAll = box.querySelector(".delAll");
  // const delEnd = box.querySelector(".delEnd");

  // list.forEach((el) => {
  //   info.append(createList(el));
  // });
}

//3/Отрисовываем один Todo
function createList(obj) {
  const listItem = document.createElement("li");
  listItem.className = "li";
  listItem.innerHTML = `<input id="chk" type="checkbox">
                        <label class="label">${obj.text}</label>
                        <input type="text" class="textareaInput">
                        <button class="liButtonEdit">✏️</button>
                        <button class="liButtonOk">✅</button>
                        <button class="liButtonDel">❌</button>`;
  let liButtonOk = listItem.querySelector(".liButtonOk");
  let label = listItem.querySelector(".label");
  let textareaInput = listItem.querySelector(".textareaInput");
  let lbl = listItem.querySelector(".liButtonEdit");
  let chk = listItem.querySelector("#chk"); // Добавляем событие для чек
  let liButtonDel = listItem.querySelector(".liButtonDel");
  chk.checked = obj.status;
  chk.addEventListener("change", () => taggleCheck(obj.id)); // для того, чтобы обойти функцию событие, создаем анонимную функцию;
  // if (obj.status == true) lbl.classList.toggle("checkLabel"); // зачеркиваем текс
  liButtonDel.addEventListener("click", () => taggleDel(obj.id));

  lbl.addEventListener("click", () => {
    label.style.display = "none";
    lbl.style.display = "none";
    liButtonOk.style.display = "block";
    textareaInput.style.display = "block";
    textareaInput.value = obj.text;
    liButtonOk.addEventListener("click", () => {
      obj.text = textareaInput.value;
      renderList();
    });
  });
  return listItem;
}

// 4/ Меняем чек при нажатии
function taggleCheck(id) {
  const findItem = list.find((el) => el.id === id);
  if (findItem) findItem.status = !findItem.status;
  renderList();
}

//5/ Удалить все
// const deleteList = () => {
//   // При нажатии на кнопку делит массив обнуляется и вызывается функция
//   list = [];
//   renderList();
// };

// // 6/ Удалить при нажатии на крестик
function taggleDel(id) {
  let myIndex = list.findIndex((el) => el.id === id);
  list.splice(myIndex, 1);
  renderList();
}

//7/ Удалить зачеркнутые
// const deleteEnd = () => {
//   list = list.filter((el) => el.status !== true);
//   renderList();
// };

createPage();

// delEnd.addEventListener("click", deleteEnd);
// button.addEventListener("click", addlist);
// delAll.addEventListener("click", deleteList);
document.forms[0].addEventListener("submit", (e) => e.preventDefault());
