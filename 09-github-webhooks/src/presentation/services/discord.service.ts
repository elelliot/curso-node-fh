import { envs } from "../../config";

export class DiscordService {
  private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  // Enviamos mensaje a webhook de discord (Al Server y Canal seteados en el webhook)
  async notify(message: string) {
    // Ver documentacion de Discord, armamos el objecto que debemos enviar
    const body = {
      content: message,
      // Agregar imagen al mensaje (gif)
      // embeds: [
      //   {
      //     image: {
      //       url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTV0dW9qYTVmaDd4cmM0M3d0cXFzc3RpZXB5bDFnaGtxdDZ1Mjd2aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0IybQ6l8nfKjxQv6/giphy.gif",
      //     },
      //   },
      // ],
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
