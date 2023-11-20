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

const inputLabel = makeElements("label", {
  className: "inputLabel",
  textContent: "Enter your to-do item:",
});
inputLabel.setAttribute("for", "todoInput");
const submitBtn = makeElements("button", {
  textContent: "ADD TO-DO",
  className: "submitBtn",
});
const selectorLabel = makeElements("label", {
  className: "selectorLabel",
  textContent: "How fast must it be done?",
});
selectorLabel.setAttribute("for", "valueSelector");
const inputContainer = makeElements("div", { className: "inputContainer" });
const btnAndScoreContainer = makeElements("div", {
  className: "btnAndScoreContainer",
});

const sortContainer = makeElements("div", { className: "sortContainer" });
inputContainer.appendChild(inputLabel);
inputLabel.appendChild(todoInput);
inputContainer.appendChild(selectorLabel);
selectorLabel.appendChild(valueSelector);
inputContainer.appendChild(sortContainer);
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
  addToList();
};

function addToList() {
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
    inputLabel.classList.remove("errorMessage");
    todoInput.classList.remove("redPlaceHolder");
    displayTodo(todoObject[inputValue]);
    todoInput.value = "";
  } else {
    inputLabel.classList.add("errorMessage");
    todoInput.classList.add("redPlaceHolder");
  }
}

const sortSelector = makeElements("select", { className: "sortSelector" });
const sortExplainOption = makeElements("option", {
  textContent: "--Sort Options--",
  selected: true,
  disabled: true,
});
sortSelector.appendChild(sortExplainOption);
const sortSelectorValues = [
  "Ascending",
  "Descending",
  "Urgency",
  "Oldest",
  "Newest",
];
sortSelectorValues.forEach((option) => {
  const sortOption = makeElements("option", {
    textContent: option,
    value: option,
  });
  sortSelector.appendChild(sortOption);
});
sortContainer.appendChild(sortSelector);
/* sortContainer.appendChild(sortBtn); */
//updatet displayTodo function for å adde remove knapp, addet completed knapp
const displayTodo = (todo) => {
  const listItem = makeElements("li", {
    textContent: `${todo.text} - Done ${todo.difficultyText} `,
  });
  const completeBtn = makeElements("button", {
    textContent: "COMPLETE",
    className: "completeBtn",
  });

  const removeBtn = makeElements("button", {
    className: "removeBtn",
  });
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
      completeBtn.textContent = "COMPLETED";
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

document.addEventListener("keydown", (event) => {
  if (event.code != "Enter") return;
  addToList();
});

function sortArray(array, direction) {
  if (direction === "Ascending") {
    return array.sort((a, b) => {
      const A = a.toUpperCase();
      const B = b.toUpperCase();
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    });
  } else if (direction === "Descending") {
    return array.sort((a, b) => {
      const A = a.toUpperCase();
      const B = b.toUpperCase();
      if (A < B) {
        return 1;
      }
      if (A > B) {
        return -1;
      }
      return 0;
    });
  } else if (direction === "Urgency") {
    return array.sort((a, b) => {
      if (todoObject[a].difficulty < todoObject[b].difficulty) {
        return 1;
      }
      if (todoObject[a].difficulty > todoObject[b].difficulty) {
        return -1;
      }
      return 0;
    });
  } else if (direction === "Oldest") {
    return array.sort((a, b) => {
      if (todoObject[a].dateObject < todoObject[b].dateObject) {
        return -1;
      }
      if (todoObject[a].dateObject > todoObject[b].dateObject) {
        return 1;
      }
      return 0;
    });
  } else if (direction === "Newest") {
    return array.sort((a, b) => {
      if (todoObject[a].dateObject < todoObject[b].dateObject) {
        return 1;
      }
      if (todoObject[a].dateObject > todoObject[b].dateObject) {
        return -1;
      }
      return 0;
    });
  }
}

sortSelector.addEventListener("change", () => {
  const oldActiveListItems = todoList.querySelectorAll("li");
  oldActiveListItems.forEach((item) => item.remove());
  let sortedArray = sortArray(Object.keys(todoObject), sortSelector.value);
  sortedArray.forEach((element) => {
    displayTodo(todoObject[element]);
  });
});
