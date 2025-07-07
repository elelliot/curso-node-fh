import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ServerApp } from "./server-app";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

describe("ServerApp", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: "test-destination",
    fileName: "test-filename",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a server app instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("Should run ServerApp with default options", () => {
    const logSpy = jest.spyOn(console, "log"); //espiamos el log
    //Espiamos el createTable, y el prototype nos da los metodos de la clase, para escuchar el 'execute'
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");
    ServerApp.run(options);
    //Asersiones para ver si el log se llama las veces correctas (Server running y File Created, 3 si muestra la tabla, 2 si no)
    expect(logSpy).toHaveBeenCalledTimes(2); //Se llama 3 veces si muestra la tabla, si no , 2.
    expect(logSpy).toHaveBeenCalledWith("Server running...");
    expect(logSpy).toHaveBeenLastCalledWith("File Created");
    //Aserciones para creacion de la tabla
    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenLastCalledWith({
      base: options.base,
      limit: options.limit,
    });
    //Aserciones para la creacion el archivo
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenLastCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  /*
  Aqui usamos mocks para simular el comportamiento de las funciones, y ver si se ejecutan correctamente
  a diferencia de la anterior, donde si se ejecutan las funciones (Por tanto crea la tabla y el archivo).
  */
  test("Should run with custom values mocked", () => {
    // Mocks de logs (console.log y console.error), createTable y saveFile (Para simular el comportamiento de las funciones)
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    /*  
    -----> jest.fn().mockReturnValue("1 x 1 = 1") no funciona, da error en las siguientes operaciones por tanto implementamos el mock dentro de jest.fn()
    */
    const createTableMock = jest.fn(() => "1 x 1 = 1"); //Retorna un string vacio como si fuera la tabla
    const saveFileMock = jest.fn(() => false); //Retorna 'true' como si fuera el archivo creado o podemos hacer que retorne 'false' para simular error en la creacion del archivo

    // Asignamos los mocks a las funciones que queremos mockear
    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;

    // Ejecutamos la funcion y ahora las funciones que mockeamos se ejecutan
    ServerApp.run(options);

    // Aserciones para ver si las funciones se ejecutan correctamente
    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createTableMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "1 x 1 = 1",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });

    // Checar como se ven los mensajes de error en el archivo original
    // Si simulamos uno, debemos comentar los assertion del otro
    //expect(logMock).toHaveBeenCalledWith("File Created");
    expect(logErrorMock).toHaveBeenCalledWith("File not Created");

    //No se ve este  console.log({ wasCreated }) en el server-app.ts, why ?
    //Debuggeamos con ctrl+shift+p -> debug npm script -> test:watch y ya podemos poner breakpoints
  });
});
