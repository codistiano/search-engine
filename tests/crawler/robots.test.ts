import { describe, test, expect, vi, beforeEach } from "vitest";
import { RobotsTxt } from "../../src/crawler/robots";

describe("RobotsTxt", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("blocks disallowed path", async () => {
    // mock robots.txt
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => `
        User-agent: *
        Disallow: /admin
      `,
    } as any);

    const robots = new RobotsTxt();

    const res = await robots.isAllowed("https://example.com/admin");

    expect(res).toBe(false);
  });

  test("allows non-disallowed path", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => `
        User-agent: *
        Disallow: /admin
      `,
    } as any);

    const robots = new RobotsTxt();

    const res = await robots.isAllowed("https://example.com/home");

    expect(res).toBe(true);
  });

  test("allows everything if robots.txt missing", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    } as any);

    const robots = new RobotsTxt();

    const res = await robots.isAllowed("https://example.com/admin");

    expect(res).toBe(true);
  });

  test("uses cache (fetch called once)", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => `
        User-agent: *
        Disallow: /admin
      `,
    } as any);

    global.fetch = fetchMock;

    const robots = new RobotsTxt();

    await robots.isAllowed("https://example.com/admin");
    await robots.isAllowed("https://example.com/home");

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
