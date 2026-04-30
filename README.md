# Campaign360 Beta

Next.js + TypeScript + Tailwind + Supabase starter for secure campaign operations.

## Setup
1. `cp .env.example .env.local` and fill Supabase keys.
2. Install deps: `npm install`.
3. Run app: `npm run dev`.
4. Apply SQL in `supabase/migrations/0001_campaign360_beta.sql`.

## Scope implemented
- App Router project scaffold with sidebar layout.
- Dashboard cards scaffold.
- Route scaffolds for voters/pledges/events/reports/settings, including `/voters/import`.
- Supabase schema for requested entities + RLS starter policies + import_logs.

## Security notes
- Keep voter data private; never expose service role key client-side.
- Expand RLS policies before production.
