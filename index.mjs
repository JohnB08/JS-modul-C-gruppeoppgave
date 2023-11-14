/* !!IMPORT MÅ STÅ ØVERST!! */

//importerer makeElements funksjonen fra makeElemenentsFunction modulen. Da kan jeg bruke den her.
import { makeElements } from "./jsModules/makeElementsFunction.js";

let testBtn = makeElements("button", {
  className: "testBtn",
  textContent: "testBtn",
});
document.body.appendChild(testBtn);
