// Check every DSDS file in context/ with the official DSDS tools.
//
//   npm install -D github:somerandomdude/design-system-documentation-schema
//   node scripts/check-dsds.mjs          # check only
//   node scripts/check-dsds.mjs --fix    # also put fields in the DSDS style guide order
//
// Runs validate --strict (structure, links, automated rules have checks), format
// (field order) and lint (documentation quality). Templates whose names start with _
// are skipped because they still hold < > placeholders. Exits 1 if validate or
// format fails. Lint findings are advice and never fail the run.
// Also checks that the generated lists in context/ are up to date (scripts/generate-ai-context.mjs --check).
// Taken from the AI Context Starter Kit by Designil Plus and adjusted for this repo.
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTEXT_DIR = join(ROOT, "context");
const PACKAGE = "design-system-documentation-schema";
const fix = process.argv.includes("--fix");

function findDocs(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return findDocs(path);
    return entry.name.endsWith(".dsds.yaml") && !entry.name.startsWith("_") ? [path] : [];
  });
}

const require = createRequire(join(ROOT, "package.json"));
function tool(script) {
  try {
    return require.resolve(`${PACKAGE}/${script}`);
  } catch {
    console.error(`DSDS tools not found. Install them first:\n  npm install -D github:somerandomdude/${PACKAGE}`);
    process.exit(1);
  }
}

function run(name, file, args) {
  console.log(`\n== ${name}`);
  const result = spawnSync(process.execPath, [file, ...args], { stdio: "inherit", cwd: ROOT });
  return result.status === 0;
}

const docs = findDocs(CONTEXT_DIR);
console.log(`Checking ${docs.length} DSDS file(s) in context/`);

const validated = run("validate", tool("scripts/validate/validate.js"), ["--strict", ...docs]);
const formatted = run("format", tool("scripts/format/format.js"), fix ? docs : ["--check", ...docs]);
run("lint (advice only)", tool("scripts/validate/lint-docs.js"), docs);
const generated = run("generated lists", join(ROOT, "scripts/generate-ai-context.mjs"), ["--check"]);

if (!validated || !formatted || !generated) {
  console.error(
    !formatted && validated && generated
      ? "\nField order is off. Run: node scripts/check-dsds.mjs --fix"
      : "\nSome checks failed. Fix the errors above, or ask your AI to fix them.",
  );
  process.exit(1);
}
console.log("\nAll DSDS files passed.");
