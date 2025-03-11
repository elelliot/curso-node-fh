import { getAge } from "../../src/plugins";
import { describe, expect, jest, test } from "@jest/globals";

describe("plugins/get-age-plugin.ts", () => {

  test("getAge() should return the age of the person", () => {
    //Testeamos que la funcion retorne un numero
    const birthdate = "1994-01-01";
    const age = getAge(birthdate);
    expect(typeof age).toBe( 'number' );
  });

  test("getAge should return current age", () => {
    //Testeamos basicamente el resultado de la funcion con el mismo proceso que hace la funcion
    const birthdate = "1985-01-01";
    const age = getAge(birthdate);

    const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear()
    expect(age).toBe(calculatedAge);   
  });
  
  //
  test("getAge should return 0 years", () => {
    //En las primeras pruebas getFullYear() devuelve correctamente el año actual
    //spyOn es una funcion que nos permite espiar metodos de una clase o prototipo, y podemos cambiar su comportamiento asi como su valor de retorno
    const spy = jest.spyOn(Date.prototype,'getFullYear').mockReturnValue(1995);

    //Justo despues de declarar el espia, el getAge ahora si va devolver el año del mockReturnValue
    const birthdate = "2005-12-31";
    const age = getAge(birthdate); 

    expect(age).toBe(0);
    expect(spy).toHaveBeenCalled();
  });
  
});
