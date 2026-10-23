import test from "node:test";
import assert from "node:assert/strict";
import { parseSiteOrigin, resolveSiteOrigin } from "../src/lib/site-origin.ts";

test("valid site URLs normalise to an origin", () => {
  assert.equal(
    parseSiteOrigin(" https://example.com/catalogue?view=1 "),
    "https://example.com",
  );
  assert.equal(
    parseSiteOrigin("http://localhost:3000/"),
    "http://localhost:3000",
  );
});
test("empty, malformed or unsafe URL settings cannot crash the build", () => {
  for (const value of [
    undefined,
    "",
    "   ",
    "https://",
    "https://[invalid",
    "example.com",
    "javascript:alert(1)",
    "ftp://example.com",
    "https://user:password@example.com",
  ])
    assert.equal(parseSiteOrigin(value), undefined, value);
});
test("Vercel domain fallback works without overriding a valid custom origin", () => {
  assert.equal(
    resolveSiteOrigin(undefined, "showroom.vercel.app"),
    "https://showroom.vercel.app",
  );
  assert.equal(
    resolveSiteOrigin("https://", "showroom.vercel.app"),
    "https://showroom.vercel.app",
  );
  assert.equal(
    resolveSiteOrigin("https://example.com", "showroom.vercel.app"),
    "https://example.com",
  );
  assert.equal(resolveSiteOrigin(undefined, undefined), undefined);
  assert.equal(resolveSiteOrigin("bad", "[invalid"), undefined);
});
