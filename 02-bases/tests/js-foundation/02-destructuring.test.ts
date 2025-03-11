import { characters } from "../../src/js-foundation/02-destructuring";
import { describe, expect, test } from "@jest/globals";

//Podemos usar el command palette y seleccionar Debug:npm script y darle al de test o test:watch
//Y setear los breakpoints en el codigo (Asi podemos detectar si hay console logs en el codigo testeado)

describe("js-foundation/02-destructuring.ts", () => {
  test("Characters shouild contain Flash, Superman", () => {
    expect(characters).toContain("Flash");
    expect(characters).toContain("Superman");
  });

  test('first character should be "Flash", and second "Superman"', () => {
    const [flash, superman] = characters;
    expect(flash).toBe("Flash");
    expect(superman).toBe("Superman");
  });
});
