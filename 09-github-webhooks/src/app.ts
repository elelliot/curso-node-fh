/*
 - Webhooks
 - Los webhooks son comunicacion desde servicios web basada en eventos. Cuando ocurre algun evento, el servicio emite una notificacion(request)
 mediante un REST API Endpoint con POST o Edge Function a una URL(endpoint) previamente configurada.


 Para crear un Webhook con Github y probarlo:
 - Debemos crear un endpoint que haga POST para que escuche el Webhook
 
 - Dentro de un repositorio en Github , vamos a -> Settings - > Webhooks - > Add Webhook
 - El payload URL no debe ser local, por tanto podemos crear un tunel con ngrok
    - El URL debemos hacerlo apuntar al endpoint, por tanto terminaria con `api/github` y podemos
    probarlo en POSTMAN
 - application/json (tambien puede ser x-www-form-urlencoded, pero recibiriamos la respuesta de forma diferente)
      --- "application/json will deliver the JSON payload directly as the body of the POST request."
      --- "application/x-www-form-urlencoded will send the JSON payload as a form parameter called payload."


 Por obvias razones, no podemos poner el localhost, debemos minimo compartir una URL mediante un tunel, ya que esas
 si estarian publicadas.


 Ahora el Flujo (Sin contemplar el Webhook de Discord)--------------------------
 1- Creamos y Configuramos los eventos del Webhook y seteamos una url que va escuchar el servicio (Github en nuestro caso)
 En este punto tenemos el `url/endpoint` configurado con ciertos eventos configurados para escuchar
 2- Nuestra aplicacion deberia estar corriendo con un tunel (NGROK) para poder escuchar los eventos
 3- Trigereamos algun evento (Star o Issues en Github)
 4 - Nuestro endpoint se trigerea 
 */

import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { GithubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware";

(() => {
  main();
})();

function main() {
  const app = express();

  const controller = new GithubController();

  // Recordar que Express ocupa un middleware para poder serializar las peticiones de application/json (la cual configuramos asi en el Webhook)
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true })); // Por si llegamos a configurarlo en x-www-form-urlencoded

  // Declaramos las rutas
  app.post(
    "/api/github",
    [GithubSha256Middleware.verifyGithubSignature],
    controller.webHookHandler
  );

  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
}
