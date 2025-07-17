import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

// Guardamos el Log en MongoDB
export class MongoLogDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    // await newLog.save(); // Es ideal pero en realidad es opcional ya que create ya lo guarda
    console.log("Mongo Log created!");
  }
  async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
    console.log("Loading logs from the MongoDB...");
    // Buscamos por severity
    const logs = await LogModel.find({
      level: severity,
    });

    // Devolvemos los logs en formato LogEntity
    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
