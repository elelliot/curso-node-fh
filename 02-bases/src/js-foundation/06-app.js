const { getPokemonById } = require("./js-foundation/06-promises");

//Chained then approach (without callback)
getPokemonById(1)
  .then((pokemon) => console.log(pokemon))
  //El error que yo regrese en la funcion, lo recibo aqui en el catch
  .catch((err) => console.log(err))
  .finally(() => console.log("Pokemon API call finished"));

//callback approach
// getPokemonById(1, (pokemon) => {
//   console.log(pokemon);
// });
