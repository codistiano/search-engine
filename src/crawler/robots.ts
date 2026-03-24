import robotsParser from "robots-parser";

type Robots = ReturnType<typeof robotsParser>;

export class RobotsTxt {
  private userAgent = "MySearchBot/1.0";
  private cache: Map<string, Robots | null> = new Map();

  async isAllowed(targetUrl: string): Promise<boolean> {
    let urlObj: URL;

    try {
      urlObj = new URL(targetUrl);
    } catch {
      // Invalid URL → skip safely
      return false;
    }

    const host = urlObj.host;
    const robotsUrl = `${urlObj.protocol}//${host}/robots.txt`;

    // Fetch only if not cached
    if (!this.cache.has(host)) {
      await this.fetchAndCache(robotsUrl, host);
    }

    const rules = this.cache.get(host);

    // If no rules (fetch failed or no robots.txt) → allow
    if (!rules) return true;

    return rules.isAllowed(targetUrl, this.userAgent);
  }

  private async fetchAndCache(
    robotsUrl: string,
    host: string
  ): Promise<void> {
    try {
      const response = await fetch(robotsUrl, {
        headers: {
          "User-Agent": this.userAgent,
        },
      });

      // If robots.txt doesn't exist → allow everything
      if (!response.ok) {
        this.cache.set(host, null);
        return;
      }

      const text = await response.text();
      const parser = robotsParser(robotsUrl, text);

      this.cache.set(host, parser);
    } catch {
      // Network error → assume allowed
      this.cache.set(host, null);
    }
  }
}
