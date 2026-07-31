import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import chromiumBinary from "@sparticuz/chromium";
import { chromium } from "playwright-core";

const port = 3005;
const baseUrl = `http://127.0.0.1:${port}`;
const captureDirectory = path.resolve("implementation-captures");
const routes = [
  "/",
  "/the-home",
  "/gallery",
  "/location",
  "/house-rules",
  "/faq",
  "/privacy",
  "/booking-safety",
  "/accessibility",
];
const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

await fs.mkdir(captureDirectory, { recursive: true });

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)],
  {
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Next server did not become ready.\n${serverOutput}`);
}

let browser;

try {
  await waitForServer();
  browser = await chromium.launch({
    args: chromiumBinary.args.filter((argument) => argument !== "--single-process"),
    executablePath: await chromiumBinary.executablePath(),
    headless: true,
  });

  const desktopContext = await browser.newContext({ viewport: viewports[6] });
  const desktop = await desktopContext.newPage();
  const consoleErrors = [];
  desktop.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  desktop.on("pageerror", (error) => consoleErrors.push(error.message));

  for (const route of routes) {
    const response = await desktop.goto(`${baseUrl}${route}`, {
      waitUntil: "networkidle",
    });
    if (!response?.ok()) {
      throw new Error(`${route} returned ${response?.status() ?? "no response"}`);
    }
    if (!(await desktop.locator("main").count())) {
      throw new Error(`${route} has no main landmark`);
    }
  }

  await desktop.goto(baseUrl, { waitUntil: "networkidle" });
  await desktop
    .getByRole("status", { name: /Loading Juwan’s Place/i })
    .waitFor({ state: "hidden", timeout: 8_000 })
    .catch(() => undefined);

  await desktop.getByRole("button", { name: "Open menu" }).click();
  await desktop
    .getByRole("dialog", { name: "Site navigation" })
    .waitFor({ state: "visible" });
  await desktop.waitForTimeout(900);
  await desktop.screenshot({
    path: path.join(captureDirectory, "menu-desktop.png"),
  });
  await desktop.keyboard.press("Escape");
  await desktop
    .getByRole("dialog", { name: "Site navigation" })
    .waitFor({ state: "hidden" });
  await desktop.screenshot({
    path: path.join(captureDirectory, "hero-desktop.png"),
  });

  await desktop.locator("#home-intro").scrollIntoViewIfNeeded();
  await desktop.waitForTimeout(500);
  await desktop.screenshot({
    path: path.join(captureDirectory, "intro-desktop.png"),
  });

  await desktop.locator("footer").scrollIntoViewIfNeeded();
  await desktop.waitForTimeout(600);
  await desktop.screenshot({
    path: path.join(captureDirectory, "footer-desktop.png"),
  });

  for (const viewport of viewports) {
    await desktop.setViewportSize(viewport);
    await desktop.goto(baseUrl, { waitUntil: "networkidle" });
    const overflow = await desktop.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    if (overflow > 1) {
      throw new Error(
        `Horizontal overflow of ${overflow}px at ${viewport.width}×${viewport.height}`,
      );
    }

    if (viewport.width === 390) {
      await desktop.screenshot({
        path: path.join(captureDirectory, "hero-mobile.png"),
      });
      await desktop.getByRole("button", { name: "Open menu" }).click();
      await desktop.waitForTimeout(900);
      await desktop.screenshot({
        path: path.join(captureDirectory, "menu-mobile.png"),
      });
      await desktop.keyboard.press("Escape");
      await desktop.locator("footer").scrollIntoViewIfNeeded();
      await desktop.waitForTimeout(500);
      await desktop.screenshot({
        path: path.join(captureDirectory, "footer-mobile.png"),
      });
    }
  }

  const uniqueErrors = [...new Set(consoleErrors)].filter(
    (message) => !message.includes("favicon"),
  );
  if (uniqueErrors.length) {
    throw new Error(`Console errors:\n${uniqueErrors.join("\n")}`);
  }

  console.log(
    `Smoke-tested ${routes.length} routes and ${viewports.length} viewports.`,
  );
  await desktopContext.close();
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
