import { makeElements } from "./makeElementsFunction.js";
import { valueSelector } from "./makeOptions.js";
import {
  todoInput,
  todoListItems,
  displayTodo,
  todoList,
} from "./makeInputs.js";

const submitBtn = makeElements("button", {
  textContent: "Add To-Do",
});

submitBtn.onclick = () => {
  const inputValue = todoInput.value.trim();
  const difficulty = valueSelector.value;

  if (inputValue) {
    const todoObject = {
      text: inputValue,
      difficulty: difficulty,
    };

    todoListItems.push(todoObject);
    displayTodo(todoObject);

    todoInput.value = "";
  } else {
    alert("Enter To-Do item");
  }
};
export { submitBtn };
