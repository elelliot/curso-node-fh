import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

/**
 * Sistema de logs en el filesystem.
 *
 * La implementacion de este datasource debe obedecer a las reglas de negocio (Domain) de LogDatasource.
 * es decir, debe implementar los metodos saveLog y getLogs como minimo.
 */
export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/"; // Por defecto, los logs se guardan en el directorio logs.
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  //Tan pronto se crea la instancia, se ejecuta este metodo (constructor) que crea el directorio logs si no existe y los archivos de logs.
  private createLogsFiles() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    /**
     * Queremos que los archivos de logs sean previamente creados.
     * Pero en vez de hacer esto 3 veces, podemos hacer un array de paths y recorrerlo.
     *
     * De esta forma podemos evitar repetir codigo (DRY aka Don't Repeat Yourself de Clean Code)
     */
    // if(fs.existsSync(this.allLogsPath)) return;
    // fs.writeFileSync(this.allLogsPath, '');

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      }
    );
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)} \n`;

    //Todos los logs se guardan en este archivo (allLogsPath)
    fs.appendFileSync(this.allLogsPath, logAsJson); // Solo agregamos contenido al archivo de logs, no tenemos que leer el archivo ni volver a escribirlo.

    //Si el log es de nivel low, no se guarda ya que esta en allLogsPath.
    if (newLog.level === LogSeverityLevel.low) return;

    //Si el log es de nivel medium, se guarda en mediumLogsPath. Si es de nivel high, se guarda en highLogsPath.
    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
    console.log("FileSystem Log saved: ");
  }

  //Evitamos repetir codigo (DRY) con...
  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8"); //Devuelve el contenido del archivo como un string.

    if (content === "") return [];

    const logs = content
      .split("\n")
      .filter((json) => json.trim() !== "") // Filter out empty strings and whitespace-only strings
      .map((json) => LogEntity.fromJson(json)); //Devuelve un array de LogEntity.
    return logs;
  };

  // Este metodo es para obtener los logs de un nivel de severidad especifico.
  // Debemos leer el archivo de logs y parsear el contenido a un array de LogEntity.
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      //Usamos el enum de LogSeverityLevel para hacer la comparacion.
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
