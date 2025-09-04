import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
  constructor(
    private readonly githubService = new GithubService(),
    private readonly discordService = new DiscordService()
  ) {}

  //Podemos obtener la informacion del evento mediante el request del body (si lo configuramos con 'application/json')
  webHookHandler = (req: Request, res: Response) => {
    // Obtenemos el tipo de evento desde el header del request
    //Cuando el header empieza con `x-` es personalizado, de esa plataforma, en nuestro caso de github
    const githubEvent = req.header("x-github-event") ?? "unknown";

    /* 
    Que obtengamos `x-github-event` no quiere decir venga de github, puede ser falsificado y por eso github tambien nos envia un signature con el
    Header ---> x-hub-signature-256 el cual es un hash, pero a su vez esto tambien puede ser enviado al header, asi que implementamos la validacion de ese signature
    por medio de un middleware (ver github-sha256 middleware)
    
    // const signature = req.header("x-hub-signature-256");
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

    // Mandamos el mensaje que obtenemos de Github a Discord
    this.discordService
      .notify(message)
      .then(() => res.status(202).send("Accepted"))
      .catch(() => res.status(500).json({ error: "Internal Server Ereror" }));
  };
}
