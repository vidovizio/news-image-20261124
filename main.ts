import { copyFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = "/output";
const entrySrc = join(__dirname, "entry.png");
const entryDst = join(outputDir, "entry.png");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

copyFileSync(entrySrc, entryDst);

// Verify output file size matches source (determinism check)
const srcSize = statSync(entrySrc).size;
const dstSize = statSync(entryDst).size;
if (srcSize !== dstSize) {
  throw new Error(`Size mismatch: src=${srcSize} dst=${dstSize}`);
}
console.log(`Copied entry.png to /output/entry.png (${dstSize} bytes)`);