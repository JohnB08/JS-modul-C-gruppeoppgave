/* !!IMPORT MÅ STÅ ØVERST!! */

//importerer makeElements funksjonen fra makeElemenentsFunction modulen. Da kan jeg bruke den her.
import { makeElements } from "./jsModules/makeElementsFunction.js";
import { valueSelector } from "./jsModules/makeOptions.js";
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

document.body.appendChild(todoInput);
document.body.appendChild(valueSelector);
document.body.appendChild(submitBtn);

const todoList = makeElements("ul", { id: "todoList" });
document.body.appendChild(todoList);


//laga arary til object, sånn at det er lettere å lagre ting. kan loope gjennom via Object.keys()
const todoObject = {};
submitBtn.onclick = () => {
  const inputValue = todoInput.value.trim();
  const difficulty = valueSelector.value;

  if (inputValue) {
    todoObject[inputValue] = {
      //laget en dateObject, sånn at vi kan hente ut hvilken dag og måned dette ble laget i via dateObject.getDate()
      text: inputValue,
      difficulty: difficulty,
      dateObject: new Date(Date.now()),
    };

    displayTodo(todoObject[inputValue]);
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
