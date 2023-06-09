// Форма регистрации

let box = document.querySelector(".box");

let myForm = document.querySelector(".myform");
let formreg = document.querySelector(".regisrration");
let log = document.querySelector(".log");
let pass = document.querySelector(".pass");
let btn = document.querySelector(".btn");

let input = document.querySelector(".input");
let button = document.querySelector(".button");
let form = document.querySelector(".form");
let info = document.querySelector(".info");
let del = document.querySelector(".delete");
let delAll = document.querySelector(".delAll");
let delEnd = document.querySelector(".delEnd");
let mytodo = document.querySelector(".mytodo");
let myform = document.querySelector(".myform");

formreg.addEventListener("submit", (event) => event.preventDefault());
form.addEventListener("submit", (event) => event.preventDefault());

let data;

let user = {
  login: log.value,
  password: pass.value,
};

async function server() {
  let response = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let res = await response.json();
  data = res.todo;
  console.log(data);
}

btn.addEventListener("click", server);

btn.addEventListener("click", () => {
  myForm.style.display = "none";
  mytodo.style.display = "block";
});

const LS_USER_KEY = "KEY"; // ключ для локалсторедж

const savedlist = JSON.parse(localStorage.getItem(LS_USER_KEY)) ?? []; // если в локалсторедж есть данные в виде строки,
// то они достаются и формируются в массив из обьектов, если ничего не введено, то возвращяется пустой массив
let list = savedlist; // присваиваем получившийся массив

//1/Создание массива с данными
const addlist = (evt) => {
  evt.preventDefault(); //Отменяем стандартное поведение (обновление страницы при отправке формы)
  let value = input.value; // создаем переменную и присваеваем введенное в импут

  //Добавляем новый объект в массив
  if (value.length) {
    list.push({
      // id: Date.now(),
      text: value,
      status: false, // задаем значение по умолчанию
    });
  }
  input.value = ""; // после нажатия ентер возвращяет пустую строку(стандартное поведение формы в браузере)
  input.focus(); // Не теряем фокус с инпута
  renderList(); // Отрисовка
};

//2/Отрисовываем  каждый раз при изменеии массива, вынесена для удобства
function renderList() {
  info.innerHTML = ""; // для избежания повторов, сначала очищяет,потом отрисовывает проходясь по массиву
  localStorage.setItem(LS_USER_KEY, JSON.stringify(list)); // приводим к строке и в локалсторидж
  list.forEach((el) => {
    info.append(createList(el));
  });
  if (list.length) {
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

delEnd.addEventListener("click", deleteEnd);
button.addEventListener("click", addlist);
delAll.addEventListener("click", deleteList);
