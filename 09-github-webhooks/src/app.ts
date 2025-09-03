import express from "express";
import { envs } from "./config";

(() => {
  main();
})();

function main() {
  const app = express();

  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
}
