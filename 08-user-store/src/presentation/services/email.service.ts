// Plugin/Adapter para nodemailer (Aqui en el servicio mismo lo adaptamos a diferencia de que les creamos su archivo adapter en 'config')
// Podemos enviar correos con este servicio.

import nodemailer, { Transporter } from "nodemailer";

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
  /*
  Creamos el transporter pero ahora sin las dependencias ocultas 
  (los envs incrustados aqui mero, checar el noc-app/email.service para referencia)
  Ahora los pasamos al constructor
  */
  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerEmail: string,
    senderEmailPassword: string
  ) {
    // Esta config es de QUIEN MANDA EL CORREO
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      //No usamos el valor retornado de sentInformation, pero lo tenemos por si acaso.
      // Aqui configuramos A QUIEN LE ENVIAMOS EL CORREO
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      console.log("Verification Mail sent correctly ------", sentInformation);
      return true;
    } catch {
      return false;
    }
  }
}
