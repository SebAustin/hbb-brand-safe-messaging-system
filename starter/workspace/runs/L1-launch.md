## Launch log

| Angle id | variant_id |
|---|---|
| M01 | v_8209ef94 |
| M02 | v_083b77c3 |
| M03 | v_42a2429c |
| M05 | v_5227c092 |
| M08 | v_f19e5b2b |
| M09 | v_10898493 |

## Performance pulls

### Pass 1

| Angle id | variant_id | impressions | clicks | CTR | conversions | spend | CPA |
|---|---|---|---|---|---|---|---|
| M01 | v_8209ef94 | 307 | 7 | 0.0228 | 0 | 17.38 | null |
| M02 | v_083b77c3 | 389 | 17 | 0.0437 | 1 | 43.73 | 43.73 |
| M03 | v_42a2429c | 629 | 20 | 0.0318 | 1 | 49.31 | 49.31 |
| M05 | v_5227c092 | 731 | 23 | 0.0315 | 2 | 52.91 | 26.45 |
| M08 | v_f19e5b2b | 736 | 19 | 0.0258 | 1 | 41.17 | 41.17 |
| M09 | v_10898493 | 824 | 16 | 0.0194 | 0 | 45.08 | null |

### Pass 2

| Angle id | variant_id | impressions | clicks | CTR | conversions | spend | CPA |
|---|---|---|---|---|---|---|---|
| M01 | v_8209ef94 | 869 | 25 | 0.0288 | 1 | 62.08 | 62.08 |
| M02 | v_083b77c3 | 1274 | 44 | 0.0345 | 3 | 113.18 | 37.73 |
| M03 | v_42a2429c | 1227 | 38 | 0.031 | 2 | 93.69 | 46.84 |
| M05 | v_5227c092 | 1446 | 46 | 0.0318 | 4 | 105.82 | 26.45 |
| M08 | v_f19e5b2b | 1437 | 31 | 0.0216 | 2 | 67.17 | 33.59 |
| M09 | v_10898493 | 1288 | 22 | 0.0171 | 0 | 61.98 | null |

### Pass 3

| Angle id | variant_id | impressions | clicks | CTR | conversions | spend | CPA |
|---|---|---|---|---|---|---|---|
| M01 | v_8209ef94 | 1759 | 51 | 0.029 | 2 | 126.64 | 63.32 |
| M02 | v_083b77c3 | 2069 | 78 | 0.0377 | 6 | 200.63 | 33.44 |
| M03 | v_42a2429c | 1811 | 54 | 0.0298 | 3 | 133.14 | 44.38 |
| M05 | v_5227c092 | 2114 | 75 | 0.0355 | 6 | 172.53 | 28.75 |
| M08 | v_f19e5b2b | 2103 | 49 | 0.0233 | 3 | 106.18 | 35.39 |
| M09 | v_10898493 | 1820 | 31 | 0.017 | 0 | 87.34 | null |

```json
{
  "variants": [
    {
      "variant_id": "v_8209ef94",
      "headline": "Starter Is $0 a Month",
      "angle_tags": ["fee-simplicity"],
      "status": "active",
      "pulls": 3,
      "performance": {"impressions": 1759, "clicks": 51, "conversions": 2, "spend": 126.64, "ctr": 0.029, "cpa": 63.32}
    },
    {
      "variant_id": "v_083b77c3",
      "headline": "See 90 Days of Cash Ahead",
      "angle_tags": ["ai-cashflow"],
      "status": "active",
      "pulls": 3,
      "performance": {"impressions": 2069, "clicks": 78, "conversions": 6, "spend": 200.63, "ctr": 0.0377, "cpa": 33.44}
    },
    {
      "variant_id": "v_42a2429c",
      "headline": "A Named Advisor. No Bots.",
      "angle_tags": ["human-support"],
      "status": "active",
      "pulls": 3,
      "performance": {"impressions": 1811, "clicks": 54, "conversions": 3, "spend": 133.14, "ctr": 0.0298, "cpa": 44.38}
    },
    {
      "variant_id": "v_5227c092",
      "headline": "Locally Owned Since 1999",
      "angle_tags": ["local"],
      "status": "active",
      "pulls": 3,
      "performance": {"impressions": 2114, "clicks": 75, "conversions": 6, "spend": 172.53, "ctr": 0.0355, "cpa": 28.75}
    },
    {
      "variant_id": "v_f19e5b2b",
      "headline": "Free ACH and Incoming Wires",
      "angle_tags": ["fee-simplicity"],
      "status": "active",
      "pulls": 3,
      "performance": {"impressions": 2103, "clicks": 49, "conversions": 3, "spend": 106.18, "ctr": 0.0233, "cpa": 35.39}
    },
    {
      "variant_id": "v_10898493",
      "headline": "No Monthly Fee",
      "angle_tags": ["generic-fee"],
      "status": "active",
      "pulls": 3,
      "performance": {"impressions": 1820, "clicks": 31, "conversions": 0, "spend": 87.34, "ctr": 0.017, "cpa": null}
    }
  ],
  "performance_by_tag": {
    "fee-simplicity": {"variant_count": 2, "avg_ctr": 0.0259, "avg_cpa": 46.56},
    "ai-cashflow": {"variant_count": 1, "avg_ctr": 0.0377, "avg_cpa": 33.44},
    "human-support": {"variant_count": 1, "avg_ctr": 0.0298, "avg_cpa": 44.38},
    "local": {"variant_count": 1, "avg_ctr": 0.0355, "avg_cpa": 28.75},
    "generic-fee": {"variant_count": 1, "avg_ctr": 0.017, "avg_cpa": null}
  }
}
```
