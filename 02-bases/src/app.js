// require("./js-foundation/03-callbacks"); //Recordar, el require ejecuta el archivo
const { getUserById } = require("./js-foundation/03-callbacks");

const id = 1;

//Le ando pasando un callback con un error y un usuario
getUserById(id, function(error,user){
    if(error){
        // throw new Error(error);
        throw new Error('Error not found with id',id); //En v8 con node, no se puede hacer esta forma de concatenar strings, por eso no dice el id
    }
    console.log(user)
}) //Un callback es una funcion que se pasa como argumento a otra funcion