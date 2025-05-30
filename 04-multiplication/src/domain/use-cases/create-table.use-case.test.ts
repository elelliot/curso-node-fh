import { describe, expect, test } from "@jest/globals";
import { CreateTable } from "./create-table.use-case";

describe("", () => {
  test("should create table with default values", () => {
    const createTable = new CreateTable();

    const table = createTable.execute({ base: 2 });
    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("2 x 1 = 2");
    expect(table).toContain("2 x 10 = 20");
    expect(rows).toBe(10);
  });

  test("should create table with custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    }; //No hace falta poner la interfaz aqui ya que si no cumple con la interfaz, typescript lo va a detectar

    const createTable = new CreateTable();

    const table = createTable.execute(options);
    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("3 x 1 = 3");
    expect(table).toContain("3 x 10 = 30");
    expect(table).toContain("3 x 20 = 60");
    expect(rows).toBe(options.limit);
  });
});
