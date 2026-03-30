import robotsParserImport = require("robots-parser");

const robotsParser = robotsParserImport as unknown as (
  url: string,
  content: string,
) => any;

type Robots = ReturnType<typeof robotsParser>;

export class RobotsTxt {
  private userAgent = "MySearchBot/1.0";
  private cache: Map<string, Robots | null> = new Map();

  async isAllowed(targetUrl: string): Promise<boolean> {
    let urlObj: URL;

    try {
      urlObj = new URL(targetUrl);
    } catch {
      return false;
    }

    const host = urlObj.host;
    const robotsUrl = `${urlObj.protocol}//${host}/robots.txt`;

    if (!this.cache.has(host)) {
      await this.fetchAndCache(robotsUrl, host);
    }

    const rules = this.cache.get(host);

    if (!rules) return true;

    return rules.isAllowed(targetUrl, this.userAgent);
  }

  private async fetchAndCache(robotsUrl: string, host: string): Promise<void> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(robotsUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": this.userAgent,
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        this.cache.set(host, null);
        return;
      }

      const text = await response.text();
      const parser = robotsParser(robotsUrl, text);

      this.cache.set(host, parser);
    } catch {
      this.cache.set(host, null);
    }
  }
}
