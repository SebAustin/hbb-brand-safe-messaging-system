# Your Angles Workspace

*Working record for Step 1 and Steps 5-8. Terms (Angle, Variant, Audit Round, Launch Round, Review Status, Flag) are defined in `../GLOSSARY.md`.*

## Process rules (fixed before generation)

- **Round limit:** each Angle gets **at most 2 Audit Rounds** — A1 (first audit) and A2 (re-audit after one targeted revision). An Angle still REJECTED after A2 is marked `dropped`. No third round.
- **Pipeline per Audit Round:** `message-generator` → `tools/pre-audit-gate.mjs` (deterministic) → `brand-auditor` (audits every Angle, including gate failures, so overlap can be measured).
- **Review Status** lives in the `status` field only — never in Headline/Description. Values: `draft → audit-pass | audit-reject → revised → staged → approved | rejected-by-human → launched | dropped`.
- **Revisions are targeted:** before revising, each REJECT gets a `fix_type` (`wording` / `factual` / `cap` / `status` / `process`); the generator changes only what the flag requires.
- **Batch files:** `workspace/batches/A1.json`, `A2.json` (+ `.gate.json` gate reports, `.audit.md` auditor output).

## Step 1 — Your launch angle

Which differentiation angle from `intel/competitive-brief.md` are you building toward?

> *(rewrite in your own words — rubric requirement.)* Draft agreed during design: Momentum is the cash flow tool built for small-business owners by a bank that has underwritten small businesses in Atlanta for 25 years — $0/month on Starter, a 90-day forecast from your real transactions, and a named Atlanta advisor instead of a bot. We don't attack the national banks; we show what's structurally ours: no-fee by design, purpose-built cash flow intelligence, and local people making local decisions.

## Round A1 — Generation run

| Field | Value |
|---|---|
| Agent | `.claude/agents/message-generator.md` (model: sonnet, tools: Read/Grep/Glob) |
| Invocation | `claude -p --agent message-generator` (headless run from `starter/`; project agent loaded from disk) |
| Date | 2026-11-12 |
| Input | Launch Angle above, batch mode |
| Raw output | `workspace/runs/A1-generator.md` |
| Batch file | `workspace/batches/A1.json` |

### A1 — Generated angles (10 angles, 9 distinct features)

| id | Headline | Description | feature | source | voice_pillar | angle_tag | status |
|---|---|---|---|---|---|---|---|
| M01 | Starter Is $0 a Month | Momentum Starter, built in Atlanta for owners who count every dollar. Member FDIC. | $0/mo Starter tier | §6, §7 | Earned confidence | fee-simplicity | draft |
| M02 | See 90 Days of Cash Ahead | A 90-day forecast built from your real transactions, not guesses. Plan your next move. | 90-day cash flow forecast | §6 | Forward motion | ai-cashflow | draft |
| M03 | A Named Advisor. No Bots. | Your advisor is Atlanta-based and has a name. Phone, video, or in-branch. No bots. | Named Atlanta advisor | §6, §7 | Warmth without softness | human-support | draft |
| M04 | Loan Calls Made in Atlanta | Loan decisions made locally — no out-of-state underwriting. Let's talk next steps. | Local loan decisions | §7 | Earned confidence | local | draft |
| M05 | Locally Owned Since 1999 | Nine metro Atlanta locations plus two in Savannah. Now with cash flow tools built in. | Locally owned since 1999 | §7, §6 | Earned confidence | local | draft |
| M06 | Anomaly Alerts, Built In | Anomaly alerts flag unusual activity. A tax reserve calculator helps you plan. | Anomaly alerts / tax reserve | §6 | Straight talk | ai-cashflow | draft |
| M07 | Connects to Your Tools | QuickBooks, Xero, Shopify, Square, Stripe, Gusto, ADP, HubSpot. Via Momentum Connect. | Momentum Connect | §6 | Forward motion | ai-cashflow | draft |
| M08 | Free ACH and Incoming Wires | Momentum checking: unlimited fee-free transactions. Plain pricing. Member FDIC. | Free ACH / fee-free transactions | §6 | Straight talk | fee-simplicity | draft |
| M09 | No Monthly Fee | Business checking with no monthly fee. Keep more of what you earn. Member FDIC. | No monthly fee (generic baseline) | §6, §7 | Straight talk | generic-fee | draft |
| M10 | Plan Payroll With Real Data | Pull Gusto, ADP, or QuickBooks payroll into your 90-day forecast. Know what's coming. | Payroll integration + forecast | §6 | Forward motion | ai-cashflow | draft |

### A1 — Pre-audit gate (`workspace/batches/A1.gate.json`)

10 CLEAR, 0 FAIL, **0 gate flags**. Max headline 27/30 (M08, M10); max description 86/90 (M02). No §9 terms, all `status: draft`, no status words in copy.

### A1 — Audit results (`brand-auditor`, model: opus — `A1.audit.md` primary, `A1.audit-rerun.md` stability rerun on identical input)

