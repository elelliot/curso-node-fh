const fs = require("fs");

//2nd param:
// Either the encoding for the result, or an object that contains the encoding and an optional flag. If a flag is not provided, it defaults to 'r'.
const data = fs.readFileSync("README.md", "utf8"); //if the encoding option is specified then this function returns a string. Otherwise it returns a buffer.
console.log(data);

const newData = data.replace(/React/gi, "Angular"); //Reemplaza todas las ocurrencias de React por Angular

fs.writeFileSync("README-Angular.md", newData); //Escribimos un nuevo archivo (README-Angular.md) con el contenido modificado
