//Con el archivo de barril nos ahorramos estas importaciones...
// const { getUUID } = require('../plugins/get-id.plugin') //From an Adapter
// const { getAge } = require('../plugins/get-age.plugin') //From an Adapter

//const { getAge, getUUID } = require("../plugins"); //index.js es el archivo de barril que se lee por defecto

//getAge("1990-01-09");

// const buildPerson = ({ name, birthdate }) => {
//   /*
//     Este approach al tener las dependencias altamente acopladas (uuid y get-age), y si llegamos a desinstalar o cambiar
//     las dependencias, RIP.
//     El Patron Adapter nos ayuda a desacoplar las dependencias, y a que nuestro codigo sea mas mantenible.
//     */
//   return {
//     id: getUUID(), //Ya tiene adapters (pero sigue estando acoplado aunque sea con el adapter)
//     name: name,
//     birthdate: birthdate,
//     age: getAge(birthdate), //Ya tiene adapters
//   };
// };

//Factory Pattern (Con esto podre mandar las dependencias como argumentos y nos quitamos el acoplamiento (las dependencias no estan hardcodeadas))
const buildMakePerson = ({ getUUID, getAge }) => {
  return ({ name, birthdate }) => {
    return {
      id: getUUID(),
      name: name,
      birthdate: birthdate,
      age: getAge(birthdate),
    };
  };
};

module.exports = {
  buildMakePerson,
};

/*
En vez de generar una clase, usamos una funcion que nos devuelva un objeto,
las funciones son mas rapidas que la instanciacion de clases. Por eso es mas comun ver factories que clases.

No siempre es buena idea usar factory, en algunos casos con el adapter es suficiente.
*/
