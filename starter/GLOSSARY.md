# Glossary — Momentum Launch Messaging System

**Launch Angle**
The single positioning statement every Angle in a batch is built toward. Chosen once, in the submitter's own words, before generation.
_Avoid_: angle (unqualified), theme, concept

**Angle**
One candidate piece of RSA-style ad copy: a Headline (≤30 characters) and a Description (≤90 characters), plus metadata naming the product feature it leans on, the voice pillar doing the work, and its Review Status.
_Avoid_: hook, message, ad, line

**Variant**
An Angle that has been human-approved and launched to the practice ad platform, identified by the platform's `variant_id`. Every Variant traces back to exactly one Angle.
_Avoid_: ad, creative

**Review Status**
The metadata field recording where an Angle sits in the pipeline. Never written into Headline or Description text. Values: `draft`, `audit-pass`, `audit-reject`, `revised`, `staged`, `approved`, `rejected-by-human`, `launched`, `dropped`.
_Avoid_: status marker (in copy), label

**Audit Round**
One pass of the brand-auditor over a set of Angles. A1 is the first audit of a freshly generated batch; A2 is the re-audit after a targeted revision. No Angle receives more than two Audit Rounds.
_Avoid_: round (unqualified), iteration

**Launch Round**
One pass of launching Variants to the practice ad platform and pulling performance. L1 launches the first approved set; L2 launches the keep/regenerate set informed by L1 performance.
_Avoid_: round (unqualified), flight

**Verdict**
The auditor's PASS or REJECT for one Angle in one Audit Round, always citing at least one of the five core checks and the copy text that triggered it.
_Avoid_: score, grade

**Flag**
A specific finding raised against an Angle, tied to one check. A blocking Flag forces REJECT; a non-blocking Flag (an **Open Flag**) travels with a PASS into human review.
_Avoid_: issue, warning (unqualified)

**Dropped**
The terminal state of an Angle still rejected after its second Audit Round. Dropped Angles are recorded, not deleted.
_Avoid_: deleted, killed

**Angle Tag**
The single pitch category a Variant is launched under on the practice ad platform: `local`, `ai-cashflow`, `human-support`, `fee-simplicity`, `generic-fee`, or `competitor-comparison`. Used to compare performance like-for-like.
_Avoid_: category, bucket

## Relationships

- A **Launch Angle** governs one batch of 8–10 **Angles**
- An **Angle** receives one **Verdict** per **Audit Round**, at most two
- A **Verdict** carries zero or more **Flags**
- An approved **Angle** becomes exactly one **Variant** per **Launch Round** it is launched in
- A **Variant** carries exactly one **Angle Tag**

## Flagged ambiguities

- "Round" was used for both the generate/audit/revise loop and the launch/measure loop — resolved: **Audit Round** (A1, A2) vs **Launch Round** (L1, L2).
- "Angle" vs "Variant" — resolved: an Angle is copy under review; a Variant is an Angle live on the ad platform.
