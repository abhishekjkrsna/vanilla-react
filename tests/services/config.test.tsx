import { expect, test } from "vitest";
import { swapiBaseUrl } from "../../src/services/config";

const baseUrl = "https://swapi.dev/api";

test("Test base url for the project", () => {
  expect(swapiBaseUrl).toBe(baseUrl);
});
