import type { HandlerEvent, Config, Context } from "@netlify/functions";

//En lugar de usar ngrok como url para el Webhook de Github, usaremos el que esta deployado en netlify
// Aqui no estamos usando el Secret_Key que usabamos para verificar el Header que nos da Github

const notify = async (message: string) => {
  // Ver documentacion de Discord, armamos el objecto que debemos enviar
  const body = {
    content: message,
  };

  const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? "", {
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
};

const onStar = (payload: any): string => {
  const { action, sender, repository } = payload;

  return `User ${sender.login} ${action} star on ${repository.full_name} (From NETLIFY)`;
};

const onIssue = (payload: any): string => {
  const { action, issue } = payload;
  if (action === "opened") {
    return `An issue was opened with this title: ${issue.title} (From NETLIFY)`;
  }

  if (action === "closed") {
    return `An issue was closed by: ${issue.user.login} (From NETLIFY)`;
  }

  if (action === "reopened") {
    return `An issue was reopened by: ${issue.user.login} (From NETLIFY)`;
  }

  return `Unhandled action for the issue event: ${action} (From NETLIFY)`;
};

export default async (req: Request, context: Context) => {
  // Asi agarramos el header aqui sin express
  const githubEvent = req.headers.get("x-github-event") ?? "unknown"; //No andamos verificando el header como en la otra seccion

  //Leemos el body y lo convertimos a json, eso hace el metodo `.json()` del `req` (Regresa un promise, por eso el `await`)
  const payload = (await req.json()) ?? "{}";

  let message: string;
  switch (githubEvent) {
    case "star":
      message = onStar(payload);
      break;
    case "issues":
      message = onIssue(payload);
      break;
    default:
      message = `Unknown Event: ${githubEvent}`;
  }

  await notify(message);

  return new Response(
    JSON.stringify({ message: "Discord function finished" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const config: Config = {
  path: "/api/github-discord",
};
