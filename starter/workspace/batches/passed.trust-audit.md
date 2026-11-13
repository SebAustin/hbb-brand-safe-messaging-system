All 9 angles pass the trust audit, and none has a blocker. Four of them carry warnings a human reviewer should see before sign-off. I checked against `trust/framework.md` and `brand/brand-bible.md`. Character counts come from a script, not estimates.

### Angle: "Starter Is $0 a Month" / "Momentum Starter, built in Atlanta for owners who count every dollar. Member FDIC." (M01)
Verdict: PASS
Flags:
- [warning] Quality — Brand Bible §7 "no monthly maintenance fees … must carry current rate disclosure alongside" — "$0 a Month" comes from the §6 pricing line, not the §7 claim, but readers will take it as a no-monthly-fee claim. A human should decide whether the §7 rate-disclosure rule applies. I set this severity by judgment because the framework tables don't cover it.
- [warning] Compliance — Brand Bible §10 "same unit of communication" — Google Ads can serve this headline with any description in the asset group. Paired with M07's description, the ad would say "$0 a month" next to Momentum Connect, which §6 puts in the Pro tier ($49/mo). This is a judgment severity; the framework has no row for it.
- [note] Quality — Brand Bible §1/§4 — "built in Atlanta" is supported by HBB being based in metro Atlanta and matches the §4 "Built in Atlanta" example. It isn't an approved claim word for word.
- [note] Stability — first run, so there's no prior version to compare against. This is not a failure.
- Character caps: headline 21/30, description 82/90. Member FDIC is present (§10). No §9 terms.

### Angle: "See 90 Days of Cash Ahead" / "A 90-day forecast built from your real transactions, not guesses. Plan your next move." (M02)
Verdict: PASS
Flags:
- [note] Quality — Brand Bible §6 differentiator caution — "not guesses" contrasts the forecast with guesswork, not with any competitor. It stays within §6, but reviewers should keep it from drifting toward "other tools guess."
- [note] Stability — first run, so there's no prior version to compare against.
- Character caps: headline 25/30, description 86/90. The claim matches §6 almost word for word ("90-day cash flow forecast from real transaction data"). No §9 terms.

### Angle: "A Named Advisor. No Bots." / "Your advisor is Atlanta-based and has a name. Phone, video, or in-branch. No bots." (M03)
Verdict: PASS
Flags:
- [warning] Quality — Brand Bible §6 Human Layer vs. Pricing — "Your advisor" reads as a personal advisor for every customer. §6 lists a "dedicated advisor" only in the Pro tier ($49/mo). The claim is true in direction but not word for word, so I rated it a warning per the framework's factual-grounding row.
- [note] Quality — Brand Bible §3 Straight talk — "No bots" appears in both the headline and the description. That's repetitive, not a voice violation.
- [note] Stability — first run, so there's no prior version to compare against.
- Character caps: headline 25/30, description 82/90. It matches §7 "Human support … phone, in-branch, or video — no bots." No §9 terms.

### Angle: "Loan Decisions Made Locally" / "Loan decisions made locally — no out-of-state underwriting. Let's talk next steps." (M04)
Verdict: PASS
Flags:
- [note] Stability — first run, so there's no prior version to compare against.
- Character caps: headline 27/30, description 82/90. The text is the §7 approved claim word for word. It makes no claim about approval speed, so the §8 review rule doesn't apply. No §9 terms.

### Angle: "Locally Owned Since 1999" / "Nine metro Atlanta locations plus two in Savannah. Now with cash flow tools built in." (M05)
Verdict: PASS
Flags:
- [note] Stability — first run, so there's no prior version to compare against.
- Character caps: headline 24/30, description 85/90. The headline and first sentence are §7 claims word for word. "Cash flow tools built in" is backed by §7 "Integrated tools including cash flow forecasting." No §9 terms.

### Angle: "Anomaly Alerts, Built In" / "Anomaly alerts flag unusual activity. A tax reserve calculator helps you plan." (M06)
Verdict: PASS
Flags:
- [note] Quality — Brand Bible §6 — "flag unusual activity" accurately describes "anomaly alerts." A reader might take it as a fraud-protection promise, which §6 doesn't make. Reviewers should keep the wording from growing into a security claim.
- [note] Stability — first run, so there's no prior version to compare against.
- Character caps: headline 24/30, description 78/90. Both features are listed in §6. No §9 terms.

### Angle: "Connects to Your Tools" / "QuickBooks, Xero, Shopify, Square, Stripe, Gusto, ADP, HubSpot. Via Momentum Connect." (M07)
Verdict: PASS
Flags:
- [warning] Quality — Brand Bible §6 Pricing — Momentum Connect is part of the Pro tier ($49/mo), and the copy doesn't say which tier. The claim is true in direction but leaves out the tier, so I rated it a warning per the factual-grounding row.
- [warning] Compliance — Brand Bible §10 "same unit of communication" — this is the same pairing risk as M01. With the "Starter Is $0 a Month" headline, the ad implies Connect is free. This is a judgment severity; the framework has no row for it.
- [note] Stability — first run, so there's no prior version to compare against.
- Character caps: headline 22/30, description 85/90. The integration list matches §6 exactly. No §9 terms.

### Angle: "Free ACH and Incoming Wires" / "Momentum checking: unlimited fee-free transactions. Plain pricing. Member FDIC." (M08)
Verdict: PASS
Flags:
- [note] Stability — first run, so there's no prior version to compare against.
- Character caps: headline 27/30, description 79/90. Both features match §6 checking word for word. Member FDIC is present (§10). It doesn't say "no monthly fee," so the §7 rule from M01 doesn't apply. No §9 terms.

### Angle: "Payroll Scheduling, Built In" / "Schedule payroll with Gusto, ADP, or QuickBooks in the Intelligence Dashboard." (M10)
Verdict: PASS
Flags:
- [note] Stability — first run, so there's no prior version to compare against.
- Character caps: headline 28/30, description 78/90. It matches §6 "payroll scheduling integration (QuickBooks, Gusto, ADP)" and doesn't repeat the earlier unsupported claim that payroll data feeds the forecast. No §9 terms.

**Summary: 9 PASS, 0 REJECT.** 4 angles carry warnings (M01, M03, M07, plus the M01 + M07 pairing risk counted on both). The rest have notes only.

**Review-status marker:** every angle has `status: "audit-pass"` in its metadata and nothing in the ad text, as the framework requires. So none of them is missing a marker. But "audit-pass" only says the angle cleared the automated checks; it doesn't say a human still has to approve it. Renaming the status to something like `pending-human-review` would remove that ambiguity.

`★ Insight ─────────────────────────────────────`
- The core brand-auditor checks one angle at a time. RSA ads are assembled by mixing headlines and descriptions, so a claim that's fine alone can be misleading when paired with another angle, like M01's free tier next to M07's paid-tier feature. Rule §10 ("same unit of communication") applies to the assembled ad, so a batch-level pairing check is worth adding to the pipeline.
- The tier warnings on M03 and M07 come from cross-checking the feature list against the pricing line in §6. An angle can quote a feature exactly and still misstate who gets it.
`─────────────────────────────────────────────────`
