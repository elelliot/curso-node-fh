import { buildMakePerson } from "../../src/js-foundation/05-factory";
import { describe, expect, test } from "@jest/globals";

describe("js-doundation/05-factory.ts", () => {
  const getUUID = () => "1234";
  const getAge = () => 31;

  test("buildMakePerson should return a function", () => {
    const makerPerson = buildMakePerson({ getUUID, getAge });
    expect(typeof makerPerson).toBe("function");
  });

  test("makePerson should return a person", () => {
    const makerPerson = buildMakePerson({ getUUID, getAge });
    const johnDoe = makerPerson({ name: "John Doe", birthdate: "1990-01-09" });

    expect(johnDoe).toEqual({
      id: "1234",
      name: "John Doe",
      birthdate: "1990-01-09",
      age: 31,
    });
  });
});
