import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

//Creamos la instancia de la implementacion del repositorio de logs.
//Al ser llamado desde el constructor, se ejecuta el constructor de LogRepositoryImpl y se ejecuta el constructor de FileSystemDatasource.

//Si ocupamos otro repositorio, solo debemos crear una nueva instancia de LogRepositoryImpl con el nuevo datasource. y hacer los cambios en CheckService etc...
//Gracias a Clean Architecture, podemos cambiar el datasource sin tener que cambiar el codigo de CheckService, EmailService, etc...
const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource() // FileSystem Datasource
  //new MongoLogDataSource() //Mongo Datasource
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // Enviar correos
    /**
     * BEFORE (With logRepository Injected in EmailService):
     > Ahora debemos inyectar el repositorio de logs(en este caso `logRepository`) en el constructor de EmailService.
       const emailService = new EmailService(logRepository);
       emailService.sendEmail({
         to: envs.MAILER_EMAIL_RECEIVER,
         subject: "Test Mail",
         htmlBody: `
           <h3>System Logs - NOC</h3>
           <p>This is a test mail</p>
           <p>See attached logs</p>
         `,
       });

      emailService.sendEMailWithFileSystemLogs([
        "mail1",
        "mail2",
      ]);
     */
    /**
     * Update: Ya no lo inyectamos, lo borramos del constructor y Creamos un caso de uso para enviar los correos (Ahora todos incluyen la creacion de logs).
     > La diferencia es que ahora podemos enviar de uno a varios destinatarios.
     * 
     * Enviamos los correos con los logs a los destinatarios.
        new SendEmailLogs(emailService, logRepository).execute([
          "mail1",
          "mail2",
        ]);
     */

    // ------------------------------------------------------------

    // Creamos una tarea con cron que se ejecuta cada 5 segundos
    /**
     * Ahora creado el CheckService, podemos usarlo en el cron, para verificar si un sitio/servicio web esta disponible
     */

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com"; //"http://localhost:3000/"

    //   new CheckService(
    //     logRepository,
    //     // Inyectamos las dependencias (callbacks) , se ejecutan cuando se ejecuta el metodo execute
    //     () => console.log(`${url} is ok`), //undefined
    //     (error) => console.log(error) //undefined
    //   ).execute(url);

    //   /**
    //    * Si queremos usar un json server, podemos usar la url de json server:
    //    * http://localhost:3000/
    //    *
    //    * En este caso creamos un nuevo proyecto en 06-json-server para configurar un json-server (duuh)
    //    * y asi poder usarlo en este proyecto.
    //    * Ver: https://www.npmjs.com/package/json-server
    //    *
    //    * Nos deja setear un backend local para poder usarlo en el frontend.
    //    *
    //    * Pero nos quedaremos con el google.com para no complicarnos la vida.
    //    */
    // });

    // Obtenemos los logs del LogRepository (FileSystemDatasource, MongoLogDataSource, y/o PostgresLogDataSource)
    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);
  }
}
