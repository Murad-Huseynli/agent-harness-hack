# Bright Data — verified command surface

**Every signature on this page was captured from real `--help` output**, not from
documentation. The raw capture is in [`cli-help-output.md`](cli-help-output.md).
Installed: `@brightdata/cli` v0.3.5, 2026-08-29.

> **Correction (2026-08-29).** An earlier revision of this file asserted "the binary is
> `brightdata`, not `bdata`. A guessed command is a failed demo." **That was wrong**, and
> Qodo caught it on PR #1. The npm manifest declares both:
> `{ brightdata: 'dist/index.js', bdata: 'dist/index.js' }` — `bdata` is a first-class
> alias with an identical entry point, and both are on PATH after install. Commands copied
> from Bright Data's own quickstart using `bdata` are valid. Kept visible rather than
> silently edited, because the wrong version was used to tell a teammate their command was
> invented.

## Install

```bash
npm install -g @brightdata/cli
```
Installs **both** `brightdata` and `bdata`. They are the same program.

## Auth

```bash
brightdata login          # opens a browser
brightdata init           # interactive setup wizard for auth + defaults
brightdata config get <key>
brightdata config set <key> <value>
```
Global flag `-k, --api-key <key>` overrides env/config for a single invocation.
**Never** echo a key into terminal output, a commit, or generated code.

## Top-level commands (verbatim)

```
login          Authenticate with Bright Data (opens browser)
logout         Clear stored Bright Data credentials
scrape <url>   Scrape a URL using the Web Unlocker API
search <query> Search the web using the SERP API
pipelines <type> [params...]   Extract structured data using Bright Data Pipelines
status <job-id>                Check status of an async Web Scraper snapshot job
zones          List and inspect Bright Data zones
config         View and edit CLI configuration
init           Interactive setup wizard for authentication and defaults
skill          Manage Bright Data agent skills
budget         View account balance and zone spending
browser        Control Bright Data browser sessions
discover <query>   Search and rank web results using AI-driven intent
scraper        Build and manage Bright Data scrapers
add            Add Bright Data integrations to supported coding agents
```

## `scraper` — full signatures, arguments included

```
scraper create <url> <description>      Build a scraper from a natural-language
                                        description using AI
scraper run <collector_id> [url]        Run a scraper on one or more URLs, return data
scraper heal <collector_id> <prompt>    Fix an existing scraper in place via AI self-healing
scraper approve <collector_id>          Approve (or --reject) a heal awaiting approval
```

**Note the required positional arguments.** `heal` takes a `<prompt>` describing the fix —
it is not a bare button. `approve` gates a pending heal and supports `--reject`. That
approve/reject pair is a natural fit for a harness approval gate.

## Self-healing — the honest shape

Bright Data's self-heal is real but **human-supervised**, and Studio's documented flow can
take **up to 15 minutes**; initial collector generation takes ~10.

**So the CLI gives us `heal` + `approve`, but the control loop is ours to build:**

1. Detect schema/semantic failure via the target's `verify` predicate
2. Capture the failing fixture
3. `brightdata scraper heal <collector_id> "<what broke>"`
4. Validate the proposed draft against our invariants
5. Pause for **human approval** through the harness
6. `brightdata scraper approve <collector_id>` — bump `revision`, log to `drift-log.md`
7. Re-run the consumer workflow and show it recover

**Demo consequence:** create and validate the collector *well before* the demo, and keep a
previously captured failing fixture. Never start a cold heal on stage.

## Anything not on this page

Run `<command> --help`, append the captured output to
[`cli-help-output.md`](cli-help-output.md), and add the signature here **before** using it.
A signature written from memory is a failed demo.

## Cost note

The $50 Bright Data grant is documented for the separate Scrape-Verse event; a grant for
the Agent Harness event is **UNVERIFIED** — confirm with organizers. `brightdata budget`
shows real account balance and zone spending.
