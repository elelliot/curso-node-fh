import { Server } from "./presentation/server";

// Los archivos .https no usan Express.
(async () => {
  main();
})();

async function main() {
  const server = new Server();
  server.start();
}
