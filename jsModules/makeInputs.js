import { makeElements } from "./makeElementsFunction.js";

const todoInput = makeElements("input", {
  type: "text",
  id: "todoInput",
  placeholder: "Enter your to-do item",
});
const todoList = makeElements("ul", { id: "todoList" });

const todoListItems = [];

const displayTodo = (todo) => {
  const listItem = makeElements("li", {
    textContent: `${todo.text} - Difficulty: ${todo.difficulty}`,
  });
  todoList.appendChild(listItem);
};

export { displayTodo, todoListItems, todoInput, todoList };
