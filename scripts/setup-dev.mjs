#!/usr/bin/env node

import { existsSync, mkdirSync, symlinkSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const devDir = path.join(root, "dev");
const themesDir = path.join(devDir, "themes");
const blankDir = path.join(themesDir, "theme-blank");
const minimismLink = path.join(themesDir, "theme-minimism");
const blankRepo = "https://github.com/microdotblog/theme-blank.git";

mkdirSync(themesDir, { recursive: true });
mkdirSync(path.join(devDir, "content"), { recursive: true });

if (!existsSync(blankDir)) {
  console.log("Cloning theme-blank...");
  execSync(`git clone --depth 1 ${blankRepo} ${blankDir}`, { stdio: "inherit" });
} else {
  console.log("theme-blank already present");
}

if (existsSync(minimismLink)) {
  rmSync(minimismLink, { recursive: true, force: true });
}

symlinkSync(root, minimismLink, "dir");
console.log("Linked theme-minimism -> repo root");
