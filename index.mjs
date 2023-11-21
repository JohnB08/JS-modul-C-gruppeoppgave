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
  placeholder: "Enter your to-do task here",
});

//label for inputfield
const inputLabel = makeElements("label", {
  className: "inputLabel",
  textContent: "To-do:",
});
//setAttribute for å jobbe rundt "for" reserved keyword.
inputLabel.setAttribute("for", "todoInput");

const submitBtn = makeElements("button", {
  textContent: "ADD TO-DO",
  className: "submitBtn",
});

const selectorLabel = makeElements("label", {
  className: "selectorLabel",
  textContent: "Schedule for:",
});
//setAttribute for å jobbe rundt "for" reserved keyword.
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
sortContainer.appendChild(submitBtn);
btnAndScoreContainer.appendChild(sortContainer);
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
let todoObject = {};

loadFromLocalStorage();

submitBtn.onclick = () => {
  addToList();
  saveToLocalStorage();
};
/**
 * Funksjon som lager et object i todoObject
 * og lager et li element basert på det objektet.
 * Viser feil til bruker hvis feltet er tomt når knappen trykkes.
 */
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
//en placeholder sort option som bare forklarer hva select gjør.
const sortExplainOption = makeElements("option", {
  textContent: "--Sort Options--",
  selected: true,
  disabled: true,
});
sortSelector.appendChild(sortExplainOption);
//alle values som sort select kan ha.
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
const achievementsComplete = {
  firstToDo: {
    name: "Complete your first todo!",
    complete: false,
    icon: "./image/medal.png",
    htmlImage: makeElements("img", {
      src: "./image/medal.png",
    }),
  },
  reach500: {
    name: "You have achieved 500 points",
    complete: false,
  },
};
const achievementChecker = () => {
  if (achievementsComplete.firstToDo.complete === false) {
    return;
  } else if (achievementsComplete.firstToDo.complete === true) {
    document.body.appendChild(achievementsComplete.firstToDo.htmlImage);
  }
};
/* sortContainer.appendChild(sortBtn); */
//updatet displayTodo function for å adde remove knapp, addet completed knapp
//summerer opp poeng
const addPoints = (todo) => {
  if (scoreSum === 0) {
    achievementsComplete.firstToDo.complete = true;
  }
  if (scoreSum === 500) {
    achievementsComplete.reach500.complete = true;
  }
  scoreSum += todo.difficulty;
  achievementChecker();
  totalSum.textContent = `your total score is ${scoreSum}`;
};

/**
 * funksjon som tar inn et objekt, og lager li basert på objektet.
 * @param {*} todo
 * appender li til ul
 * lager knapper som kan manipulere li på siden
 */
function displayTodo(todo) {
  const listItem = makeElements("li", {
    className: "listItem",
  });
  const listContent = makeElements("p", {
    textContent: todo.text,
    className: "listContent",
  });
  const listUrgency = makeElements("p", {
    textContent: `${todo.difficultyText}`,
    className: "listUrgency",
  });
  listItem.append(listContent, listUrgency);
  const completeBtn = makeElements("button", {
    textContent: "COMPLETE",
    className: "completeBtn",
  });
  console.log(todo.complete);
  if (todo.complete === true) {
    completeBtn.disabled = true;
    completeBtn.textContent = "COMPLETED";
    listItem.appendChild(completeBtn);
    completedList.appendChild(listItem);
  } else {
    listItem.appendChild(completeBtn);
    todoList.appendChild(listItem);
  }
  /* `${todo.text} - Done ${todo.difficultyText} ` */
  const removeBtn = makeElements("button", {
    className: "removeBtn",
  });
  listItem.appendChild(completeBtn);
  listItem.appendChild(removeBtn);
  //complete klikker som legger til poeng
  //added logikk for localstorage complete/ikke complete
  completeBtn.onclick = () => {
    if (!todo.complete) {
      todo.complete = true;

      console.log(typeof todo.difficulty);
      addPoints(todo);
      listItem.remove();
      completedList.appendChild(listItem);
      completeBtn.disabled = true;
      completeBtn.textContent = "COMPLETED";
      saveToLocalStorage();
    }
  };
  //fjerner fra både array og display
  removeBtn.onclick = () => {
    delete todoObject[todo.text];
    listItem.remove();
    console.log("Updated todoObject", todoObject);
    saveToLocalStorage();
  };
}

document.addEventListener("keydown", (event) => {
  if (event.code != "Enter") return;
  addToList();
});

/**
 * Funksjon som sorterer en array basert på input
 * @param {*} array arrayet som sorteres.
 * @param {*} direction retning det skal sorteres, i string.
 * @returns sorterte arrayet basert på retning.
 */
function sortArray(array, direction) {
  //sorterer alfabetisk a-z
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
    //sorterer alfabetisk z-a
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
    //sorterer basert på scorevalue høy-lav
    return array.sort((a, b) => {
      if (todoObject[a].difficulty > todoObject[b].difficulty) {
        return 1;
      }
      if (todoObject[a].difficulty < todoObject[b].difficulty) {
        return -1;
      }
      return 0;
    });
  } else if (direction === "Oldest") {
    //sorterer basert på dato eldst-yngst
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
    //sorterer basert på dato yngst-eldst
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

//Eventlistener på select element som lytter etter endring.
sortSelector.addEventListener("change", () => {
  const oldActiveListItems = todoList.querySelectorAll("li");
  oldActiveListItems.forEach((item) => item.remove());
  let sortedArray = sortArray(Object.keys(todoObject), sortSelector.value);
  sortedArray.forEach((element) => {
    if (!todoObject[element].complete) displayTodo(todoObject[element]);
  });
});

const saveToLocalStorage = () => {
  const dataToSave = {
    todos: todoObject,
    score: scoreSum,
  };
  localStorage.setItem("todoData", JSON.stringify(dataToSave));
};

//kanskje bedre med ?? operator?
function loadFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem("todoData")) || {};

  todoObject = savedData.todos || {};
  scoreSum = savedData.score || 0;
  totalSum.textContent = `Your total score is ${scoreSum}`;

  Object.keys(todoObject).forEach((todo) => {
    displayTodo(todoObject[todo]);
  });
}
//achievement reward icon
const achievementDiary = makeElements("button", {
  className: "achievementTasks",
  textContent: "Achievements",
});
document.body.appendChild(achievementDiary);

totalSum.addEventListener("change", (event) => {
  console.log(event);
});
