import { getTodos, addTodo, deleteTodo, checkTodo } from "../state";

const { todoInput, todoButton, todoList } = selectElements();

export function createTodoElement(todo) {
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "todo-button-group";

  const doneButton = document.createElement("button");
  doneButton.textContent = "✓";
  doneButton.setAttribute("data-id", todo.id);
  doneButton.className = "todo-control todo-done-button";

  const removeButton = document.createElement("button");
  removeButton.textContent = "✕";
  removeButton.setAttribute("data-id", todo.id);
  removeButton.className = "todo-control todo-remove-button";

  buttonGroup.appendChild(doneButton);
  buttonGroup.appendChild(removeButton);

  const div = document.createElement("div");
  div.textContent = todo.text + " ";
  div.id = `${todo.id}`;
  div.className = "todo-item";
  div.setAttribute("data-checked", todo.checked);

  div.appendChild(buttonGroup);

  const todoElement = document.createElement("li");
  todoElement.appendChild(div);

  return todoElement;
}

export function selectElements() {
  const todoInput = document.querySelector("#todo-input");
  const todoButton = document.querySelector("#todo-add-button");
  const todoList = document.querySelector(".todo-list");
  return { todoInput, todoButton, todoList };
}

export function render() {
  console.log("[render] todo list");

  todoList.innerHTML = "";
  const todos = getTodos();
  console.log("[render] todos:", todos);
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });
}

function onAddTodo() {
  const todo = todoInput.value;
  if (!todo) {
    return;
  }

  console.log("[onAddTodo] event", todo);
  addTodo(todo);

  todoInput.value = "";

  render();
}

function onTodoClick(e) {
  console.log("[deleteTodo] event", e);

  const todo = e.target.getAttribute("data-id");
  const isDelete = e.target.className.includes("todo-remove-button");
  if (!todo) {
    return;
  }

  if (isDelete) {
    deleteTodo(todo);
  } else {
    checkTodo(todo);
  }

  render();
}

export function subscribeToEvents() {
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      onAddTodo();
    }
  });
  todoButton.addEventListener("click", onAddTodo);
  todoList.addEventListener("click", onTodoClick);
}
