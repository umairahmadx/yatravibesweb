import handler from "./dist/server/server.js";
import fs from "node:fs";
import path from "node:path";

async function generateStatic() {
  const routes = ["/"];

  for (const routePath of routes) {
    const url = `http://localhost${routePath}`;
    console.log(`Prerendering HTML for ${routePath}...`);
    const res = await handler.fetch(new Request(url));
    if (res.status !== 200) {
      throw new Error(
        `Failed to pre-render path ${routePath}, status: ${res.status}`,
      );
    }
    const html = await res.text();

    const targetDir =
      routePath === "/" ? "dist/client" : path.join("dist/client", routePath);

    fs.mkdirSync(targetDir, { recursive: true });
    const targetFile = path.join(targetDir, "index.html");
    fs.writeFileSync(targetFile, html, "utf-8");
    console.log(`Saved ${targetFile} (${html.length} bytes)`);
  }

  // Generate _redirects for SPA routing fallback on Cloudflare Pages
  const redirectsFile = path.join("dist/client", "_redirects");
  fs.writeFileSync(redirectsFile, "/* /index.html 200\n", "utf-8");
  console.log(`Saved ${redirectsFile}`);
}

generateStatic().catch((err) => {
  console.error(err);
  process.exit(1);
});
