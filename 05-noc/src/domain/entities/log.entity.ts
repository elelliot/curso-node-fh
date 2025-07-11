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
    high = "high"
}



export class LogEntity {
    public message: string;
    public level: LogSeverityLevel;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    /**
     * Estatico para no tener que crear una instancia de LogEntity.
     * Devolvemos un LogEntity a partir de un json.
     *    Esto tambien se conoce como un factory constructor en la clase, ya que devuelve una instancia de LogEntity.
    */
    //"{"level":"low","message":"test","createdAt":"2025-07-10T12:00:00.000Z"}"
    static fromJson = (json: string): LogEntity => {
        const {
            message, 
            level, 
            createdAt
        } = JSON.parse(json); //Devuelve un objeto con las propiedades level, message y createdAt.
        
        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt); //La fecha no queremos que se cree en el constructor, sino en el momento de la creacion del log y debemos parsear la fecha ya que viene como string.
        return log;
    }
}