# Handoff — design decisions settled (2026-11-12)

Read `GLOSSARY.md` and `workspace/angles-workspace.md` (process rules) first. Spec = the pasted project instructions (PROJECT-INSTRUCTIONS.md is not in this folder).

## Built
- `.claude/agents/message-generator.md` (sonnet, read-only), `.claude/agents/brand-auditor.md` (opus, Bash for char counts only)
- `tools/pre-audit-gate.mjs` — deterministic gate G1-G5; run `node tools/pre-audit-gate.mjs workspace/batches/A1.json`
- `.mcp.json` — mock-ad-platform registered (project scope); deps installed; memory empty

## Status: core path complete (A1, A2, L1, L2, deliverables) — see deliverables/

## Original next steps (done)
1. Invoke `message-generator` (batch mode) with the Launch Angle from the workspace → save JSON to `workspace/batches/A1.json`, table into workspace.
2. Run the gate → `A1.gate.json`; record in workspace.
3. Invoke `brand-auditor` with ONLY the angle fields (no generator text), round A1, on ALL angles → save to `A1.audit.md`; fill the audit table.
4. Stability bonus: invoke the auditor a second time on the identical A1 batch; record verdict drift.
5. Classify each REJECT's fix_type → generator revision mode → gate → auditor (A2). Still REJECT → `dropped`.

## Later decisions already made
- Human review (Sebastien Henry, acting as Brand Manager reviewer): reject a PASS if an Open Flag is unresolvable at the placement, it overlaps a stronger angle on the same feature, or it lacks forward motion. Max 6 to L1.
- One honest Angle Tag per Variant, verified against copy before launch. Simulator scores tags by hidden fixed multipliers (server.js) — state as a limitation in Audit Findings; don't pick tags by it.
- L1: `get_performance` 3x per Variant, judge on last pull. L2 rule (pre-committed): keep ≥ L1 median CTR, drop bottom third, regenerate for strongest tag; regenerated angles go through generator → gate → auditor before launch.
- Bonuses: gate-vs-auditor overlap count, auditor stability, hbb-trust-audit comparison on passed set, launch genuinely rejected/dropped angles (skip if none).
- Deliverables → `deliverables/` (audit-findings.md, improvement-fallback-plan.md, leadership-brief.md ≤600 words, launch-record.md).
- User runs `npm run dashboard` themselves (exercises/closed-loop-mcp).
