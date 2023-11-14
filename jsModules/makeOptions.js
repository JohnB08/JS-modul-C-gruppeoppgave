import { valueObject } from "./valueObject.js";
import { makeElements } from "./makeElementsFunction.js";

const valueSelector = makeElements("select", { className: "valueSelector" });
Object.keys(valueObject).forEach((difficulty) => {
  const valueOption = makeElements("option", {
    className: "valueOption",
    textContent: `${difficulty}`,
    value: valueObject[difficulty],
  });
  console.log(Object.keys(valueObject));
  valueSelector.appendChild(valueOption);
});
console.log(valueSelector);
export { valueSelector };
