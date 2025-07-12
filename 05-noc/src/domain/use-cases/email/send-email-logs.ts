import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    /**
     * Inyectamos correo , servicio y repositorio para grabar los logs de los correos enviados.
     */
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      // Al ser opcionales los attachments, podemos simplemente enviar el array vacio y lo acepta.
      const sent = await this.emailService.sendEMailWithFileSystemLogs(to);
      if (!sent) throw new Error("Error sending email log");

      // Creamos el log de que se envio el correo correctamente. y lo guardamos en el repositorio (fileSystemLogRepository).
      const log = new LogEntity({
        message: "Log Email Sent",
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
    } catch (error) {
      // Creamos el log de que hubo error al enviar el correo. y lo guardamos en el repositorio (fileSystemLogRepository).
      const log = new LogEntity({
        message: "Error sending email log",
        level: LogSeverityLevel.high,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
    return true;
  }
}
