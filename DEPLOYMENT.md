# Deployment handoff — obxcreatives.art

Status as of 2026-09-24 (second session). Supabase and the enquiry form are live and verified. The Netlify site exists but has **no deploy yet**, and Cloudflare still points at WordPress.

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
- **Netlify**: site `obxcreatives` (id `188504c1-bd0f-49e5-8333-8d8e1d7d491f`, team `obxcreatives`, free plan) → `https://obxcreatives.netlify.app` once deployed. Team-login protection now applies to non-production deploys only, so production is public.

## Remaining work

1. **Link GitHub in Netlify** (owner: needs a GitHub OAuth approval). Netlify → project `obxcreatives` → Project configuration → Build & deploy → Link repository → GitHub → `OBXCreatives/OBXCreatives-main`, branch `main`. `netlify.toml` supplies the build command and publish dir. Confirm the first deploy is green and `obxcreatives.netlify.app` shows the site with a working form.
   - Why not the connector: its deploy command embeds a short-lived token in the shell command, which Claude Code's auto mode blocks. The owner can run it themselves if linking GitHub is not wanted.
2. **Custom domains on Netlify**: Domain management → Add domain → `obxcreatives.art` (Netlify adds `www` as an alias and redirects it to the primary). Skip Netlify DNS; DNS stays on Cloudflare.
3. **Cloudflare**. This takes the WordPress site off the root, so get the owner's go-ahead first.
   1. SSL/TLS → Overview → **Full (strict)**.
   2. DNS: replace the root record(s) with `CNAME obxcreatives.art → obxcreatives.netlify.app` (Cloudflare flattens it), and add `CNAME www → obxcreatives.netlify.app`. Start both as **DNS only (grey cloud)**.
   3. Wait for Netlify's Domain management page to show the Let's Encrypt certificate issued for both names, **then** switch both records to **Proxied (orange)**. Full (strict) validates that certificate; proxying before it exists gives 526 errors.
   4. Leave these alone: MX `mx1/mx2.titan.email`, TXT SPF `v=spf1 include:spf.titan.email ~all`, `titan1._domainkey` DKIM and `_dmarc` records.
   5. Caching → Purge everything.
4. **Verify**: `https://obxcreatives.art` returns 200 with a valid certificate, `server: cloudflare`, the Netlify build (not WordPress), `www` redirects to the root, and a form submission lands in `enquiries`.

## Pitfalls

- Cloudflare proxy + Netlify needs Full (strict) **and** the domain registered on Netlify **and** an issued certificate, otherwise you get redirect loops or 525/526 errors.
- Cloudflare caching can serve stale assets after a deploy; purge the cache after DNS cutover.
- The Cloudflare Developer Platform connector covers Workers/KV/R2/D1 only. It has no DNS or SSL tools, so step 3 is done in the Cloudflare dashboard.
- The repo tracks `Work.zip`, `design assets/` and video files. They inflate clone and build times, and Netlify will fetch them on every build; consider moving them out of the repo later.
