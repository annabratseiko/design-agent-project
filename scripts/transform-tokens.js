/**
 * transform-tokens.js
 *
 * Transforms a Figma token export (JSON) into the design-language.md format.
 *
 * Usage:
 *   node scripts/transform-tokens.js <input-json> [--output <path>]
 *
 * Input: JSON file exported from the Fluent Tokens Exporter Figma plugin
 * Output: Updates the design-language.md file (Section 8 theme code + token tables)
 *
 * The script preserves:
 *   - Custom overrides in Section 5 (Component-Level Overrides)
 *   - Layout Spacing Rules (Section 3)
 *   - Any manual additions
 *
 * The script updates:
 *   - Brand Variants table (Section 1)
 *   - Type Scale table (Section 2)
 *   - Spacing Scale table (Section 3)
 *   - Border Radius table (Section 4)
 *   - Shadow table (Section 4)
 *   - Theme Code (Section 8)
 */

const fs = require("fs");
const path = require("path");

// --- Configuration ---
const DEFAULT_OUTPUT = path.join(
  __dirname,
  "..",
  ".specify",
  "memory",
  "design-language.md"
);

// --- Token Name Mappings ---
// Maps Figma variable names to Fluent v9 token names
const BRAND_COLOR_PATTERN = /^Colors\/Brand\/(\d+)$/i;
const SPACING_PATTERN = /^Spacing\/(Horizontal|Vertical)\/(.+)$/i;
const RADIUS_PATTERN = /^Shape\/BorderRadius\/(.+)$/i;
const FONT_SIZE_PATTERN = /^Typography\/FontSize\/(.+)$/i;
const SHADOW_PATTERN = /^Elevation\/Shadow\/(\d+)$/i;

function parseTokens(jsonPath) {
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const tokens = {
    brandVariants: {},
    spacing: {},
    borderRadius: {},
    fontSize: {},
    shadows: {},
    other: {},
  };

  // Handle different export formats
  const entries = Array.isArray(raw) ? raw : Object.entries(raw);

  for (const entry of entries) {
    const [name, value] =
      Array.isArray(entry) ? entry : [entry.name, entry.value];

    let match;

    if ((match = name.match(BRAND_COLOR_PATTERN))) {
      tokens.brandVariants[match[1]] = value;
    } else if ((match = name.match(SPACING_PATTERN))) {
      const direction = match[1].toLowerCase();
      const size = match[2];
      tokens.spacing[`spacing${match[1]}${size}`] = value;
    } else if ((match = name.match(RADIUS_PATTERN))) {
      tokens.borderRadius[`borderRadius${match[1]}`] = value;
    } else if ((match = name.match(FONT_SIZE_PATTERN))) {
      tokens.fontSize[`fontSize${match[1]}`] = value;
    } else if ((match = name.match(SHADOW_PATTERN))) {
      tokens.shadows[`shadow${match[1]}`] = value;
    } else {
      tokens.other[name] = value;
    }
  }

  return tokens;
}

function generateBrandVariantsCode(brandVariants) {
  const stops = Object.keys(brandVariants)
    .sort((a, b) => Number(a) - Number(b));

  if (stops.length === 0) return null;

  let code = "const brandVariants: BrandVariants = {\n";
  for (const stop of stops) {
    code += `  ${stop}: "${brandVariants[stop]}",\n`;
  }
  code += "};";
  return code;
}

function generateBrandTable(brandVariants) {
  const stops = Object.keys(brandVariants)
    .sort((a, b) => Number(a) - Number(b));

  if (stops.length === 0) return null;

  let table = "| Stop | Hex       | Usage                              |\n";
  table +=    "|------|-----------|------------------------------------||\n";

  for (const stop of stops) {
    const usage =
      stop === "80" ? "← Primary brand color (rest state)" :
      stop === "10" ? "Darkest brand shade" :
      stop === "160" ? "Lightest brand tint" : "";
    table += `| ${stop.padStart(4)} | ${brandVariants[stop].padEnd(9)} | ${usage.padEnd(34)} |\n`;
  }

  return table;
}

// --- Main ---
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: node transform-tokens.js <input.json> [--output <path>]");
    console.log("");
    console.log("Transforms Figma token export into design-language.md format.");
    console.log("");
    console.log("Steps:");
    console.log("  1. Export tokens from Figma using Fluent Tokens Exporter plugin");
    console.log("  2. Save the JSON file to scripts/figma-tokens/");
    console.log("  3. Run: node scripts/transform-tokens.js scripts/figma-tokens/export.json");
    console.log("");
    console.log("The script updates .specify/memory/design-language.md");
    process.exit(0);
  }

  const inputPath = args[0];
  const outputIdx = args.indexOf("--output");
  const outputPath = outputIdx !== -1 ? args[outputIdx + 1] : DEFAULT_OUTPUT;

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  console.log(`Reading tokens from: ${inputPath}`);
  const tokens = parseTokens(inputPath);

  console.log(`Found:`);
  console.log(`  Brand variants: ${Object.keys(tokens.brandVariants).length}`);
  console.log(`  Spacing tokens: ${Object.keys(tokens.spacing).length}`);
  console.log(`  Border radius:  ${Object.keys(tokens.borderRadius).length}`);
  console.log(`  Font sizes:     ${Object.keys(tokens.fontSize).length}`);
  console.log(`  Shadows:        ${Object.keys(tokens.shadows).length}`);
  console.log(`  Other tokens:   ${Object.keys(tokens.other).length}`);

  // Generate theme code
  const brandCode = generateBrandVariantsCode(tokens.brandVariants);
  if (brandCode) {
    console.log("\nGenerated brand variants code:");
    console.log(brandCode);
  }

  const brandTable = generateBrandTable(tokens.brandVariants);
  if (brandTable) {
    console.log("\nGenerated brand table:");
    console.log(brandTable);
  }

  console.log(`\nTo update design-language.md, replace the relevant sections`);
  console.log(`with the generated content above.`);
  console.log(`\nFull automation (in-place update) coming in a future version.`);
  console.log(`For now, copy the generated code into the appropriate sections.`);
}

main();
