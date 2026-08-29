# Bright Data — verified command surface

**Every command here was verified against official documentation.** `CLAUDE.md` forbids
inventing Bright Data flags, and this file is what that rule points at. If a command is
not on this page, run `--help` and add it here before using it.

## Install

```bash
curl -fsSL https://cli.brightdata.com/install.sh | sh
# or
npm install -g @brightdata/cli
```

## Auth

```bash
brightdata login
```
The CLI accepts an API key via **`BRIGHTDATA_API_KEY`**.
**Never** echo the key into terminal output, a commit, or generated code.

## Commands

```bash
brightdata scrape <url>              # one-shot fetch
brightdata scraper create ...        # create a Scraper Studio collector
brightdata scraper run ...           # run a collector
brightdata scraper heal ...          # request an AI repair of a broken collector
brightdata scraper approve ...       # accept a proposed repair
brightdata add mcp                   # write MCP config using the stored login
```

> ⚠️ The binary is **`brightdata`**, not `bdata`. A guessed command is a failed demo.

## MCP server

`brightdata/brightdata-mcp` — usable as a hosted endpoint with a token in the connection
URL, or run locally via `@brightdata/mcp`. This is the cleanest "pipeline inside the
agent" path: TrueForge calls Bright Data through MCP and consumes structured results.
~5,000 free requests/month for basic fetch/search/markdown operations.

## Self-healing — what it actually is

Bright Data's self-heal is **real but human-supervised**, and the documented Studio flow
can take **up to 15 minutes**. Initial collector generation takes ~10 minutes.

**Therefore, pressing Heal is not an agentic repair pipeline.** To satisfy the track we
must build the control loop ourselves:

1. Detect schema or semantic failure via the target's `verify` predicate.
2. Capture the failing fixture.
3. Invoke `brightdata scraper heal`.
4. Validate the proposed draft against our invariants.
5. Pause for **human approval** through the harness.
6. Promote the repaired revision, bump `revision`, log to `drift-log.md`.
7. Re-run the consumer workflow and show it recover.

**Demo consequence:** create and validate the collector *well before* the demo, and keep
a previously captured failing fixture. Never start a cold heal on stage — the 15-minute
worst case is longer than the entire presentation.

## Cost note

The $50 Bright Data grant is documented for the separate Scrape-Verse event; a grant for
the Agent Harness event is **UNVERIFIED**. Confirm with organizers before designing costs
around it. MCP's free monthly allowance applies regardless.
