import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { Log, Level } from "../../data/postgres/models/log.entity";
import { AppDataSource } from "../../config/plugins/typeorm.plugin";

// Hacemos la equivalencia de severities (El de Domain) a Level (El de Postgres)
const severityEnum = {
  low: Level.LOW,
  medium: Level.MEDIUM,
  high: Level.HIGH,
};

export class PostgresLogDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    //Create Log para guardar en Postgres
    const newLog = new Log();
    newLog.message = log.message;
    newLog.origin = log.origin;
    newLog.level = severityEnum[log.level];
    newLog.createdAt = log.createdAt;
    await AppDataSource.manager.save(newLog);
    console.log("Saved a new Log with Postgres!");
  }
  async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
    // Buscamos por severity
    console.log("Loading logs from the Postgres DB...");
    const level = severityEnum[severity];
    const logs = await AppDataSource.manager.find(Log, {
      where: {
        level: level,
      },
    });
    console.log("Loaded logs: ", logs);
    return logs.map((log) => LogEntity.fromObject(log));
  }
}
