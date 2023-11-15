/* !!IMPORT MÅ STÅ ØVERST!! */

//importerer makeElements funksjonen fra makeElemenentsFunction modulen. Da kan jeg bruke den her.
import { makeElements } from "./jsModules/makeElementsFunction.js";
import { valueSelector } from "./jsModules/makeOptions.js";
import { valueObject } from "./jsModules/valueObject.js";
/* Tror så lenge vi blir enige om et design,
kan vi fordele oppgavene inn i forskjellige JS moduler og CSS komponenter,
så importere alt inn i index.js og style.css. fix ferdig arbeid! */
// Create an input field for the to-do list

const todoInput = makeElements("input", {
  type: "text",
  id: "todoInput",
  placeholder: "Enter your to-do item",
});
const submitBtn = makeElements("button", {
  textContent: "Add To-Do",
});
//shows total score of completed tasks
let scoreSum = 0;
const totalSum = makeElements("p", {
  textContent: `your total score is ${scoreSum}`,
});

document.body.appendChild(todoInput);
document.body.appendChild(valueSelector);
document.body.appendChild(submitBtn);
document.body.appendChild(totalSum);
const todoList = makeElements("ul", { id: "todoList" });
document.body.appendChild(todoList);

const todoListItems = [];

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

const displayTodo = (todo) => {
  const listItem = makeElements("li", {
    textContent: `${todo.text} - Difficulty: ${todo.difficulty}`,
  });
  todoList.appendChild(listItem);
};
//summerer opp poeng 
const addPoints = () => {
  if (taskCompleted === valueObject.enkelt) {
    totalSum += valueObject.enkelt;
  } else if (taskCompleted === valueObject.lett) {
    totalSum += valueObject.lett;
  } else if (taskCompleted === valueObject.medium) {
    totalSum += valueObject.medium;
  } else {
    totalSum += valueObject.vanskelig;
  }
};
