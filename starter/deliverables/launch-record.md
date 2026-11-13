# Launch Record: Practice Ad Platform (MCP)

## MCP server configuration entry

Registered at project scope with `claude mcp add --scope project mock-ad-platform -- node "<starter>/exercises/closed-loop-mcp/server.js"`, which wrote `starter/.mcp.json`. The machine-specific absolute path has been replaced with a path relative to `starter/` for publishing:

```json
{
  "mcpServers": {
    "mock-ad-platform": {
      "type": "stdio",
      "command": "node",
      "args": [
        "exercises/closed-loop-mcp/server.js"
      ],
      "env": {}
    }
  }
}
```

I used four tools: `launch_variant`, `get_performance`, `query_memory` and `pause_variant`. The calls ran from headless Claude Code sessions (`claude -p --mcp-config .mcp.json`), and the transcripts are in `workspace/runs/L1-launch.md` and `workspace/runs/L2-launch.md`. The platform keeps its own log in `exercises/closed-loop-mcp/memory/campaign-memory.json`. I checked every figure below against it.

I set the measurement rules before launching anything. Each variant gets three `get_performance` pulls, and I judge it on the last (cumulative) one. Going into L2: keep approved variants at or above the L1 median CTR, drop the bottom third, and regenerate for the strongest tag. Any regenerated angle has to go through the generator, the gate, the auditor and human review before it launches.

## Launch Round L1 — 2026-11-12

L1 launched only the angles I approved in `workspace/approval-record-template.md`. I also launched M09, which the audit had dropped, clearly labelled as a test of a rejected angle.

| Angle | variant_id | Headline | Tag | Audit | Pull 1 CTR | Pull 2 CTR | Pull 3: Impr. | Clicks | **CTR** | Conv. | Spend | **CPA** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| M01 | v_8209ef94 | Starter Is $0 a Month | fee-simplicity | PASS + 3 open flags | 2.28% | 2.88% | 1,759 | 51 | **2.90%** | 2 | $126.64 | **$63.32** |
| M02 | v_083b77c3 | See 90 Days of Cash Ahead | ai-cashflow | PASS, clean | 4.37% | 3.45% | 2,069 | 78 | **3.77%** | 6 | $200.63 | **$33.44** |
| M03 | v_42a2429c | A Named Advisor. No Bots. | human-support | PASS, clean | 3.18% | 3.10% | 1,811 | 54 | **2.98%** | 3 | $133.14 | **$44.38** |
| M05 | v_5227c092 | Locally Owned Since 1999 | local | PASS, clean | 3.15% | 3.18% | 2,114 | 75 | **3.55%** | 6 | $172.53 | **$28.75** |
| M08 | v_f19e5b2b | Free ACH and Incoming Wires | fee-simplicity | PASS + 1 open flag | 2.58% | 2.16% | 2,103 | 49 | **2.33%** | 3 | $106.18 | **$35.39** |
| *M09 (test)* | v_10898493 | No Monthly Fee | generic-fee | **dropped** (voice REJECT A1+A2) | 1.94% | 1.71% | 1,820 | 31 | **1.70%** | 0 | $87.34 | — |

L1 approved set aggregate: 9,856 impressions, 307 clicks, **CTR 3.11%**, 20 conversions, $739.12, **CPA $36.96**.
`query_memory` by tag after L1: ai-cashflow 3.77% / $33.44 · local 3.55% / $28.75 · human-support 2.98% / $44.38 · fee-simplicity 2.59% / $46.56 · generic-fee 1.70% / —.

### Checkpoint read (before L2)
`ai-cashflow` had the best CTR and `local` the best CPA. They were 0.22 points apart on about 2,000 impressions each, which is too close to call. M02 by itself moved from 4.37% to 3.45% to 3.77% over its three pulls.

The losers were clearer. Both `fee-simplicity` variants sat below the median, and M01 had the worst CPA. `generic-fee` had the lowest CTR and no conversions.

So I trusted the data enough to cut the losers, since the fee angles trailed the leaders by 0.8 to 1.4 points on every pull. I didn't trust it enough to pick between the top two. My bar for "enough" was a gap bigger than one variant's own pull-to-pull swing (about half a point) that held on all three pulls.

## Launch Round L2 — keep / drop / regenerate decisions

