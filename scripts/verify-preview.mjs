import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";
import { pathToFileURL } from "node:url";

const decode = (value) => value.replaceAll("&amp;", "&");
const attributes = (html, expression) =>
  [...html.matchAll(expression)].map((match) => decode(match[1]));

export async function verifyPreview(origin = "http://127.0.0.1:3000") {
  const base = new URL(origin);
  const pages = new Map();
  const resources = new Set();
  const links = [];
  const pending = new Set([
    "/",
    "/collections",
    "/why-us",
    "/faqs",
    "/contact",
  ]);
  let compressedScripts = 0;
  let scriptsChecked = 0;
  const started = performance.now();
  async function readPage(path) {
    const response = await fetch(new URL(path, base), {
      signal: AbortSignal.timeout(15000),
    });
    assert.equal(response.status, 200, `Page failed: ${path}`);
    assert.match(response.headers.get("content-type") ?? "", /text\/html/);
    const html = await response.text();
    assert.match(html, /<html[^>]+lang="en"/, `Missing language: ${path}`);
    assert.match(html, /<title>[^<]+<\/title>/, `Missing title: ${path}`);
    // Next.js streams a hidden page alongside the loading fallback; final DOM uniqueness is checked in the browser.
    assert.match(html, /<main[^>]+id="main"/, `Missing main landmark: ${path}`);
    pages.set(path, html);
    for (const href of attributes(html, /<a\b[^>]*href="([^"]+)"/g)) {
      const target = new URL(href, new URL(path, base));
      if (target.origin !== base.origin) continue;
      const targetPath = target.pathname + target.search;
      pending.add(targetPath);
      links.push({ from: path, target: targetPath, hash: target.hash });
    }
    for (const src of attributes(html, /<img\b[^>]*src="([^"]+)"/g)) {
      if (!src.startsWith("data:")) resources.add(new URL(src, base).href);
    }
    for (const src of attributes(html, /<script\b[^>]*src="([^"]+)"/g))
      resources.add(new URL(src, base).href);
    for (const href of attributes(
      html,
      /<link\b[^>]*href="([^"]+\.css(?:\?[^"]*)?)"/g,
    ))
      resources.add(new URL(href, base).href);
    return html;
  }
  // Discover the complete public navigation, including all category enquiry links.
  for (const path of pending) if (!pages.has(path)) await readPage(path);
  const categoryLinks = attributes(
    pages.get("/collections"),
    /<a\b[^>]*href="(\/collections\/[^"?#]+)"/g,
  );
  assert.equal(
    new Set(categoryLinks).size,
    18,
    "All 18 category pages must be linked",
  );
  for (const { from, target, hash } of links)
    if (hash)
      assert.ok(
        pages.get(target).includes(`id="${decodeURIComponent(hash.slice(1))}"`),
        `Broken anchor ${hash} from ${from}`,
      );
  for (const resource of resources) {
    const response = await fetch(resource, {
      signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 200, `Resource failed: ${resource}`);
    const type = response.headers.get("content-type") ?? "";
    if (new URL(resource).pathname.endsWith(".js")) {
      const source = await response.text();
      assert.ok(
        !source.includes("/_next/hmr"),
        "Production must not ship the dev HMR connection",
      );
      compressedScripts += gzipSync(source).length;
      scriptsChecked++;
    } else
      assert.match(
        type,
        /^(image\/|text\/css)/,
        `Unexpected resource type: ${resource}`,
      );
  }
  // CSS background files are not represented by <img> elements.
  for (const path of [
    "/images/editorial/bengal-campaign.webp",
    "/images/editorial/thread-story.webp",
    "/images/brand/bunonbari-logo-transparent.png",
  ]) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, `Background/logo missing: ${path}`);
    assert.match(response.headers.get("content-type") ?? "", /^image\//);
  }
  for (const path of ["/collections/not-a-category", "/missing-page"])
    assert.equal(
      (await fetch(new URL(path, base))).status,
      404,
      `Missing page should be 404: ${path}`,
    );
  for (const path of [
    "/contact?collection=unknown",
    "/contact?collection=jamdani&collection=tissue",
  ])
    assert.equal(
      (await fetch(new URL(path, base))).status,
      200,
      `Invalid enquiry query should be safe: ${path}`,
    );
  const robots = await fetch(new URL("/robots.txt", base));
  const sitemap = await fetch(new URL("/sitemap.xml", base));
  assert.equal(robots.status, 200);
  assert.equal(sitemap.status, 200);
  assert.ok((await robots.text()).includes("User-Agent: *"));
  const xml = await sitemap.text();
  assert.match(xml, /<urlset/);
  // An unconfigured local origin intentionally produces an empty sitemap.
  const urls = attributes(xml, /<loc>([^<]+)<\/loc>/g);
  if (urls.length)
    assert.equal(
      urls.length,
      23,
      "Sitemap should contain 5 main pages and 18 categories",
    );
  console.log(
    `PASS: ${pages.size} pages, 18 categories, ${links.length} internal links/anchors, ${resources.size} scripts/styles/images`,
  );
  console.log(
    `PASS: metadata landmarks, safe queries, 404s, robots and sitemap (${urls.length} URLs)`,
  );
  console.log(
    `PASS: ${scriptsChecked} production script chunks, ${Math.round(compressedScripts / 1024)} KB gzip, no development HMR`,
  );
  console.log(
    `Local verification duration: ${Math.round(performance.now() - started)} ms (not a mobile performance score)`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await verifyPreview(process.argv[2]);
