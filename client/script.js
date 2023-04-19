// Форма регистрации

let box = document.querySelector(".box");
let myForm = document.querySelector(".myform");
let formreg = document.querySelector(".regisrration");
let log = document.querySelector(".log");
let pass = document.querySelector(".pass");
let btn = document.querySelector(".btn");

// ToDo

let mytodo = document.querySelector(".mytodo");
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const form = document.querySelector(".form");
const info = document.querySelector(".info");
const del = document.querySelector(".delete");
const delAll = document.querySelector(".delAll");
const delEnd = document.querySelector(".delEnd");

// Отправляется на сервер
formreg.addEventListener("submit", (event) => event.preventDefault());
form.addEventListener("submit", (event) => event.preventDefault());

async function server() {
  let user = {
    login: log.value,
    password: pass.value,
  };

  let response = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  let data = await response.json();
  console.log(data);
  // addlist(data);
}

// Функция для отрисовки страницы todo после регистрации

btn.addEventListener("click", () => {
  myForm.style.display = "none";
  mytodo.style.display = "block";
});

//*************************************************************************************************************************** */

// массив кужа будут добавляться задаси и отправляться на

//1/Создание массива с данными
function addlist(array) {
  let value = input.value; // создаем переменную и присваеваем введенное в импут

  //Добавляем новый объект в массив
  if (value.length) {
    array.push({
      text: value,
      status: false, // задаем значение по умолчанию
    });
  }
  input.value = ""; // после нажатия ентер возвращяет пустую строку(стандартное поведение формы в браузере)
  input.focus(); // Не теряем фокус с инпута
  renderList(); // Отрисовка
}

//2/Отрисовываем  каждый раз при изменеии массива, вынесена для удобства
function renderList(array) {
  info.innerHTML = ""; // для избежания повторов, сначала очищяет,потом отрисовывает проходясь по массиву
  array.forEach((el) => {
    info.append(createList(el));
  });
  if (array.length) {
    info.classList.add("showInfo");
    del.classList.add("showDelete");
  } else {
    info.classList.remove("showInfo");
    del.classList.remove("showDelete");
  }
}

//3/Отрисовываем Todo
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
const deleteList = () => {
  // При нажатии на кнопку делит массив обнуляется и вызывается функция
  list = [];
  renderList();
};

// // 6/ Удалить при нажатии на крестик
function taggleDel(id) {
  let myIndex = list.findIndex((el) => el.id === id);
  list.splice(myIndex, 1);
  renderList();
}

//7/ Удалить зачеркнутые
const deleteEnd = () => {
  list = list.filter((el) => el.status !== true);
  renderList();
};

renderList();

btn.addEventListener("click", server);
button.addEventListener("click", () => addlist);
delEnd.addEventListener("click", deleteEnd);
delAll.addEventListener("click", deleteList);
