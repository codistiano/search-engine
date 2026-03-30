import { describe, test, expect } from "vitest";
import { RobotsTxt } from "../../src/crawler/robots.js";

describe("RobotsTxt", () => {
  test("blocks disallowed path", async () => {
    const robots = new RobotsTxt();

    const res = await robots.isAllowed("https://example.com/admin");

    expect(res).toBe(false);
  });

  test("accepts allowed path", async () => {
    const robots = new RobotsTxt();

    const res = await robots.isAllowed(
      "https://en.wikipedia.org/wiki/Computer_science",
    );

    expect(res).toBe(true);
  });

  test("allows everything if robots.txt missing", async () => {
    const robots = new RobotsTxt();

    const res = await robots.isAllowed("https://example.com/admin");

    expect(res).toBe(true);
  });
});
