import { buildLogger,logger as winstonLogger } from "../../src/plugins/logger.plugin";
import { describe, expect, jest, test } from "@jest/globals";

/*
----------------------COVERAGE
-Ejecutamos npm run test:coverage para ver la cobertura de los test
-Tambien podemos abrir el index.html que viene en la carpeta coverage/lcov-report/index.html
   -Nos arroja datos de la cobertura de los test


-----------------------BUILD
-Podemos hacer la build SOLO si los test pasan:
ANTES: ----> "build": "rimraf ./dist && tsc",
AHORA: ----> "build": "npm run test && rimraf ./dist && tsc",

-"start" ya no ejecutaria la build, solo el archivo dist/app.js
ANTES: ----> "start": "npm run build && node dist/app.js"
AHORA: ----> "start": "node dist/app.js"
*/







describe("plugins/logger-plugin.ts", () => {

  test("buildLogger() should return a function logger", () => {
    const logger = buildLogger("test");

    expect(typeof logger.log).toBe("function");
    expect(typeof logger.error).toBe("function");
  });
  
  test("logger.log should log a message", () => {
    // console.log(logger)

    //Arrange
    const winstonLoggerMock = jest.spyOn(winstonLogger, "log");
    const message = "test message";
    const service = "test service";

    const logger = buildLogger(service);

    //Act
    logger.log(message);

    //Assert
    expect(winstonLoggerMock).toHaveBeenCalled();

    //Evaluamos que se haya llamado con los argumentos en objectContaining, ese es el minimo objeto que debe recibir
    expect(winstonLoggerMock).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({
        level:'info',
        message,
        service
      })
    );
  });
  
});
