//Con el archivo de barril nos ahorramos estas importaciones...
// const { getUUID } = require('../plugins/get-id.plugin') //From an Adapter
// const { getAge } = require('../plugins/get-age.plugin') //From an Adapter
 
const { getAge, getUUID } = require('../plugins') //index.js es el archivo de barril que se lee por defecto

getAge('1990-01-09')

//Factory Pattern
const buildPerson = ({name, birthdate}) => {
    /*
    Este approach al tener las dependencias altamente acopladas (uuid y get-age), y si llegamos a desinstalar o cambiar
    las dependencias, RIP.
    El Patron Adapter nos ayuda a desacoplar las dependencias, y a que nuestro codigo sea mas mantenible.
    */
    return {
        id: getUUID(), //Ya tiene adapters
        name:name,
        birthdate: birthdate,
        age: getAge(birthdate) //Ya tiene adapters
    }
}


// const obj = { name: 'John', birthdate: '1994-10-21' }
// const john = buildPerson( obj )

// console.log(john)

module.exports = {
    buildPerson
}