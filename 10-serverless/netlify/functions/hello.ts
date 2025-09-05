/*
Para crear un `serverless function` con Netlify, debemos:
- Instalar `netlify cli` y despues autenticarnos con `netlify login`
- Crear un directorio `netlify/functions` en la raiz del proyecto y poner el archivo (este archivo por ejemplo) con la funcion.

---- PARA PROBAR EN LOCAL creamos un script o usamos `netlify dev` y nos abrira un dev server
para ejecutar una funcion abrimos el server y agregamos el endpoint que nos dice netlify,

Ejemplo:
/.netlify/functions/hello

Entonces para correr la funcion seria entrar a:
http://localhost:8888/.netlify/functions/hello

-------------------------------------------------------------------------------

Ver Docs: 
-- https://docs.netlify.com/build/functions/get-started/?data-tab=TypeScript
-- https://docs.netlify.com/api-and-cli-guides/cli-guides/local-development/

*/

import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(
    JSON.stringify({ message: "Hola perritas desde Netlify" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }, //Esto para que lo serialize como json
    }
  );
};

// Con esta config, podemos overridear el path por defecto que nos da netlify para acceder a nuestras funciones

export const config: Config = {
  // ANTES ----> http://localhost:8888/.netlify/functions/hello
  path: "/api/hello", //DESPUES ----> http://localhost:8888/api/hello
};

// La de la Doc oficial
// import type { Context } from "@netlify/functions";

// export default async (req: Request, context: Context) => {
//   return new Response("Hello, world!");
// };
