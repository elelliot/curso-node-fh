import { CronJob } from "cron";
//Creamos un adapter para cron, para que sea mas facil de usar y adaptar a cambios en el futuro

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  // Si tenemos mas de 3 argumentos, mejor mandar un objeto segun CLEAN CODE
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(cronTime, onTick);
    job.start();

    return job;
  }
}
