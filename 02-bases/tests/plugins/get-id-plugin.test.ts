import { getUUID } from "../../src/plugins";
import { describe, expect, jest, test } from "@jest/globals";

describe("plugins/get-id-plugin.ts", () => {

  test("getUUID() should return a UUID", () => {
    const uuid = getUUID();
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(36);
  });
});
