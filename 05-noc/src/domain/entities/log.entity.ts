/**
 * Las reglas de negocio van en domain (Domain Driven Design) y ahi mismo manejamos las entidades.
 *
 * Las entidades son objetos que representan una parte de la logica de negocio:
 *
 * un usuario, un producto, un pedido, etc,.
 * Son agnositcas a las bases de datos, solo de la logica de negocio.
 *
 */

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string; //Cual es el archivo que genero el log?
  createdAt?: Date;
}

export class LogEntity {
  public message: string;
  public level: LogSeverityLevel;
  public createdAt: Date;
  public origin: string;

  //Como agregamos 'origin', ya tenemos 3 args, mejor usemos un objeto (LogEntityOptions)
  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options; //Si no viene createdAt, se crea una nueva fecha.
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  /**
   * Estatico para no tener que crear una instancia de LogEntity.
   * Devolvemos un LogEntity a partir de un json.
   *    Esto tambien se conoce como un factory constructor en la clase, ya que devuelve una instancia de LogEntity.
   */
  // "{"level":"low","message":"test","createdAt":"2025-07-10T12:00:00.000Z"}"
  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    const { message, level, createdAt, origin } = JSON.parse(json); //Devuelve un objeto con las propiedades level, message y createdAt.

    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin,
    });
    //Como ahora ponemos
    // log.createdAt = new Date(createdAt); //La fecha no queremos que se cree en el constructor, sino en el momento de la creacion del log y debemos parsear la fecha ya que viene como string.
    return log;
  };

  //Creamos un factory function para crear un `LogEntity` basado en un objeto de Mongo (Mongoose)
  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message,
      level,
      origin,
      createdAt,
    });

    return log;
  };
}