| Decision | Variant | L1 evidence cited |
|---|---|---|
| **Keep** | M02 (v_083b77c3) | CTR 3.77% — highest; CPA $33.44 |
| **Keep** | M05 (v_5227c092) | CTR 3.55% — 2nd; CPA $28.75 — best |
| **Keep** | M03 (v_42a2429c) | CTR 2.98% = L1 median (rule: keep at or above median) |
| **Drop** (paused) | M01 (v_8209ef94) | CTR 2.90% < median, bottom third; CPA $63.32 — worst |
| **Drop** (paused) | M08 (v_f19e5b2b) | CTR 2.33% — lowest approved; bottom third |
| **Drop** (paused) | M09 (v_10898493) | Rejected-angle test complete: CTR 1.70%, 0 conversions |
| **Regenerate** | 2× `ai-cashflow` (N01, N02) | Strongest tag by CTR (3.77%). |
| **Regenerate** | 2× `local` (N03, N04) | This departs from the single-tag rule I set beforehand. `local` was within noise of `ai-cashflow` on CTR and best on CPA, so I regenerated both. |

All four regenerated angles went through the full audit (see the L2 section of `workspace/angles-workspace.md`) and through human review. N01 and N02 were approved. N03 and N04 were rejected, so the `local` regeneration produced nothing I could launch.

| Angle | variant_id | Headline | Tag | Justification (memory entry) | Pull 1 CTR | Pull 2 CTR | Pull 3: Impr. | Clicks | **CTR** | Conv. | Spend | **CPA** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| N01 | v_74a96bc8 | Your Cash Flow, 90 Days Out | ai-cashflow | ai-cashflow top CTR in L1 (M02 3.77%) | 4.20% | 3.28% | 1,573 | 52 | **3.31%** | 4 | $147.19 | **$36.80** |
| N02 | v_a6d69010 | Cash Flow, Not Guesswork | ai-cashflow | same; carries an open flag | 4.36% | 4.00% | 1,260 | 47 | **3.73%** | 4 | $109.37 | **$27.34** |
| M02 kept | v_083b77c3 | See 90 Days of Cash Ahead | ai-cashflow | kept (top CTR) | | | 3,598 cum. | 134 | 3.72% | 11 | $344.67 | $31.33 |
| M05 kept | v_5227c092 | Locally Owned Since 1999 | local | kept (best CPA) | | | 3,215 cum. | 108 | 3.36% | 9 | $248.43 | $27.60 |
| M03 kept | v_42a2429c | A Named Advisor. No Bots. | human-support | kept (median) | | | 3,665 cum. | 115 | 3.14% | 7 | $283.53 | $40.50 |

## Close the loop — before / after

| Set | Impressions | CTR | CPA |
|---|---|---|---|
| L1 approved variants (5) | 9,856 | **3.11%** | **$36.96** |
| L2 new variants (N01, N02) | 2,833 | **3.49%** | **$32.07** |
| L2 kept variants, L2 flight only | 4,484 | 3.35% | $30.86 |
| L2 active portfolio, cumulative | 13,311 | **3.43%** | **$32.38** |

Round 2 did better than round 1 on average. The new variants gained 0.38 points of CTR and cost $4.89 less per conversion. Across everything still running, the gain was 0.32 points and $4.58. Most of that came from cutting, not from better copy: pausing the two fee variants and the generic test did the work. N01, at 3.31%, actually did worse than M02 (3.72%), the variant it was modelled on.

There's a catch. The simulator gives each tag a fixed hidden multiplier (`server.js`: local 1.6, ai-cashflow 1.55, human-support 1.35, fee-simplicity 1.05, generic-fee 0.75, on a 2.2% base). That works out to expected CTRs of 3.52, 3.41, 2.97, 2.31 and 1.65%. The wording of the copy has no effect at all. So the L1 read that `ai-cashflow` was strongest was noise: the real gap to `local` is 0.11 points, the other way round. The loop worked because the losers really were losers, not because we found the winner.

## Reflection: moving to a real ad account
A real Google Ads or Meta connection means OAuth consent, a manager account, an approved developer token and scoped API access instead of no login at all. Every launch also spends real money, so the daily and total spend caps belong in the tool layer, where a prompt can't talk its way past them. There's no hidden ground truth either. Before acting on a gap like M02 vs. M05 we'd need a significance threshold, for example a two-proportion test at 95% on CTR and around 100 conversions per arm for CPA. At these volumes that takes days, not three pulls. Responsive search ads also mix headlines and descriptions across ads, which is the M01 + M07 risk the trust audit raised and something this simulator can't reproduce. And the gate stays in place: N02 had the best CPA while still carrying an open flag, and a good number never clears an angle that hasn't passed brand, compliance and human review.
