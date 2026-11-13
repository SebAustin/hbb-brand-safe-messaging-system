#!/usr/bin/env node
// Deterministic pre-audit gate for Momentum angle batches.
// Runs BEFORE the brand-auditor agent. Plain rules, no model judgment:
//   G1 headline <= 30 chars, G2 description <= 90 chars (Unicode code points),
//   G3 no Brand Bible §9 hard-banned terms, G4 status field present + valid,
//   G5 no review-status wording inside the copy.
// Usage: node tools/pre-audit-gate.mjs workspace/batches/A1.json [--round A1]
// Exit code: 0 if every angle clears, 1 if any angle fails, 2 on bad input.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const HEADLINE_MAX = 30;
const DESCRIPTION_MAX = 90;

const VALID_STATUSES = new Set(["draft", "revised"]);

// Brand Bible §9 hard bans, expressed as patterns.
const BANNED_PATTERNS = [
  { rule: "§9 'guaranteed'", re: /\bguarantee(d|s)?\b/i },
  { rule: "§9 'risk-free' / 'no risk' / 'zero risk'", re: /\b(risk[-\s]?free|no[-\s]risk|zero[-\s]risk)\b/i },
  { rule: "§9 'government-backed'", re: /\bgovernment[-\s]?backed\b/i },
  { rule: "§9 'insured by the government'", re: /\binsured by the (federal )?government\b/i },
  { rule: "§9 comparative safety ('safe as…')", re: /\bsafe as\b/i },
  { rule: "§9 'locked rate'", re: /\blocked[-\s]?rate\b/i },
  { rule: "§9 'unlimited FDIC coverage'", re: /\bunlimited\b[^.]{0,20}\bFDIC\b|\bFDIC\b[^.]{0,20}\bunlimited\b/i },
  { rule: "§9 shortened FDIC claim (needs full disclosure)", re: /\bFDIC[-\s]insured\b/i },
  { rule: "§9 investment/security implication", re: /\b(invest(ment)?s?|securities|portfolio returns?)\b/i },
];

const STATUS_WORDS = /\b(draft|pending|approved|under review|in review|preview|beta|final)\b/i;

const charCount = (s) => [...(s ?? "")].length;

export function gateAngle(angle) {
  const failures = [];
  const h = angle.headline ?? "";
  const d = angle.description ?? "";
  const hc = charCount(h);
  const dc = charCount(d);

  if (hc > HEADLINE_MAX) failures.push({ gate: "G1", rule: `headline ${hc}/${HEADLINE_MAX}`, trigger: h });
  if (dc > DESCRIPTION_MAX) failures.push({ gate: "G2", rule: `description ${dc}/${DESCRIPTION_MAX}`, trigger: d });

  for (const { rule, re } of BANNED_PATTERNS) {
    const m = `${h} ${d}`.match(re);
    if (m) failures.push({ gate: "G3", rule, trigger: m[0] });
  }

  const status = typeof angle.status === "string" ? angle.status.trim() : "";
  if (!status) failures.push({ gate: "G4", rule: "status field missing or empty", trigger: "(no status)" });
  else if (!VALID_STATUSES.has(status))
    failures.push({ gate: "G4", rule: `status '${status}' not a pre-audit value (draft|revised)`, trigger: status });

  const sm = `${h} ${d}`.match(STATUS_WORDS);
  if (sm) failures.push({ gate: "G5", rule: "review-status wording inside copy", trigger: sm[0] });

  return { id: angle.id, headline_chars: hc, description_chars: dc, pass: failures.length === 0, failures };
}

function main() {
  const [file, ...rest] = process.argv.slice(2);
  if (!file) {
    console.error("usage: node tools/pre-audit-gate.mjs <batch.json> [--round A1]");
    process.exit(2);
  }
  const roundIdx = rest.indexOf("--round");
  const round = roundIdx >= 0 ? rest[roundIdx + 1] : path.basename(file, ".json");

  let angles;
  try {
    angles = JSON.parse(readFileSync(file, "utf-8"));
    if (!Array.isArray(angles)) throw new Error("batch file must be a JSON array of angles");
  } catch (err) {
    console.error(`pre-audit-gate: cannot read ${file}: ${err.message}`);
    process.exit(2);
  }

  const results = angles.map(gateAngle);
  const failed = results.filter((r) => !r.pass);

  console.log(`Pre-audit gate — round ${round} — ${file}`);
  for (const r of results) {
    const mark = r.pass ? "CLEAR" : "FAIL ";
    console.log(`${mark} ${r.id}  H ${r.headline_chars}/${HEADLINE_MAX}  D ${r.description_chars}/${DESCRIPTION_MAX}`);
    for (const f of r.failures) console.log(`       ${f.gate} ${f.rule} — "${f.trigger}"`);
  }
  const flagCount = results.reduce((n, r) => n + r.failures.length, 0);
  console.log(`\n${results.length - failed.length} clear, ${failed.length} fail, ${flagCount} gate flag(s)`);

  const outFile = file.replace(/\.json$/, ".gate.json");
  writeFileSync(outFile, JSON.stringify({ round, source: file, results }, null, 2));
  console.log(`report: ${outFile}`);
  process.exit(failed.length ? 1 : 0);
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
