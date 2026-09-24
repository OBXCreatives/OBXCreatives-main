# Deployment handoff — obxcreatives.art

Status as of 2026-09-24 (second session). The site is live at `https://obxcreatives.art` with a Netlify certificate; DNS records are still grey-clouded, so Cloudflare's proxy (step 3.3 onwards) is the remaining work.

## Decisions already made (confirmed by the owner)

| Question | Decision |
| --- | --- |
| Supabase purpose | Contact + quote submissions. One `enquiries` table, row-level security allowing inserts only, plus a working form on the site so the connection is used end to end. |
| Cloudflare mode | Proxied (orange cloud) with SSL mode **Full (strict)**, so traffic gets WAF/CDN/DDoS protection. |
| Hostname | `obxcreatives.art` serves the site, `www` redirects to it. Other subdomains stay free for other sites. |

## Done

- **Supabase**: reused the existing project **OBXCreatives Project** (`lnyjveenyeqximpfxuia`, eu-central-1 / Frankfurt), restored from paused. Migration `create_enquiries` adds `public.enquiries` with length checks on every column, RLS on, and `anon` granted `insert (kind, name, email, message)` only. Security advisor: no findings.
  - Verified: a form submission lands as a row; the publishable key gets `permission denied` on select and on inserting `created_at`.
  - Read enquiries in the dashboard: Table Editor → `enquiries`. One test row from the verification (`Deployment test (Claude)`) is there and can be deleted.
  - **Open risk:** free-tier projects pause after about a week without API requests. Page views don't touch Supabase, only form submissions do, so a quiet week pauses the project and the form shows its error message until someone restores it. Fix with a weekly keep-alive request (e.g. a Netlify scheduled function) or the Pro plan.
- **Form**: `src/components/Enquiry.tsx`, section `#contact` (also answers to `#quote` and opens the quote tab). Honeypot field `website` absorbs simple bots.
- **Keys**: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (the `sb_publishable_…` key, not the legacy anon JWT) are set in Netlify (all contexts, builds scope) and in `.env.local` (gitignored). Never ship the secret/service-role key.
- **DNS + certificate** (grey-cloud stage): root and `www` CNAMEs point at Netlify; Let's Encrypt certificate for both names issued 2026-09-24, valid to 2026-12-23; `www` and `http://` redirect to `https://obxcreatives.art`. Powered by Netlify badge turned off.
- **Netlify**: site `obxcreatives` (id `188504c1-bd0f-49e5-8333-8d8e1d7d491f`, team `obxcreatives`, free plan) → `https://obxcreatives.netlify.app` once deployed. Team-login protection now applies to non-production deploys only, so production is public.

## Remaining work

1. ~~Link GitHub in Netlify~~ — done by the owner; pushes to `main` now build production. (The connector's own deploy command embeds a short-lived token in the shell command, which Claude Code's auto mode blocks.)
2. ~~Custom domain on Netlify~~ — `obxcreatives.art` added; Netlify shows "Pending DNS verification". Ignore its "update DNS at your registrar" wording: DNS lives on Cloudflare, not WordPress.
3. **Cloudflare**. WordPress is not reachable today (see status), so nothing working is lost.
   1. DNS: delete all eight `A`/`AAAA` records on the root and `www` (a CNAME cannot coexist with them). Add `CNAME @ → apex-loadbalancer.netlify.com` (Netlify's documented apex target; Cloudflare flattens it) and `CNAME www → obxcreatives.netlify.app`. Both **DNS only (grey cloud)**. Keep the `n8n` CNAME.
   2. Wait for Netlify's Domain management page to verify DNS and show the Let's Encrypt certificate for both names.
   3. SSL/TLS → Overview → **Full (strict)**, then switch both records to **Proxied (orange)**. Full (strict) validates Netlify's certificate; proxying before it exists gives 526 errors. Setting the mode last also avoids touching the WordPress origin while it still serves.
   4. SSL/TLS → Edge Certificates → **Always Use HTTPS: On**. Once proxied, Cloudflare reaches Netlify over HTTPS even for `http://` visitors, so Netlify's own HTTP→HTTPS redirect no longer fires; Cloudflare has to do it. No loop risk under Full (strict).
   5. Leave these alone: MX `mx1/mx2.titan.email`, TXT SPF `v=spf1 include:spf.titan.email ~all`, `titan1._domainkey` DKIM and `_dmarc` records.
   6. Caching → Purge everything.
4. **Verify**: `https://obxcreatives.art` returns 200 with a valid certificate, `server: cloudflare`, the Netlify build (not WordPress), `www` redirects to the root, and a form submission lands in `enquiries`.

## Pitfalls

- Cloudflare proxy + Netlify needs Full (strict) **and** the domain registered on Netlify **and** an issued certificate, otherwise you get redirect loops or 525/526 errors.
- Netlify only issues or installs a certificate once it sees the domain's DNS pointing at Netlify, so the records must be grey-clouded until the certificate exists. A Cloudflare Origin CA certificate uploaded to Netlify does not avoid this, because the same DNS check applies. Let's Encrypt certificates renew about every 90 days. If Netlify ever reports a renewal failure while proxied, grey-cloud both records until it renews, then switch back.
- Vite inlines `VITE_*` variables at build time. If they are missing, the Supabase client is dropped from the bundle and the form only shows its error message. Check them with a read-back after setting them (the connector once reported success without saving), and redeploy after any change.
- Cloudflare caching can serve stale assets after a deploy; purge the cache after DNS cutover.
- The Cloudflare Developer Platform connector covers Workers/KV/R2/D1 only. It has no DNS or SSL tools, so step 3 is done in the Cloudflare dashboard.
- The repo tracks `Work.zip`, `design assets/` and video files. They inflate clone and build times, and Netlify will fetch them on every build; consider moving them out of the repo later.