Verdict rule for drift: **if the two runs disagree, the stricter verdict stands.**

| id | Run 1 | Run 2 | **A1 Verdict** | Check(s) | Quoted trigger | Open Flags | fix_type |
|---|---|---|---|---|---|---|---|
| M01 | PASS | PASS | **PASS** | 2 (open) | "Momentum Starter"; "$0 a Month"; "built in Atlanta" | FDIC label must travel (§10); §7 no-fee claim carries rate-disclosure condition; "built in Atlanta" is brand framing, not a sourced fact | — |
| M02 | PASS | PASS | **PASS** | 1-5 clear | "A 90-day forecast built from your real transactions" (§6) | none | — |
| M03 | PASS | PASS | **PASS** | 1-5 clear | "No bots" (§7 verbatim) | none | — |
| M04 | PASS (open) | **REJECT** | **REJECT** | 2 Factual grounding | "Made in Atlanta" — source cites §7 ("made locally"), Atlanta specificity is §5, uncited | (run 1 raised same issue as open) | factual |
| M05 | PASS | PASS | **PASS** | 1-5 clear | "Nine metro Atlanta locations plus two in Savannah" (§7 verbatim) | none | — |
| M06 | PASS | PASS | **PASS** | 1 (open) | "helps you plan" | weak forward motion (§3) | — |
| M07 | PASS | PASS | **PASS** | 1, 2 (open) | "Connects to Your Tools"; "Via Momentum Connect" | logo list, no benefit (§3); Connect is Pro-tier ($49) — landing page must show tier | — |
| M08 | PASS | PASS | **PASS** | 2 (open) | "Momentum checking" | FDIC label must travel (§10) | — |
| M09 | REJECT | REJECT | **REJECT** | 1 Voice | "Keep more of what you earn" — §4 "anything a committee outside Atlanta could have written" | rate-disclosure condition (§7); FDIC (§10) | wording |
| M10 | REJECT | REJECT | **REJECT** | 2 Factual grounding | "payroll into your 90-day forecast" — sources list payroll integration and forecast as separate features; linkage invented | "Know what's coming" implies certainty (§8) | factual |

A1 totals: **7 PASS, 3 REJECT** (run 1 alone: 8/2; run 2 alone: 7/3). Stability: **9/10 verdicts agree (90%)**; the one flip (M04) was severity of the same observation — open in run 1, blocking in run 2.

## Round A2 — Revisions and re-audit

Revisions via `message-generator` revision mode (`workspace/runs/A2-rev-*.md`), batch `A2.json`, gate `A2.gate.json` (3 CLEAR, 0 flags), audits `A2.audit.md` + `A2.audit-rerun.md`. The auditor ignored the generator's `revision_note` as commentary (stated in both runs).

| id | A1 flag | fix_type | Revised Headline | Revised Description | Revision note (generator) | Run 1 | Run 2 | **A2 Verdict** | A2 Flags | Final status |
|---|---|---|---|---|---|---|---|---|---|---|
| M04 | Check 2 — "Made in Atlanta" uncited | factual | Loan Decisions Made Locally | Loan decisions made locally — no out-of-state underwriting. Let's talk next steps. | Headline now matches §7 verbatim | PASS | PASS | **PASS** | Open: "Let's talk next steps." vague (§3); headline repeats description | `audit-pass` |
| M09 | Check 1 — "Keep more of what you earn" | wording | No Monthly Fee | Business checking with no monthly fee. That's the whole pitch. Member FDIC. | Swapped stock line for plain declarative | **REJECT** | PASS (open) | **REJECT** | Check 1 — "No Monthly Fee" / "That's the whole pitch." still §4 "any bank could write this" | **`dropped`** (2-round limit) |
| M10 | Check 2 — invented payroll→forecast link | factual | Payroll Scheduling, Built In | Schedule payroll with Gusto, ADP, or QuickBooks in the Intelligence Dashboard. | Removed the linkage + "Know what's coming" | PASS | PASS | **PASS** | Open: Gusto/ADP sit under Connect (Pro tier); "Built In" could read as HBB runs payroll when headline shows alone | `audit-pass` |

A2 stability: **2/3 verdicts agree (67%)** — M09 flipped again, on the same check (voice).

## What passed

Within the 2-round limit: **M01, M02, M03, M04 (rev.), M05, M06, M07, M08, M10 (rev.)** — 9 of 10. **Dropped: M09** (generic-fee baseline; voice REJECT in A1 and A2).

## Step 8 — Patterns across rounds

**P1 — Judgment checks are unstable; deterministic checks are not.** Both verdict flips across 26 angle-audits (13 angle-audits × 2 runs) came from judgment checks deciding severity, not from disagreement about the facts: M09 A2 (Check 1 voice — REJECT vs PASS-open on "could any bank have written this?") and M04 A1 (Check 2 source attribution — open vs blocking on the same §5/§7 observation). The deterministic checks (3 char caps, 4 bans, 5 status) agreed 100% across both runs in both rounds.

