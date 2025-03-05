import { getUserById } from "../../src/js-foundation/03-callbacks";
import { describe, expect, test } from "@jest/globals";

describe("js-doundation/03-callbacks.ts", () => {
  test("getUserById should return an error if user does not exist", (done) => {
    const id = 10;

    //Con codigo bloqueante, el test fallaria ya que el callback se ejecuta de manera asincrona, y para ese momento el test ya termino
    //Antes de que el codigo del callback termine (el setTimeout), el test ya termino. por eso se usa done(), para que el test espere a que el callback termine

    getUserById(id, (err, user) => {
      //Si no hay usuario, deberia retornar un error (el error deberia ser igual a `User NOT found with ID ${id}` ya que ese es el error que se retorna en la funcion)
      expect(err).toBe(`User NOT found with ID ${id}`);
      expect(user).toBeUndefined();
      // throw new Error("Not yet implemented");
      done();
    });
  });
});
