/**
 * CheckService es un use case que se encarga de verificar si un sitio web esta disponible
 */

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

//Los use cases son clases con codigo que esta especializado en una tarea


//Definimos los tipos de las dependencias, para que no se mezclen con los tipos de la interfaz
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

// Le decimos a CheckService que implemente la interfaz CheckServiceUseCase (que es una interfaz que define el metodo execute)
export class CheckService implements CheckServiceUseCase {
  /**
   * La Dependencies Injection solo es colocar una dependencia en casos de uso, repositorios o datasources,
   *
   * Tradicionalmente se realiza en un constructor, o si trabajamos en Vanilla JS, en factory function.
   * el builder del factory recibe las dependencias y crea la funcion con las dependencias inyectadas.
   *
   * No es mas que agregarle dependencias a la clase
   * 
   * 
   * Caso de Uso llega al Repostorio y este llega al Datasource.
   * 
   * Aqui usamos la dependencia de LogRepository para guardar los logs.
   */

  constructor(
    // Inyeccion de Dependencias
    private readonly logRepository: LogRepository, //Puedo recibir cualquier repositorio que implemente la interfaz LogRepository.
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {

  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      //Creamos el log para cuando el servicio este funcionando.
      const log = new LogEntity(`Service with ${url} working`, LogSeverityLevel.low);
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {

      //Creamos el log para cuando el servicio este fallando.
      const errorMessage = `${url} is not OK: ${error}`;
      const log = new LogEntity(errorMessage, LogSeverityLevel.high);
      this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
