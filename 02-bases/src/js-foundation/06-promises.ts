//Ahora usamos el plugin del http-client que creamos
//const { http } = require("../plugins"); //Remember, el index.js ya lo expone y no necesitamos ponerlo en el import (Se puede pero no es necesario)

//Importamos el plugin del http-client que migramos a typescript
import { httpClient as http } from "../plugins";


//Ahora devuelve el name del pokemon en vez de un objeto
export const getPokemonNameById = async (id: string | number):Promise<string> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await http.get(url);
  return pokemon.name;
};

//Async await approach
//Una funcion async retorna una promesa (id: any) => Promise<any>
// const getPokemonById = async (id) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

//   const resp = await fetch(url);
//   const pokemon = await resp.json();

//   // throw new Error("R.I.P pokemon");
//   return pokemon.name;
// };

//Chained then approach (without callback) and Promises
// const getPokemonById = (id) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

//   //Queremos manejar el error y el caso de exito por fuera , asi que retornamos la promesa (el fetch)
//   return (
//     fetch(url)
//       //Al retornar una promesa dentro de un then, se puede encadenar otro then
//       .then((resp) => resp.json())
//       .then((pokemon) => pokemon.name)
//   );
// };

//Callback approach.

/*
Cons: 
-Tenemos then anidados, lo cual puede ser dificil de leer y mantener.
*/
// const getPokemonById = (id, callback) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

//   fetch(url).then((response) => {
//     response.json().then((pokemon) => {
//       //return pokemon.name ; //Si hago un return no sirve por el Scope
//       callback(pokemon.name);
//     });
//   });
// };

// module.exports = {
//   getPokemonById,
// };
