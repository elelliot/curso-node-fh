import { envs } from "../../config";

export class DiscordService {
  private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  // Enviamos mensaje a webhook de discord (Al Server y Canal seteados en el webhook)
  async notify(message: string) {
    // Ver documentacion de Discord, armamos el objecto que debemos enviar
    const body = {
      content: message,
    };

    const resp = await fetch(this.discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), //Usualmente el body en POST cross-domain, va como string, por eso el stringify
    });

    if (!resp.ok) {
      console.error("Error sending message to Discord");
      return false;
    }

    return true;
  }
}
