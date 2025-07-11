import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

/**
 * Son solo las reglas de negocio, por eso lucen iguales a las interfaces de datasource.
 */

export abstract class LogRepository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(level: LogSeverityLevel): Promise<LogEntity[]>;
}
