import { Request, Response } from "express";
import { GithubService } from "./services/github.service";

export class GithubController {
  constructor(private readonly githubService = new GithubService()) {}

  //Podemos obtener la informacion del evento mediante el request del body (si lo configuramos con 'application/json')
  webHookHandler = (req: Request, res: Response) => {
    // Obtenemos el tipo de evento desde el header del request
    //Cuando el header empieza con `x-` es personalizado, de esa plataforma, en nuestro caso de github
    const githubEvent = req.header("x-github-event") ?? "unknown";

    /* 
    Que obtengamos `x-github-event` no quiere decir venga de github, puede ser falsificado y por eso github tambien nos envia un signature con el
    Header ---> x-hub-signature-256 el cual es un hash, pero a su vez esto tambien puede ser enviado al header, entonces como es la seguridad ????

    To be Continued...
    // const signature = req.header("x-hub-signature-256") ?? "unknown";
    */

    const payload = req.body; //Aqui obtenemos la data del payload mandado por el webhook cuando se trigerea el evento.
    let message: string;
    switch (githubEvent) {
      case "star":
        message = this.githubService.onStar(payload); // solo como nota, el `payload` es 'any', asi que seria bueno mapear o tipar aqui tambien
        break;
      case "issues":
        message = this.githubService.onIssue(payload);
        break;
      default:
        message = `Unknown Event: ${githubEvent}`;
    }

    console.log({ message });

    res.status(202).send("Accepted");
  };
}
