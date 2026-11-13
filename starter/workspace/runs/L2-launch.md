## Pause log

| variant_id | reason | tool response status |
|---|---|---|
| v_8209ef94 | L2 rule: CTR 2.90% below L1 median 2.98%, bottom third of approved set; worst CPA $63.32 | Paused v_8209ef94. Reason logged. |
| v_f19e5b2b | L2 rule: CTR 2.33%, lowest of approved set, bottom third | Paused v_f19e5b2b. Reason logged. |
| v_10898493 | Audit-dropped angle, launched only as rejected-angle test; CTR 1.70%, 0 conversions — test complete | Paused v_10898493. Reason logged. |

## Launch log

- N01 -> v_74a96bc8
- N02 -> v_a6d69010

## Performance pulls

**Pass 1**

| angle id | variant_id | impressions | clicks | CTR | conversions | spend | CPA |
|---|---|---|---|---|---|---|---|
| N01 | v_74a96bc8 | 667 | 28 | 0.042 | 2 | 79.26 | 39.63 |
| N02 | v_a6d69010 | 596 | 26 | 0.0436 | 2 | 60.5 | 30.25 |
| M02 | v_083b77c3 | 2664 | 101 | 0.0379 | 8 | 259.79 | 32.47 |
| M05 | v_5227c092 | 2496 | 84 | 0.0337 | 7 | 193.23 | 27.6 |
| M03 | v_42a2429c | 2184 | 65 | 0.0298 | 4 | 160.26 | 40.06 |

**Pass 2**

| angle id | variant_id | impressions | clicks | CTR | conversions | spend | CPA |
|---|---|---|---|---|---|---|---|
| N01 | v_74a96bc8 | 1067 | 35 | 0.0328 | 3 | 99.07 | 33.02 |
| N02 | v_a6d69010 | 924 | 37 | 0.04 | 3 | 86.1 | 28.7 |
| M02 | v_083b77c3 | 3197 | 121 | 0.0378 | 10 | 311.23 | 31.12 |
| M05 | v_5227c092 | 2892 | 99 | 0.0342 | 8 | 227.73 | 28.47 |
| M03 | v_42a2429c | 3011 | 97 | 0.0322 | 6 | 239.15 | 39.86 |

**Pass 3**

| angle id | variant_id | impressions | clicks | CTR | conversions | spend | CPA |
|---|---|---|---|---|---|---|---|
| N01 | v_74a96bc8 | 1573 | 52 | 0.0331 | 4 | 147.19 | 36.8 |
| N02 | v_a6d69010 | 1260 | 47 | 0.0373 | 4 | 109.37 | 27.34 |
| M02 | v_083b77c3 | 3598 | 134 | 0.0372 | 11 | 344.67 | 31.33 |
| M05 | v_5227c092 | 3215 | 108 | 0.0336 | 9 | 248.43 | 27.6 |
| M03 | v_42a2429c | 3665 | 115 | 0.0314 | 7 | 283.53 | 40.5 |

## query_memory

```json
{
  "variants": [
    {
      "variant_id": "v_8209ef94",
      "headline": "Starter Is $0 a Month",
      "angle_tags": ["fee-simplicity"],
      "status": "paused",
      "pulls": 3,
      "performance": {"impressions": 1759, "clicks": 51, "conversions": 2, "spend": 126.64, "ctr": 0.029, "cpa": 63.32}
    },
    {
      "variant_id": "v_083b77c3",
      "headline": "See 90 Days of Cash Ahead",
      "angle_tags": ["ai-cashflow"],
      "status": "active",
      "pulls": 6,
      "performance": {"impressions": 3598, "clicks": 134, "conversions": 11, "spend": 344.67, "ctr": 0.0372, "cpa": 31.33}
    },
    {
      "variant_id": "v_42a2429c",
      "headline": "A Named Advisor. No Bots.",
      "angle_tags": ["human-support"],
      "status": "active",
      "pulls": 6,
      "performance": {"impressions": 3665, "clicks": 115, "conversions": 7, "spend": 283.53, "ctr": 0.0314, "cpa": 40.5}
    },
    {
      "variant_id": "v_5227c092",
      "headline": "Locally Owned Since 1999",
      "angle_tags": ["local"],
      "status": "active",
      "pulls": 6,
      "performance": {"impressions": 3215, "clicks": 108, "conversions": 9, "spend": 248.43, "ctr": 0.0336, "cpa": 27.6}
    },
    {
      "variant_id": "v_f19e5b2b",
      "headline": "Free ACH and Incoming Wires",
      "angle_tags": ["fee-simplicity"],
      "status": "paused",
      "pulls": 3,
      "performance": {"impressions": 2103, "clicks": 49, "conversions": 3, "spend": 106.18, "ctr": 0.0233, "cpa": 35.39}
    },
    {
      "variant_id": "v_10898493",
      "headline": "No Monthly Fee",
      "angle_tags": ["generic-fee"],
      "status": "paused",
      "pulls": 3,
      "performance": {"impressions": 1820, "clicks": 31, "conversions": 0, "spend": 87.34, "ctr": 0.017, "cpa": null}
    },
    {
      "variant_id": "v_74a96bc8",
      "headline": "Your Cash Flow, 90 Days Out",
      "angle_tags": ["ai-cashflow"],
      "status": "active",
      "pulls": 3,
      "performance": {"impressions": 1573, "clicks": 52, "conversions": 4, "spend": 147.19, "ctr": 0.0331, "cpa": 36.8}
    },
    {
      "variant_id": "v_a6d69010",
      "headline": "Cash Flow, Not Guesswork",
      "angle_tags": ["ai-cashflow"],
      "status": "active",
      "pulls": 3,
      "performance": {"impressions": 1260, "clicks": 47, "conversions": 4, "spend": 109.37, "ctr": 0.0373, "cpa": 27.34}
    }
  ],
  "performance_by_tag": {
    "fee-simplicity": {"variant_count": 2, "avg_ctr": 0.0259, "avg_cpa": 46.56},
    "ai-cashflow": {"variant_count": 3, "avg_ctr": 0.0362, "avg_cpa": 31.64},
    "human-support": {"variant_count": 1, "avg_ctr": 0.0314, "avg_cpa": 40.5},
    "local": {"variant_count": 1, "avg_ctr": 0.0336, "avg_cpa": 27.6},
    "generic-fee": {"variant_count": 1, "avg_ctr": 0.017, "avg_cpa": null}
  }
}
```
