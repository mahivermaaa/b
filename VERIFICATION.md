# Release verification — 23 October 2026

Verified locally on Windows with Node.js 24.11.1. This records completed local checks, not a hosted Vercel deployment or a GitHub Actions run.

| Check | Result |
| --- | --- |
| Clean `npm ci` | Passed after regenerating the inconsistent optional-dependency lockfile |
| ESLint | Passed, no warnings/errors |
| Next route type generation + TypeScript | Passed |
| Unit / portability tests | 11 passed, 0 failed |
| Next.js production build | Passed; 18 category routes generated |
| Production smoke suite | Passed: 41 page variants, 924 internal links/anchors, 19 script/style/image resources |
| Error / query handling | Missing routes return 404; unknown/repeated collection queries remain safe |
| Metadata | Titles, language and main landmark present; robots/sitemap endpoints load |
| Enquiry | Correct category preselection; changing collection resets form; disabled while business number is missing |
| Mobile accessibility | Menu opening, Escape, focus return/wrapping and background scroll locking passed |
| Responsive browser checks | No horizontal overflow at 320 px, 390 px, 768 px or desktop |
| Browser console | No warnings/errors during the tested flow |
| Rendered DOM | One main landmark after hydration; no broken loaded images on homepage |
| Production dependency audit | 0 vulnerabilities |
| Full dependency audit | 5 development-only findings in one upstream Next ESLint / braces chain; no compatible registry patch available |
| Secret-pattern scan | 0 findings in the candidate upload files (not a guarantee against all secret formats) |

The production scripts contained no development HMR connection. The checked script chunks totalled approximately 183 KB gzip; local timings are not real mobile speed scores.

Site URL parsing now safely handles malformed values and falls back to Vercel's production domain. The explicit URL/fallback combinations are unit-tested. With no local domain configured, the local sitemap intentionally contains no guessed URLs. Configure the real domain / business WhatsApp in Vercel, redeploy, and check the hosted domain as described in [DEPLOYMENT.md](DEPLOYMENT.md).

GitHub Actions is configured to repeat the clean install, code checks, production audit, build and smoke suite. No GitHub remote has been selected and no remote push or Vercel deployment has been performed.
