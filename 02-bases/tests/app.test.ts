import { describe, expect, test } from "@jest/globals";

describe("App", () => {
  test("Should be 30", () => {
    //1. Arrange (Preparar el entorno)
    const num1 = 10;
    const num2 = 20;

    //2. Act (Actuar sobre el entorno)
    const result = num1 + num2;

    //3. Assert (Afirmar que el resultado es el esperado)
    expect(result).toBe(30);
  });
});
