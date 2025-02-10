const { getAge, getUUID } = require("./plugins/index");

const { buildMakePerson } = require("./js-foundation/05-factory");

//Desde aqui le configuro como se crearan el UUID y la edad...
//... Basicamente, Inyeccion de dependencias (le ando inyectando las dependencias de getUUID y getAge)
const makePerson = buildMakePerson({ getUUID, getAge });

const obj = { name: "John", birthdate: "1994-10-21" };

//...Y con esa config. creo a John
const john = makePerson(obj);

console.log({ john });
