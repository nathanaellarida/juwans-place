# Security notes

## Dependency audit

Last reviewed: 2026-07-31.

`npm audit --omit=dev` reports PostCSS and Sharp advisories through Next.js
16.2.12, the current `next` release at review time. Next pins PostCSS 8.4.31
and allows Sharp 0.34.x; the patched Sharp release is outside that supported
range. npm does not offer a compatible automated fix.

The current exposure is limited:

- the application has no upload route, database, authentication, or server
  action;
- it does not accept user-controlled CSS, source maps, or image paths;
- remote image hosts are not enabled in `next.config.ts`; and
- the shipped site is statically prerendered.

Upgrade Next.js promptly when its supported dependency ranges include the
patched versions, then re-run the complete validation suite. Do not use
`npm audit fix --force` if it proposes a framework downgrade or an unsupported
dependency override.

The development-only audit also reports a brace-expansion issue in the ESLint
9 dependency graph. ESLint 10 resolves that package advisory, but is not yet
compatible with the React lint plugin bundled by `eslint-config-next` 16.2.12.
This code is not included in the production application.

## Application safeguards

- Public integration values accept HTTP(S) URLs only.
- Missing integrations render explicit unavailable states.
- External links use `noopener noreferrer`.
- The site exposes only general-area location context.
- No direct payment or reservation flow is present.
- Property imagery is local, reviewed, and controlled through the generated
  manifest.
- Exact address, entry, key, lock, and access-control information must remain
  off the public site.
