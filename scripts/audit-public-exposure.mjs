import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src", "docs"];
const forbidden = [
  /DATABASE_URL/gi,
  /INTERNAL_TOKEN_PEPPER/gi,
  /TABLE_TOKEN_ENCRYPTION_KEY/gi,
  /\/admininistrador/gi,
  /\/interno\/acesso/gi
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const allowlistedDocs = new Set([
  "docs/09-SECURITY-LGPD.md",
  "docs/superpowers/plans/2026-09-18-foodstack-sales-page.md"
]);

const failures = [];
for (const root of roots) {
  for (const file of walk(root)) {
    if (allowlistedDocs.has(file.replaceAll("\\", "/"))) continue;
    const text = readFileSync(file, "utf8");
    for (const pattern of forbidden) {
      pattern.lastIndex = 0;
      if (pattern.test(text)) failures.push(`${file}: ${pattern}`);
    }
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Public exposure audit passed.");
