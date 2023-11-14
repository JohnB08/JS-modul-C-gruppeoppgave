/* !!IMPORT MÅ STÅ ØVERST!! */

//tenker index bare trenger html elementene.
import { valueSelector } from "./jsModules/makeOptions.js";
import { todoInput, todoList } from "./jsModules/makeInputs.js";
import { submitBtn } from "./jsModules/submitBtn.js";
/* Tror så lenge vi blir enige om et design,
kan vi fordele oppgavene inn i forskjellige JS moduler og CSS komponenter,
så importere alt inn i index.js og style.css. fix ferdig arbeid! */
// Create an input field for the to-do list

document.body.appendChild(todoInput);
document.body.appendChild(valueSelector);
document.body.appendChild(submitBtn);
document.body.appendChild(todoList);
