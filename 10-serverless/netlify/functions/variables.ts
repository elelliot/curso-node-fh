import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Tambien podemos leer envs en netlify functions
  const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

  if (!myImportantVariable) {
    throw new Error("Missing MY_IMPORTANT_VARIABLE"); //Este error da mas informacion de la que queremos darle a alguien, asi que nel
  }

  return new Response(JSON.stringify({ myImportantVariable }), {
    status: 200,
    headers: { "Content-Type": "application/json" }, //Esto para que lo serialize como json
  });
};

export const config: Config = {
  // ANTES ----> http://localhost:8888/.netlify/functions/hello
  path: "/api/variables", //DESPUES ----> http://localhost:8888/api/hello
};
