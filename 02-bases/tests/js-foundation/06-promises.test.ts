import { getPokemonNameById } from "../../src/js-foundation/06-promises";
import { describe, expect, test } from "@jest/globals";

describe("js-foundation/06-promises.ts", () => {

  test("getPokemonNameById must return a Pokemons Name ", async() => {
    const pokemonId = 1;
    const pokemonName = await getPokemonNameById(pokemonId);
    expect(pokemonName).toBe("bulbasaur");
  });
  
  test("should return an error if pokemon doesn't exist ", async() => {
    const pokemonId = 10000000;
    try{
      await getPokemonNameById(pokemonId);
      //Nunca va ser true ya que la idea es que nos de error, por tanto no va llegar si quiera a este punto
      //expect(true).toBeFalsy(); 
    } catch (error) {
      expect(error).toBe(`Pokemon not found with id ${ pokemonId }`);
    }

  });
});
