/*
 Para testear en POSTMAN el Websocket, debemos solo poner `ws:localhost:3000`,
 ya que usamos el protocolo `ws`, no el `http`
 pero como postman pone automaticamente el `ws:` solo basta con poner el `localhost:3000`


 Para probar desde un front-end, abrimos `12-websockets-front`, y corremos 
 `npx http-server -o` para que nos monte el cliente con su servidor
 */

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

// ---------------- Cuando un cliente se conecta (`ws` seria el websocket del cliente que se conecta, manda mensaje etc.) ------------------
wss.on("connection", function connection(ws) {
  console.log("Client Connected");

  //   console.log("Handshake (Connection) info -------> ", ws);

  // --- Cuando hay un error
  ws.on("error", console.error);

  // ---- Cuando recibimos un mensaje del cliente conectado
  ws.on("message", function message(data) {
    //Enviamos al cliente lo que recibimos de el, podemos enviarle un string, o un json (como string)
    const payload = JSON.stringify({
      type: "custom-message",
      payload: `--------${data.toString().toUpperCase()}--------`,
    });

    // Enviamos el mensaje a todos los clientes conectados MENOS al que mando el mensaje
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
    // * Enviamos el mensaje a todos los clientes conectados (incluyendo a quien envia el mensaje)
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    //Enviamos al mismo cliente
    // ws.send(JSON.stringify(payload)); // Trigereamos el socket.onmessage del cliente
  });

  // ---- Cuando el cliente se conecta, manda el mensaje automaticamente (Esto trigerea el socket.onmessage del cliente)
  //   ws.send("Hello from the server");

  // Cuando el cliente se desconecta
  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});

console.log("Server running on : http://localhost:3000");
