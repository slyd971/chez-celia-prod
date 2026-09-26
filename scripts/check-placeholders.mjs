// Garde-fou lancé après `next build` : échoue si un texte provisoire se
// retrouve dans le HTML exporté (dossier out/).
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.argv[2] ?? "out";
const PATTERNS = [/À COMPL[ÉE]TER/i, /A COMPLETER/i, /\bTODO\b/, /\blorem\b/i];

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const problems = [];
for (const file of htmlFiles(OUT_DIR)) {
  const html = readFileSync(file, "utf8");
  for (const pattern of PATTERNS) {
    const match = html.match(pattern);
    if (match) {
      const start = Math.max(0, match.index - 60);
      problems.push(`${file} : « ${match[0]} » … ${html.slice(start, match.index + 60).replace(/\s+/g, " ")}`);
    }
  }
}

if (problems.length > 0) {
  console.error("✖ Texte provisoire trouvé dans le HTML généré :\n" + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log("✔ Aucun texte provisoire (À COMPLÉTER, TODO, lorem) dans le HTML généré.");
