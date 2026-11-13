# Brand & Compliance Audit Findings: Momentum Launch Angles

This document records what happened, not what to change (that's in `improvement-fallback-plan.md`). Each result is tied to the angle it came from and to its Audit Round (A1, A2) or Launch Round (L1, L2). The raw material is in `workspace/angles-workspace.md`, the auditor outputs in `workspace/batches/*.audit*.md` (two runs per round), the gate reports in `workspace/batches/*.gate.json`, the trust audit in `workspace/batches/passed.trust-audit.md`, and the ad numbers in `deliverables/launch-record.md`.

## 1. Run summary

| Stage | Angles in | PASS | REJECT | Dropped | Notes |
|---|---|---|---|---|---|
| A1 (batch M01-M10) | 10 | 7 | 3 (M04, M09, M10) | — | Gate: 0 flags. Auditor runs agreed 9/10. |
| A2 (revisions) | 3 | 2 (M04, M10) | 1 (M09) | M09 | Runs agreed 2/3. |
| Human review (L1) | 9 | 5 approved | 4 rejected-by-human | — | M01, M02, M03, M05, M08 approved |
| L2-A1 (regeneration N01-N04) | 4 | 3 | 1 (N03) | — | Runs agreed 4/4 |
| L2-A2 | 1 | 1 (N03) | 0 | — | |
| Human review (L2) | 4 | 2 approved (N01, N02) | 2 (N03, N04) | — | |

Two rules applied throughout. When the two auditor runs disagreed, I kept the stricter verdict. And no angle got more than two Audit Rounds; none went over.

## 2. Verdicts and flags

| # | Angle / Round | Verdict | Check | Quoted trigger and rule |
|---|---|---|---|---|
| F1 | **M04 / A1** | REJECT (run 1 PASS-open, run 2 REJECT) | 2 Factual grounding | "Loan Calls Made in Atlanta" — `source` cites §7 ("Loan decisions made locally"), which doesn't say Atlanta; Atlanta appears only in §5 (baseline campaign). |
| F2 | **M04 / A2** | PASS, open | 1 Voice | Revised to "Loan Decisions Made Locally"; open: "Let's talk next steps." points nowhere; headline repeats description. The fix removed the Atlanta differentiator. |
| F3 | **M09 / A1** | REJECT (both runs) | 1 Voice | "Keep more of what you earn" — §4 "Anything a committee outside Atlanta could have written." |
| F4 | **M09 / A2** | REJECT (run 1) vs PASS-open (run 2) → REJECT → **dropped** | 1 Voice | "No Monthly Fee" / "That's the whole pitch." — still no Hartsfield anchor. |
| F5 | **M10 / A1** | REJECT (both runs) | 2 Factual grounding | "payroll into your 90-day forecast" — §6 and the product sheet list payroll scheduling and the forecast as *separate* features; the link was invented. Open: "Know what's coming" (§8 implied certainty). |
| F6 | **M10 / A2** | PASS, open | 2 | "Payroll Scheduling, Built In" — Gusto/ADP sit under Connect (Pro tier, $49/mo); tier not stated. |
| F7 | **N03 / L2-A1** | REJECT (both runs, 3 blocking flags) | 2 Factual grounding | "Underwritten in Atlanta." / "Atlanta Decides Your Loan" — only §5 supports it; §5 is not a claims source; source field §5 invalid. |
| F8 | **N03 / L2-A2** | PASS, open | 1 Voice | "Your Loan, Decided Locally" — headline and description repeat one claim, no forward motion. |
| F9 | **M01 / A1** | PASS, 3 open | 2 | "Momentum Starter" (§10 FDIC label must travel); "$0 a Month" (§7 no-fee claim carries rate-disclosure condition); "built in Atlanta" (brand framing, not a sourced fact). |
| F10 | **M06 / A1** | PASS, open | 1 | "helps you plan" — soft verb, no forward motion. |
| F11 | **M07 / A1** | PASS, 2 open | 1, 2 | "Connects to Your Tools" logo list; "Via Momentum Connect" — Pro-tier feature, tier not stated. |
| F12 | **M08 / A1** | PASS, open | 2 | "Momentum checking" — §10 FDIC label must travel. |
| F13 | **N02 / L2-A1** | PASS, open | 1 / 2 | "Not Guesswork" — leans toward implied forecast certainty (run 1 cites §8, run 2 cites §3 straight talk). |
| F14 | **N04 / L2-A1** | PASS, open | 1, 2 | "Plus two in Savannah." — §7 approved claim split across RSA assets; orphaned under any other headline. |
| F15 | **M02, M03, M05 / A1; N01 / L2-A1** | PASS, no flags | 1-5 clear | e.g. M05 "Nine metro Atlanta locations plus two in Savannah" (§7 verbatim); M03 "No bots" (§7). |

Checks 3 (character caps), 4 (hard bans) and 5 (review status) never produced a blocking flag. All 18 angle versions had a `status` field, and none had status wording in the copy itself.

## 3. Patterns (recurring flags and process gaps)

| # | Pattern | Derived from |
|---|---|---|
| **P-A** | **"Atlanta" attached to loan decisions recurs and fails grounding.** The approved claim is "made locally"; the generator twice upgraded it to "Atlanta" citing §5. | F1 (M04/A1), F7 (N03/L2-A1). N03's §5 citation was induced by the orchestrator's own regeneration prompt. |
| **P-B** | **Targeted revision passes the flag but removes the angle's value.** Every grounding fix deleted the differentiator or the forward motion, and the re-audit then flagged weak forward motion. | F2 (M04/A2), F6 (M10/A2 — also lost fit with its `ai-cashflow` tag), F8 (N03/L2-A2). |
| **P-C** | **Judgment checks drift; deterministic checks don't.** 2 verdict flips across 36 audit runs (18 angle-versions × 2), both on judgment checks deciding *severity* of the same observation. Checks 3-5 agreed 100%. | F1 (M04/A1, Check 2), F4 (M09/A2, Check 1). Stability: A1 90%, A2 67%, L2-A1 100%, L2-A2 100%. |
| **P-D** | **"Exact" character count was wrong in 2 of 4 auditor runs.** M04 description reported 84/90 (A1 run 1, A2 run 1) vs true 82/90 (gate + runs 2) — default-locale `wc -m` counts an em dash as 3. No verdict changed; one at 88-90 would have. | M04 / A1, A2 |
| **P-E** | **Disclosure conditions can't be resolved inside the ad.** FDIC (§10), the §7 rate-disclosure condition and Pro-tier conditions all depend on the ad extension or landing page, which no check inspects. | F9 (M01), F11 (M07), F12 (M08), F4 (M09), F6 (M10) — 5 of 10 A1 angles |
| **P-F** | **Single-angle audit misses cross-asset combinations.** The trust audit found that RSA assets recombine: M01's "$0 a Month" headline served with M07's Connect description implies a Pro feature is free; N04's split claim orphans "Plus two in Savannah." | Trust audit on passed set (M01 + M07); F14 (N04/L2-A1) |
| **P-G** | **The pre-audit gate removed 0 flags upstream.** 18 angle-versions, 0 gate failures; every REJECT came from Checks 1-2, which the gate can't evaluate. The gate was nonetheless the only correct character counter (P-D). | A1, A2, L2-A1, L2-A2 gate reports |
| **P-H** | **A deliberately generic angle cannot be compliant** — the Brand Bible bans copy "any bank could have written." | F3, F4 (M09/A1, A2) |

## 4. hbb-trust-audit vs. the core auditor (9 passed angles)

Both passed all nine. The fuller rubric still raised five warnings the core auditor hadn't: the risk of M01's headline being served with M07's description (§10 "same unit", counted on both angles), Pro-tier wording on M03 and M07, and whether the §7 rate-disclosure rule applies to M01.

One of those warnings contradicts the core auditor. The trust audit read M03's "Your advisor" as a Pro-only feature based on §6. The core auditor had checked the product sheet, which says "every Momentum account includes access to a named Hartsfield business banking advisor." The two gates looked at different sources and came to different answers.

## 5. Audit verdict vs. market performance — one entry per approved angle

Figures are the final (3rd) cumulative pull; L1 median CTR 2.98%.

| Angle | Audit verdict | Performance | Match / Diverge |
|---|---|---|---|
| **M02** See 90 Days of Cash Ahead (L1, kept L2) | PASS, no flags (A1) | L1 CTR **3.77%** (#1), CPA $33.44; L2 cum. 3.72% / $31.33 | **Match** — cleanest pass, top CTR. |
| **M05** Locally Owned Since 1999 (L1, kept L2) | PASS, no flags (A1) | L1 CTR 3.55%, CPA **$28.75** (#1); L2 cum. 3.36% / $27.60 | **Match** — clean pass, best CPA. |
| **M03** A Named Advisor. No Bots. (L1, kept L2) | PASS, no flags (A1); trust-audit warning | L1 CTR 2.98% (median), CPA $44.38; L2 cum. 3.14% / $40.50 | **Partial divergence** — cleanest audit, middling efficiency (2nd-worst CPA among approved). |
| **M01** Starter Is $0 a Month (L1, dropped) | PASS + 3 open flags (A1); trust-audit pairing warning | CTR 2.90%, CPA **$63.32** (worst) | **Match** — most-flagged approved angle, worst CPA. |
| **M08** Free ACH and Incoming Wires (L1, dropped) | PASS + 1 open flag (A1) | CTR **2.33%** (lowest approved), CPA $35.39 | **Diverge** — lightly flagged, worst CTR; its CPA beat clean M03. |
| **N01** Your Cash Flow, 90 Days Out (L2) | PASS, no flags (L2-A1) | CTR 3.31%, CPA $36.80 | **Diverge** — clean pass, underperformed both M02 (which it was modeled on) and flagged N02. |
| **N02** Cash Flow, Not Guesswork (L2) | PASS + 1 open flag (L2-A1) | CTR 3.73%, CPA **$27.34** (best of all variants) | **Diverge** — the angle closest to being held back for legal review won on efficiency. |

Rejected-angle test: **M09** (dropped A2) launched L1 → CTR **1.70%**, **0 conversions** — audit and market agreed.

Passing the audit and performing well turned out to be separate questions. Four of the seven approved variants performed in line with how they audited; three didn't. Clean passes gave us both the best performer (M02) and a weak one (N01), and the angle with an open flag, N02, had the lowest CPA of the lot.

## 6. Limitations

The simulator scores the tag, not the copy. `server.js` applies a fixed hidden multiplier per tag (local 1.6, ai-cashflow 1.55, human-support 1.35, fee-simplicity 1.05, generic-fee 0.75). Differences between variants with the same tag, like M02, N01 and N02, are noise. So "N02 won" says something about noise, not about the phrase "Not Guesswork." The L1 read that `ai-cashflow` beat `local` was noise too; the real gap is 0.11 points, in the other direction.

Volumes were small: roughly 1,300 to 3,700 impressions and 2 to 11 conversions per variant. Treat the numbers as directional.

The agents ran as headless `claude -p --agent <name>` calls from `starter/`, which loads the project's agent files from disk. I did it this way because the agents were created partway through the working session and weren't available to it directly.
