/**
 * Datasource contiene el origen de los datos, por ejemplo, un archivo, una base de datos, etc.
 * 
 * Repository es el encargado de llamar a los datasource y devolver los datos.
 *
 * 
 *  
 * En domain, solo manejamos las reglas de negocio, no las implementaciones.
 * creamos las interfaces o clases abstractas para poder poner las reglas de como queremos que los datasources se comporten.
 */

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";



/**
 * Cualquier origen debe implementar el saveLog y getLogs
 */
export abstract class LogDatasource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(level: LogSeverityLevel): Promise<LogEntity[]>;
}

