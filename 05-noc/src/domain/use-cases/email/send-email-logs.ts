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
      const sent = await this.emailService.sendEMailWithFileSystemLogs(to);
      if (!sent) throw new Error("Error sending email log");

      const log = new LogEntity({
        message: "Log Email Sent",
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
    } catch (error) {
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
