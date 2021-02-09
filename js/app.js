//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

const TODOS_LS = "todos";
let todos = [];

//EventListener
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(text) {
  //todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li tag
  const newTodo = document.createElement("li");
  newTodo.id = todos.length + 1;
  newTodo.innerText = text;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  completedButton.addEventListener("click", completeCheck);
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  trashButton.addEventListener("click", deleteCheck);

  todoDiv.appendChild(completedButton);
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);

  const todoObj = {
    text: text,
    id: todos.length + 1,
  };
  todos.push(todoObj);
  saveLocalTodos();
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;
  todo.classList.add("fall");
  todo.addEventListener("transitionend", function () {
    todo.remove();
  });
  const todoIndex = todo.children[0];
  const cleanTodos = todos.filter((todo) => {
    return todo.id !== parseInt(todoIndex.id);
  });
  todos = cleanTodos;
  saveLocalTodos();
}

function completeCheck(e) {
  const item = e.target;
  const todo = item.parentElement;
  todo.classList.toggle("completed");
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    if (todo.classList !== undefined) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = todoInput.value;
  addTodo(currentValue);
  todoInput.value = "";
}

function saveLocalTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((todo) => addTodo(todo.text));
  }
}

function init() {
  loadTodos();
  todoButton.addEventListener("click", handleSubmit);
}

init();
