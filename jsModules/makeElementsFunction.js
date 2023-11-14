//Når vi lager en modul, tror jeg det er lurt på bruke JS docs for å gi en beskrivelse.

/**funksjon for å lage html elementer basert på type, og et object med key/value par*/
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
