# Deployment handoff — obxcreatives.art

Status as of 2026-09-24. The site builds and is pushed to GitHub; nothing is deployed yet.

## Decisions already made (confirmed by the owner)

| Question | Decision |
| --- | --- |
| Supabase purpose | Contact + quote submissions. One `enquiries` table, row-level security allowing inserts only, plus a working form on the site so the connection is used end to end. |
| Cloudflare mode | Proxied (orange cloud) with SSL mode **Full (strict)**, so traffic gets WAF/CDN/DDoS protection. |
| Hostname | `obxcreatives.art` serves the site, `www` redirects to it. Other subdomains stay free for other sites. |

## Verified facts

- **GitHub**: `https://github.com/OBXCreatives/OBXCreatives-main`, branch `main`. Pushes work from this machine via cached Windows credentials; the `gh` CLI is installed but **not** logged in.
- **Build**: `npm run build` → `dist/`. Config is in `netlify.toml` (Node 20, SPA fallback, asset caching, basic security headers).
- **DNS** (queried against 1.1.1.1):
  - Nameservers are Cloudflare: `gracie.ns.cloudflare.com`, `tate.ns.cloudflare.com`.
  - Root `obxcreatives.art` → `104.21.33.64`, `172.67.159.70` (Cloudflare proxy IPs; currently fronting the WordPress site).
  - `www.obxcreatives.art` → no record yet.
  - TXT: `v=spf1 include:spf.titan.email ~all` — **email SPF, do not touch.** Check for other mail records (MX, DKIM `_domainkey`) before changing anything.
- **Credentials on this machine**: none for Netlify, Supabase or Cloudflare. `~/.supabase` exists but holds only telemetry, no access token.

## Blocker that caused this handoff

The Netlify, Supabase and Cloudflare Developer Platform connectors show status `pending`: enabled for the session but never dialled, so they expose no tools. They cannot be reconnected mid-session. Connectors are applied when a session starts, so a fresh session should bring them up. If they still show `pending`, they need signing in from **+ menu → Connectors**.

## Remaining work

1. **Netlify** — create a site from the GitHub repo (build `npm run build`, publish `dist`), confirm the first deploy is green, then add `obxcreatives.art` and `www.obxcreatives.art` as custom domains. Netlify must know the domain or Cloudflare-proxied requests fail certificate validation.
2. **Supabase** — create the project (note the region; the audience is South African, so `eu-west` or the closest available is a reasonable pick). Then:

   ```sql
   create table public.enquiries (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     name text not null,
     email text not null,
     message text not null,
     kind text not null default 'contact' check (kind in ('contact', 'quote'))
   );

   alter table public.enquiries enable row level security;

   -- Anonymous visitors may submit, but never read back.
   create policy "anon can insert enquiries"
     on public.enquiries for insert to anon with check (true);
   ```

   Reading enquiries should happen through the Supabase dashboard or a service-role key, never the anon key.
3. **Wire the keys** — set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify's environment variables, and locally in `.env.local` (already gitignored). The anon key is safe in client code *only* because row-level security restricts it to inserts; never ship the service-role key.
4. **Build the form** — a contact/quote form wired to the `CONTACT US` / `GET A QUOTE` buttons, posting to `enquiries`. Verify a real row lands in the table.
5. **Cloudflare** — set SSL/TLS to **Full (strict)** *first*, then point the root and `www` at the Netlify site (`<site>.netlify.app`), both proxied. Root needs CNAME flattening. Expect the WordPress site to stop serving at the root once this changes — confirm that's intended before switching.
6. **Verify** — request `https://obxcreatives.art` and confirm a 200, a valid certificate, `server: cloudflare` in the response headers, and that the page is the Netlify build and not WordPress.

## Pitfalls

- Cloudflare proxy + Netlify needs Full (strict) **and** the domain registered on Netlify, otherwise you get redirect loops or certificate errors.
- Cloudflare caching can serve stale assets after a deploy; purge the cache after DNS cutover.
- The repo tracks `Work.zip`, `design assets/` and video files. They inflate clone and build times, and Netlify will fetch them on every build; consider moving them out of the repo later.
