// Con HTTP 1.1

import fs from "fs";
import http from "http";

// Creamos el servidor
const server = http.createServer((req, res) => {
  console.log(req.url); // Imprimimos la url de la petición

  // Escribimos en el body de la respuesta (La podemos ver en el navegador)
  // res.write("Hello there");
  //Cerramos la respuesta para ya no esperar más peticiones, si no, se quedaría esperando
  // res.end();

  /* Server Side Rendering
    - Normalmente nosotros queremos especificar que tipo de informacion es la respuesta
    - En este caso, especificamos que es html (Server Side Rendering, es decir, el servidor renderiza el html y lo envía al cliente)
    - Tambien podemos especificar el status code de la respuesta en este caso: 200 (OK)
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello there</h1>");
    res.end();
  */

  // Para regresar un JSON
  // Es de lo más común que hagamos en una API
  // const data = { name: "John", age: 30, city: "New York" };
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.end(JSON.stringify(data)); // Podemos ahorrarnos el res.write(JSON.stringify(data)); y mandarlo por el res.end

  // Para leer un archivo html en el url raiz
  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8"); // Buscamos el archivo y lo leemos (utf-8 es el encoding por defecto)
    res.writeHead(200, { "Content-Type": "text/html" }); // Le decimos que el contenido es html
    res.end(htmlFile); //Mandamos el archivo html al cliente
    return;
  }

  /* 
  - El server hace requests a los archivos css y js desde el index.html (se ven en la consola con el req.url), 
  por lo que no los podremos leer con el puro readFileSync del HTML
  - Por tanto podemos usar req.url para detectar los archivos
  */

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
  } else if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  }

  //Handleamos el error del favicon.ico, ya que tambien quiere hacer un request a un archivo que no existe
  //Mandamos el javascript y el css (Para evitar el error de favicon.ico, lo agregamos al public folder)
  try {
    const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8"); //Asumiendo que los archivos están en la carpeta public
    res.end(responseContent);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end();
  }
});

// Iniciamos el servidor en el puerto 8080
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
