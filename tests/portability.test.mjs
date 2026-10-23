import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(path.join(directory, entry.name))
      : [path.join(directory, entry.name)],
  );
function assertExactCase(filename) {
  const relative = path.relative(root, filename);
  let current = root;
  for (const segment of relative.split(path.sep)) {
    assert.ok(
      readdirSync(current).includes(segment),
      `Linux filename case mismatch: ${relative}`,
    );
    current = path.join(current, segment);
  }
}
const sources = files(path.join(root, "src")).filter((file) =>
  /\.(tsx?|css)$/.test(file),
);
test("local imports resolve with Linux-compatible filename case", () => {
  let checked = 0;
  for (const source of sources.filter((file) => /\.tsx?$/.test(file))) {
    const text = readFileSync(source, "utf8");
    for (const [, specifier] of text.matchAll(
      /(?:from\s+|import\s*)["']([^"']+)["']/g,
    )) {
      if (!specifier.startsWith("@/") && !specifier.startsWith(".")) continue;
      const base = specifier.startsWith("@/")
        ? path.join(root, "src", specifier.slice(2))
        : path.resolve(path.dirname(source), specifier);
      const target = [
        base,
        base + ".ts",
        base + ".tsx",
        base + ".mjs",
        path.join(base, "index.ts"),
        path.join(base, "index.tsx"),
      ].find(
        (candidate) =>
          existsSync(candidate) &&
          !readdirSync(path.dirname(candidate), { withFileTypes: true })
            .find((entry) => entry.name === path.basename(candidate))
            ?.isDirectory(),
      );
      assert.ok(target, `Unresolved local import ${specifier} in ${source}`);
      assertExactCase(target);
      checked++;
    }
  }
  assert.ok(checked > 20, "Expected to check the actual application imports");
});
test("every locally referenced image exists with deployment-safe filename case", () => {
  const images = new Set();
  for (const source of sources) {
    const content = readFileSync(source, "utf8");
    if (source.endsWith(".css")) {
      for (const [, image] of content.matchAll(
        /["'](\/images\/[^"']+\.(?:png|webp|jpg|jpeg|svg))["']/g,
      ))
        images.add(image);
    } else {
      // Parse actual literals so documentation examples in comments are not treated as assets.
      const syntax = ts.createSourceFile(
        source,
        content,
        ts.ScriptTarget.Latest,
        true,
      );
      const visit = (node) => {
        if (
          ts.isStringLiteral(node) &&
          /^\/images\/.+\.(png|webp|jpe?g|svg)$/.test(node.text)
        )
          images.add(node.text);
        ts.forEachChild(node, visit);
      };
      visit(syntax);
    }
  }
  assert.ok(images.size >= 7);
  for (const image of images) {
    const filename = path.join(root, "public", image);
    assert.ok(existsSync(filename), `Missing public asset: ${image}`);
    assertExactCase(filename);
  }
});
