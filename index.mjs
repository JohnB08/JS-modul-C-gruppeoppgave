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
  textContent: "ADD TO-DO",
  className: "submitBtn",
});
const inputContainer = makeElements("div", { className: "inputContainer" });
const btnAndScoreContainer = makeElements("div", {
  className: "btnAndScoreContainer",
});
inputContainer.appendChild(todoInput);
inputContainer.appendChild(valueSelector);
btnAndScoreContainer.appendChild(submitBtn);
inputContainer.appendChild(btnAndScoreContainer);
document.body.appendChild(inputContainer);

//shows total score of completed tasks
let scoreSum = 0;
const totalSum = makeElements("p", {
  textContent: `your total score is ${scoreSum}`,
});

btnAndScoreContainer.appendChild(totalSum);
const todoList = makeElements("ul", { id: "todoList" });
const completedList = makeElements("ul", { id: "completedList" });
document.body.appendChild(todoList);
document.body.appendChild(completedList);

//laga arary til object, sånn at det er lettere å lagre ting. kan loope gjennom via Object.keys()
const todoObject = {};
submitBtn.onclick = () => {
  const inputValue = todoInput.value.trim();
  const difficulty = parseInt(valueSelector.value);
  const difficultyText = Object.keys(valueObject)
    [Object.values(valueObject).indexOf(difficulty)].split("_")
    .join(" ");

  if (inputValue) {
    todoObject[inputValue] = {
      //laget en dateObject, sånn at vi kan hente ut hvilken dag og måned dette ble laget i via dateObject.getDate()
      text: inputValue,
      difficulty: difficulty,
      difficultyText: difficultyText,
      dateObject: new Date(Date.now()),
      complete: false,
    };

    displayTodo(todoObject[inputValue]);
    todoInput.value = "";
  } else {
    alert("Enter To-Do item");
  }
};

//updatet displayTodo function for å adde remove knapp, addet completed knapp
const displayTodo = (todo) => {
  const listItem = makeElements("li", {
    textContent: `${todo.text} - Gjøres: ${todo.difficultyText} `,
  });
  const completeBtn = makeElements("button", {
    textContent: "Complete",
    className: "completeBtn",
  });

  const removeBtn = makeElements("button", {
    className: "removeBtn",
  });
  const removeBtnSvg = makeElements("img", {
    src: "./svg/x-symbol-sgvrepo-com.svg",
  });
  removeBtn.appendChild(removeBtnSvg);
  listItem.appendChild(completeBtn);
  listItem.appendChild(removeBtn);
  todoList.appendChild(listItem);
  //complete klikker som legger til poeng
  completeBtn.onclick = () => {
    if (!todo.complete) {
      todo.complete = true;
      scoreSum += todo.difficulty;
      console.log(typeof todo.difficulty);
      addPoints();
      listItem.remove();
      completedList.appendChild(listItem);
      completeBtn.disabled = true;
    }
  };
  //fjerner fra både array og display
  removeBtn.onclick = () => {
    delete todoObject[todo.text];
    listItem.remove();
    console.log("Updated todoObject", todoObject);
  };
};
//summerer opp poeng
const addPoints = () => {
  totalSum.textContent = `your total score is ${scoreSum}`;
};