**P2 — The deterministic gate removed nothing upstream.** 0 gate flags in A1 (10 angles) and A2 (3 angles); the auditor also raised 0 flags on Checks 3/4/5. The generator's constraints already prevent cap/ban/status failures — every REJECT (M04, M09, M10) came from Checks 1-2, which the gate can't evaluate. Value of the gate here is as a cheap guarantee, not a filter.

**P3 — Source-attribution drift.** Generator `source` field didn't fully support the copy in M04 (Atlanta = §5, cited §7) and M10 (cited §6 for a linkage §6 doesn't make); auditor also open-flagged M01 ("built in Atlanta" uncited) and M07/M10 (Pro-tier features with no tier stated). 5 of 10 angles carried a grounding issue the generator didn't surface — the "combine two true facts into one untrue claim" mode (M10) is the most dangerous.

**P4 — Revisions fixed the flag and quietly cost something else.** M04's fix removed "Atlanta" — the angle's actual differentiator — to match a §7 citation, and A2 then open-flagged it for weak forward motion. M10's fix removed the forecast link and with it the angle's forward motion and its fit with its `ai-cashflow` tag (payroll scheduling is not cash-flow forecasting). Targeted revision optimizes for passing the flag, not for keeping the angle worth running.

**P5 — Disclosure flags that can't live in the copy.** FDIC (§10) and the §7 no-fee rate-disclosure condition open-flagged M01, M08, M09; the Pro-tier condition open-flagged M07, M10. None can be resolved inside 30/90 characters — they depend on ad extensions and landing pages the current process doesn't check (**process gap**).

**P6 — The plain baseline can't be made compliant.** The deliberately generic `generic-fee` angle (M09) failed voice in both rounds: Hartsfield's own Brand Bible forbids copy "any bank could have written." A truly generic angle is off-brand by definition, so the `generic-fee` tag can't be tested compliantly — a finding about the experiment design, not just the angle.

## L2 regeneration — audit trail (after Launch Round L1)

Regenerated per the pre-committed L2 rule (see `deliverables/launch-record.md`). Same pipeline and 2-round limit. Batch files `L2-A1.json`, `L2-A2.json`; audits `L2-A1.audit*.md`, `L2-A2.audit*.md`.

| id | Headline | Description | angle_tag | A1 (run1 / run2) | A1 flags | A2 | Final |
|---|---|---|---|---|---|---|---|
| N01 | Your Cash Flow, 90 Days Out | The Momentum Intelligence Dashboard forecasts 90 days from your real transaction data. | ai-cashflow | PASS / PASS | none | — | `approved` → launched L2 |
| N02 | Cash Flow, Not Guesswork | Intelligence Dashboard: 90-day forecast, tax reserve calculator, anomaly alerts. | ai-cashflow | PASS / PASS | Open: "Not Guesswork" leans toward implied certainty (run 1 cites §8, run 2 cites §3) | — | `approved` → launched L2 |
| N03 | Atlanta Decides Your Loan → **Your Loan, Decided Locally** | Underwritten in Atlanta. Loan decisions made locally… → **Loan decisions made locally — no out-of-state underwriting.** | local | **REJECT / REJECT** | Check 2 — "Underwritten in Atlanta." / "Atlanta Decides Your Loan": §7 clears only "made locally"; §5 is not a claims source; source field §5 invalid | PASS / PASS (open: no forward motion, headline = description) | `rejected-by-human` |
| N04 | Nine Metro Atlanta Locations | Plus two in Savannah. Locally owned and operated since 1999. Member FDIC. | local | PASS / PASS | Open: §7 claim split across RSA assets — "Plus two in Savannah." orphaned; heritage only (§3/§5) | — | `rejected-by-human` |

Gate: L2-A1 4 CLEAR / 0 flags; L2-A2 1 CLEAR / 0 flags. Auditor stability L2-A1 4/4, L2-A2 1/1.

**P7 — The "Atlanta in a loan claim" failure recurred (M04 A1, N03 L2-A1).** Both times the generator attached "Atlanta" to loan decisions and cited §5; both times the revision fixed it by deleting the differentiator (P4 again). N03's §5 citation was induced by the orchestration prompt ("cite §5 as well as §7") — the orchestrator, not just the generator, can inject a grounding error.

**P8 — The "exact" character count is environment-dependent.** M04's description contains an em dash. In A1 run 1 and A2 run 1 the auditor reported **84/90**; the gate (Unicode code points) and A1 run 2 / A2 run 2 reported **82/90**. Verified: `wc -m` in the default C locale counts the em dash as 3 (bytes), in UTF-8 as 1. No verdict flipped (both under 90), but any description at 88-90 characters with an em dash or curly quote would be falsely REJECTED on Check 3. The deterministic gate was right every time; the model-run count was right only when the agent happened to set the locale.
