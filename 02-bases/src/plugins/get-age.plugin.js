//Patron Adapter (Creamos un plugin para get-age, asi solo cambiamos este plugin y no todo el codigo)

const getAgePlugin = require('get-age');

const getAge = (birthdate) => {
    if(!birthdate) return new Error('Birthdate is required');
    return getAgePlugin(birthdate);
}

//Siempre es mejor exportar un objeto. (Recordar destructurar al importar)
module.exports = {
    getAge
}