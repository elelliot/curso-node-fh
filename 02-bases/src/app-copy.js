/*
Para correr comandos del package, debemos estar al mismo nivel que el package.json
Los 'dependencies' llegan a produccion, los 'devDependencies' solo a desarrollo.
Paquetes como nodemon que solo se usan en desarrollo, se instalan como devDependencies.
Si se equivocan, solo instalen de nuevo con el flag --save o --save-dev y te corrige el package.json. (Yo borraba primero y instalaba LOL).

"start" es un comando especial de npm que se puede usar para iniciar la aplicación.
npm start, lo mismo para "test".

Pero si quiero usar algo como "dev", 
ahi me da error, debo usar "npm run dev" para que funcione.
*/

//En el package declaramos los comandos para correr la app en modo de dev, test, produccion etc.
// console.log("Hello desde app.js");

//Requerimos el archivo para que se ejecute. (Esta es la forma tradicional)
// require("./js-foundation/01-template");

//Ahora que tenemos exportaciones, el require retorna el module.exports
//const templateExports = require("./js-foundation/01-template");
//console.log(templateExports.emailTemplate);

//Tambien podemos desestructurar
const { emailTemplate } = require("./js-foundation/01-template");
console.log(emailTemplate);

//Si queremos usar el import, que es mas moderno, da error ya que node por defecto usa el require y hay que hacer configuraciones.
// import { emailTemplate } from "./js-foundation/01-template";

//Ya teniendo nodemon, actualizamos el comando para correr la app con dev:
//node src/app.js a nodemon src/app.js
