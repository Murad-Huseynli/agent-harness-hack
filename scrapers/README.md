# Scraper registry

Version-controlled Bright Data scrape configuration. **The contract is in
[`../CLAUDE.md`](../CLAUDE.md)** — this file documents the schema.

Every target is one entry in `registry.json`. Nothing is a one-off terminal command:
if a scrape is worth running twice, it is worth a row here.

## Schema

```jsonc
{
  "id": "kebab-case-id",          // stable; referenced by the app
  "description": "what this feeds",
  "url": "https://…",             // or a URL template with {placeholders}
  "command": "…",                 // the EXACT terminal command, copied from real
                                  // Bright Data CLI / Scraper Studio output.
                                  // NEVER hand-written from memory.
  "revision": 1,                  // bumped by every repair
  "fields": {                     // the structured shape we expect back
    "title": "string",
    "price": "number"
  },
  "verify": {                     // cheap structural assertions, run on EVERY fetch
    "minRows": 5,
    "required": ["title", "price"],
    "types": true
  },
  "lastVerified": "2026-08-29T00:00:00Z",
  "notes": ""
}
```

## Drift and repair

`verify` failing is a **site drift event**, not an error to retry. The repair flow:

1. Log the failure to [`drift-log.md`](./drift-log.md) with the date and what broke.
2. Re-derive the extraction rule against the page as it is now.
3. Bump `revision`, update `command` / `fields`, refresh `lastVerified`.
4. Re-run `verify`. It must pass before the pipeline is considered recovered.

Drift is always *detected and logged*, never silently swallowed. A pipeline that fails
quietly is worse than one that fails loudly.

## Harvested data

Payloads land in `scrapers/data/` — **gitignored**. The registry is versioned; the
harvest is not.
