const fs = require("fs");

const content = fs.readFileSync("README.md", "utf8");

const words = content.split(" ");
// console.log(`${words}`);

console.log(`The word count is ${words.length}`);

//Encontrar las ocurrencias de la palabra "React" en el archivo README.md
/*
Como aqui tambien hay cosas como: (https://github.com/facebook/react/...) y otras cosas, el conteo no es exacto asi que en vez de filter
podemos usar includes(), aunque lo ideal es usar una regex para que sea mas exacto, el cual se puede hacer con .match() de un string (en este caso content)
*/
// const reactWordCount = words.filter((word) =>
//   word.toLowerCase().includes("react")
// );
const reactWordCount = content.match(/react/gi ?? []).length;
console.log(`React ocurrences: ${reactWordCount}`); //Case insensitive, debe dar 62 (We gucci)
