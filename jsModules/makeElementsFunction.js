//Når vi lager en modul, tror jeg det er lurt på bruke JS docs for å gi en beskrivelse.

/**
 * function to make HTML elements, and assign properties to said element.
 * @param {*} type //type of html element
 * @param {*} properties //object where key/value pairs are properties of the HTML element, JS reserved keywords DOES NOT WORK.
 * @returns //the html element.
 */
function makeElements(type, properties) {
  const propertyArray = Object.entries(properties);
  const element = document.createElement(type);
  propertyArray.forEach((property) => {
    const [propertyName, propertyValue] = property;
    element[propertyName] = propertyValue;
  });
  return element;
}

//i bunn eksporterer funksjonen ut av dokumentet.
//du kan importere denne inn i en ny JS modul via import
/* !!EXPORT MÅ STÅ I  BUNN!! */
export { makeElements };
