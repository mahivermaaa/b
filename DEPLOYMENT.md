# GitHub and Vercel handoff

## Verification

Use Node.js 24 (also selected by `.nvmrc` and `package.json`). From a clean checkout:

```sh
npm ci
npm run check
npm run audit:production
npm run build
npm run test:production
```

`check` runs ESLint, TypeScript and unit tests for enquiry validation/encoding and URL configuration. `test:production` starts a temporary production server on port 3100, verifies all 18 category pages, follows internal links and anchors, loads images/styles/scripts, checks metadata landmarks, query handling, 404s, robots and sitemap, and confirms the development HMR connection is absent. It stops its own server afterward. Set `TEST_PORT` if 3100 is occupied. GitHub Actions runs the same checks on pushes and pull requests.

## GitHub

Push the project root, including `package-lock.json`, `public/`, `src/`, scripts and the workflow. Exclude `node_modules/`, `.next/`, `.vercel/` and real `.env` files; `.gitignore` handles these. No GitHub remote or hosting account is assumed. Create/select the intended GitHub repository before adding its remote or pushing.

## Vercel

Import that GitHub repository as a **Next.js** project. Root directory: repository root. Node.js: **24.x**. Install: **npm ci**. Build: **npm run build**. Keep Output Directory on the framework default; do not set `out` or `dist`. No custom adapter, `vercel.json`, database, or backend setup is required. Vercel handles Next Image and the dynamic contact route.

Configure these environment variables before production deployment:

| Variable                      | Value / behaviour                                                                                                                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Verified business WhatsApp number, international digits only. Empty/invalid keeps the enquiry redirect disabled.                                                                                                                               |
| `NEXT_PUBLIC_SITE_URL`        | Actual HTTPS production origin. Used for metadata and sitemap. If absent or malformed on Vercel, the provided `VERCEL_PROJECT_PRODUCTION_URL` is used automatically. Elsewhere, absent/invalid origin safely produces no guessed sitemap URLs. |

Both public variables are build-time values: redeploy after changing them. The website prepares a WhatsApp message; it does not send messages or store leads. Check the recipient on a real device after configuration, without sending a test enquiry unless intended.

After the first hosted deployment, verify `/`, `/collections`, a category, `/contact`, `/why-us`, `/faqs`, `/robots.txt` and `/sitemap.xml`. Confirm mobile navigation and category preselection on the real domain. Local verification does not certify an unperformed hosted deployment.

## Client content still pending

The business WhatsApp number, final production domain and approved stock photography/product records are client inputs. Editorial illustrations are labelled and all category product lists are intentionally empty. Hero video remains disabled. Policy pages and social profiles remain out of navigation until approved content is available.

## Dependency audit

Production dependencies must pass `npm run audit:production`. The full audit currently reports five development-only findings from one `braces → micromatch → fast-glob → Next ESLint` chain. The registry has no patched `braces` release; npm's suggested fix downgrades the Next ESLint configuration to an incompatible major. Keep the matching Next.js/ESLint configuration and review upstream patches rather than running `npm audit fix --force`. These findings are not a claim of a clean full dependency audit.

References: [Vercel Next.js](https://vercel.com/docs/frameworks/full-stack/nextjs), [supported Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).
