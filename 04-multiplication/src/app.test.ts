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

import { describe, test, expect } from "@jest/globals";

describe("App", () => {
  test("should be true", () => {
    expect(true).toBe(true);
  });
});
