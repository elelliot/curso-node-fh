import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(
    private readonly logDataSource: LogDatasource //Inyeccion de dependencias, la idea es que podamos cambiar este datasource mientras implemente los metodos (saveLog y getLogs).
  ) {}

  async saveLog(log: LogEntity): Promise<void> {
    await this.logDataSource.saveLog(log);
  }
  async getLogs(level: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(level);
  }
}
