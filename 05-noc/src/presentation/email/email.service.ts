// Plugin/Adapter para nodemailer
// Podemos enviar correos con este servicio.

import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[]; //opcional
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  //Creamos el transporter para enviar los correos. (Ver la documentacion de nodemailer)
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  /**
   * Para crear logs con los correos enviados, debemos inyectar el repositorio de logs.
   * por tanto creamos un constructor para inyectar el repositorio de logs cuando lo usemos
   * constructor(
   * private readonly logRepository: LogRepository
   * ) {}
   * Update: ya no lo inyectamos, lo borramos del constructor.
   *
   */
  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      //No usamos el valor retornado de sentInformation, pero lo tenemos por si acaso.
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      console.log("Message sent: ", sentInformation);
      return true;
    } catch {
      return false;
    }
  }

  async sendEMailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = "Logs del Server";
    const htmlBody = `
      <h3>System Logs - NOC</h3>
      <p>This is a test mail</p>
      <p>See attached logs</p>
    `;

    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
