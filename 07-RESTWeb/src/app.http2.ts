import fs from "fs";
import http2 from "http2";

// Creamos el servidor http2 (https)
/* Debemos usar createSecureServer para usar http2 y tener un servidor seguro (https con certificados SSL)
   -Tambien debemos configurar las opciones, KEY y Cert (Certificados de seguridad) hay que generarlos.
   https://gist.github.com/Klerith/bc65ca4f398cadd7f292c26a04d62012 (Certificados de seguridad, solo Linux y Mac, con Windows quiza debamos configurar algo extra)


   - El certificado no es valido, por lo que nos mostrara una advertencia en el navegador, pero podemos ignorarla.
*/
const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlFile);
      return;
    }

    if (req.url?.endsWith(".js")) {
      res.writeHead(200, { "Content-Type": "application/javascript" });
    } else if (req.url?.endsWith(".css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
    }

    try {
      const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
      res.end(responseContent);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end();
    }
  }
);

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// Esto fue basicamente setear el web server con puro Node, Express, Fastify o NestJS nos ayudan mucho en estos casos.
