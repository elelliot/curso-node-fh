import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import("./yargs.plugin"); //Importamos el archivo yarg.plugin.ts de forma dinamica

  return yarg; //retorna el config de yarg
};

describe("Test yargs.plugin.ts", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("Should return default values", async () => {
    /*
    Por defecto ocupamos la base en yargs, es seteada en el script de dev, pero no en el de test, asi que implementamos un mock
    de lo contrario el archivo se ejecuta sin '-b' por defecto y da error.
    */
    const argv = await runCommand(["-b", "5"]);
    // console.log(argv);

    //Solo queremos probar los valores por defecto (checamos el yargs plugin para ver los valores por defecto), pero solo usamos las abreviaturas en nuestra app, por tanto seran las que probaremos
    //objectContaining es para que no falle por los valores que no usamos, es decir el minimo objeto que debe recibir
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  test("Should return custom values", async () => {
    const argv = await runCommand([
      "-b",
      "66",
      "-l",
      "2",
      "-s",
      "-n",
      "custom-table",
      "-d",
      "custom-test-outputs",
    ]);

    console.log(argv); //Toma los valores por defecto debido a la prueba anterior pero ahora con la limpieza ya se ven los actuales

    expect(argv).toEqual(
      expect.objectContaining({
        b: 66,
        l: 2,
        s: true,
        n: "custom-table",
        d: "custom-test-outputs",
      })
    );
  });
});
