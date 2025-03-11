import { buildLogger,logger as winstonLogger } from "../../src/plugins/logger.plugin";
import { describe, expect, jest, test } from "@jest/globals";

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
