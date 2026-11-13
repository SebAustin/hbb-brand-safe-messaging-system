# Improvement & Fallback Plan: Momentum Messaging System

Each item below answers a specific entry in `audit-findings.md`: an F number for a verdict or flag, or a P label for a pattern. Each one also says exactly what has to change in the agents, the workspace files or the audit step. None of it needs a rebuild. The biggest change is about 20 lines added to `tools/pre-audit-gate.mjs`.

## Priority 1: Deterministic fallbacks (fixed rules, not "try again")

### D1. Lock the loan-locality claim
Responds to P-A (F1, M04/A1; F7, N03/L2-A1).

This failure showed up in two angles, in two separate rounds. Both times the generator wrote "Atlanta" into a loan or underwriting claim and cited §5 as its source.

**The rule.** The gate fails any angle where the copy matches `/\b(loan|underwrit|decid|decision)/i` and also `/\bAtlanta\b/i` (new check G6). It also fails any angle whose `source` field cites §5 (new check G7), since §5 describes the old campaign and isn't a source of approved claims. The only allowed wording for loan locality is the §7 sentence, word for word: "Loan decisions made locally — no out-of-state underwriting."

**What changes.**
- `tools/pre-audit-gate.mjs`: add G6 and G7.
- `message-generator.md`: add a line under *Hard constraints*: "§5 is never a source. Loan-decision claims use the §7 wording verbatim."
- Orchestration prompts, meaning whoever runs the loop: never tell the generator to cite §5. N03's failure started with exactly that instruction in my own regeneration prompt.

### D2. Take the character count from the gate only
Responds to P-D (M04/A1 and A2: reported 84, actually 82) and P-G.

The auditor's "exact" count was wrong in two of four runs. It depended on the machine's locale setting, which decides whether an em dash counts as one character or three.

**The rule.** The gate's count, in Unicode code points, is the only number that counts for Check 3. The auditor copies it from `<batch>.gate.json` instead of recounting. If the auditor's own count disagrees, the gate's number stands and the mismatch gets logged.

**What changes.**
- `brand-auditor.md`, Check 3: replace the `wc -m` instruction with "read `headline_chars` / `description_chars` from the gate report; if you count independently, prefix with `LC_ALL=en_US.UTF-8`."
- Audit step: the gate runs before every audit. The workspace process rules already say this.

### D3. Stricter verdict wins, and two flips means drop
Responds to P-C (F1, M04/A1; F4, M09/A2).

Across 36 runs there were two flips. Both were judgment checks disagreeing about how serious the same issue was.

**The rule.** The auditor runs twice every round, as we already did. If the two runs disagree, REJECT stands. An angle that flips in both of its Audit Rounds is dropped, and a reviewer can't override that. Under this rule, M09 would have been dropped on its own record.

**What changes.**
- `workspace/angles-workspace.md`, *Process rules*: add both rules.
- Audit step: two auditor calls per round, with Run 1 and Run 2 columns in the audit table. We already use these.

## Priority 2: Close the process gaps

### I1. Placement checklist for disclosures
Responds to P-E (F9 M01, F11 M07, F12 M08, F4 M09, F6 M10).

Add a "Placement requirements" column to `workspace/approved-angles-template.csv`, using three fixed codes: `FDIC-label-extension`, `rate-disclosure` and `tier-statement`. The auditor fills it in from its open flags. At human review (`approval-record-template.md`), an angle can't be approved until every requirement points to a real asset, either an extension ID or a landing-page URL.

**What changes:** one new CSV column; one sentence in `brand-auditor.md` telling it to map open flags to the three codes; and a new criterion (d) on the approval record.

### I2. Check headline and description pairings
Responds to P-F (the trust audit's M01 + M07 finding; F14, N04/L2-A1).

Before human review, give the auditor every combination of approved headline and approved description, and have it run only Checks 2 and 4. If a combination fails, those two assets get pinned together or one of them is rejected. This also catches claims split across two assets, like N04, where "Plus two in Savannah." makes no sense on its own.

**What changes:** a "Pairing mode" section in `brand-auditor.md` and one new table in `angles-workspace.md`. With five approved angles that's 25 pairs, which one auditor call can handle.

### I3. Revisions must keep what makes the angle worth running
Responds to P-B (F2 M04/A2, F6 M10/A2, F8 N03/L2-A2).

- `message-generator.md`, revision mode: if the fix would remove the angle's feature or its forward motion, return `revision_note: cannot fix without abandoning angle` instead of a weaker version.
- `brand-auditor.md`, A2 runs: compare the revision against the A1 version. Raise an open flag, `differentiator-lost`, when the revised copy drops the word that set the angle apart ("Atlanta", "forecast").
- Human-review criterion (c): an angle carrying `differentiator-lost` is rejected unless the reviewer writes down why it should run anyway.

**What changes:** one paragraph in each agent file, and the A1 JSON gets passed alongside the A2 JSON during A2 audits.

### I4. Drop the `generic-fee` baseline
Responds to P-H (F3, F4: M09/A1, A2).

The Brand Bible bans copy that any bank could have written, so a deliberately generic angle can't pass. Remove the "exactly one deliberately plain baseline" requirement from `message-generator.md`. If a test needs a control, use the weakest approved angle from the previous round instead. In this run that was M08, at a 2.33% click-through rate.

**What changes:** delete one bullet from the generator's *Batch mode* section.

### I5. Reconcile sources when the two gates disagree
Responds to Findings §4 (trust audit vs. core auditor on M03).

When the trust audit raises a grounding warning that the core auditor already cleared, the reviewer settles it from `references/hbb-ProductSheet.pdf` and writes the citation into the CSV's Open Flags column. I did this for M03. Also add the product sheet to the `hbb-trust-audit` skill's list of sources.

**What changes:** one line in `.claude/skills/hbb-trust-audit/SKILL.md` and one sentence in the approval-record criteria.

## Priority 3: The performance loop

### L1. Set thresholds before moving budget
Responds to Findings §5 and §6 (M02 moved 4.37% → 3.45% → 3.77% across three pulls; the `ai-cashflow` vs. `local` call was noise).

**The rule.** Drop a variant only if its click-through rate is below the median on every pull. Name one tag the winner only if it leads the next by more than the biggest pull-to-pull swing seen that round, which was 0.9 points here. Otherwise, regenerate for every tag above the median. That makes the deviation I recorded in `launch-record.md` the standard behaviour.

**What changes:** replace the L2 rule paragraph in `deliverables/launch-record.md` and `HANDOFF.md`. The agents don't change.

### L2. Good numbers don't clear flags
Responds to F13 (N02 had an open flag and the best cost per conversion).

**The rule.** Performance never removes a flag. N02 only gets more budget once the landing page presents the forecast as a projection, as an I1 placement requirement.

**What changes:** add a line to `approval-record-template.md`: "Re-approval is required before increasing budget on any variant with Open Flags."

## What this plan doesn't fix

The simulator scores tags, not copy (Findings §6), so none of these agent changes will show up in its numbers. Testing whether the copy itself is any good needs a real ad account and proper significance thresholds, as the reflection in `launch-record.md` explains.
