import { describe, expect, test } from "@jest/globals";
import { ServerApp } from "./server-app";

describe("ServerApp", () => {
  test("should create a server app instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });
});
