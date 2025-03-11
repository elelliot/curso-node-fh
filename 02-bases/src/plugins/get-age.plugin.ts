//Patron Adapter (Creamos un plugin para get-age, asi solo cambiamos este plugin y no todo el codigo)

//const getAgePlugin = require('get-age');

//New export y cambiamos cosas
export const getAge = (birthdate: string) => {
    //if(!birthdate) return new Error('Birthdate is required');
    //return getAgePlugin(birthdate);
    console.log({
        currentYear: new Date().getFullYear()
    })
    return new Date().getFullYear() - new Date(birthdate).getFullYear();
}

//Siempre es mejor exportar un objeto. (Recordar destructurar al importar)
//Old export
// module.exports = {
//     getAge
// }