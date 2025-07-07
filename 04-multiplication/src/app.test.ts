/*
npm install -D jest @types/jest ts-jest supertest
npx jest --init

En jest.config.ts agregamos:
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

en package.json agregamos:
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",

*/

//Ya que estamos creando las pruebas dentro del src, debemos excluir los tests del tsconfig.json para que no se transpilen
//"exclude": ["node_modules", "src/**/*.test.ts"],

import { describe, test, expect, jest } from "@jest/globals";
import { ServerApp } from "./presentation/server-app";

describe("Test App.ts", () => {
  test("Should call ServerApp.run with values", async () => {
    const serverRunMock = jest.fn(); //Mockeamos la funcion ServerApp.run para que no se ejecute

    ServerApp.run = serverRunMock; //Asignamos el mock a la funcion ServerApp.run

    //Simulamos los argumentos que se pasan al script
    process.argv = [
      "node",
      "app.ts",
      "-b",
      "10",
      "-l",
      "5",
      "-s",
      "-n",
      "test-file-argenv",
      "-d",
      "test-destination-argenv",
    ];

    await import("./app"); //Importamos el app.ts para que se ejecute y se llame a la funcion ServerApp.run

    //Assertions

    //Aserciones para ver si se llama a la funcion ServerApp.run con los valores correctos (Solo la llama, no ejecuta, es decir no crea la tabla ni el archivo)
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 5,
      showTable: true,
      fileName: "test-file-argenv",
      fileDestination: "test-destination-argenv",
    });
  });
});
