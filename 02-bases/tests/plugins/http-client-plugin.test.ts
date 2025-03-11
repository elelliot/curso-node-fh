import { httpClientPlugin } from "../../src/plugins/http-client.plugin";
import { describe, expect, jest, test } from "@jest/globals";

describe("plugins/http-client-plugin.ts", () => {

  test("httpClientPlugin() should return a string", async() => {
    const data = await httpClientPlugin.get("https://jsonplaceholder.typicode.com/todos/1");

    // expect(typeof data).toBe("object");
    console.log(data)
    expect(data).toEqual({
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": expect.any(Boolean) //No me importa si es true o false como tal, solo que sea booleano
    })
  });
  
  test("httpClientPlugin() should have POST, PUT and DELETE methods", () => {

    expect(typeof httpClientPlugin.post).toBe("function");
    expect(typeof httpClientPlugin.put).toBe("function");
    expect(typeof httpClientPlugin.delete).toBe("function");
  });
});
