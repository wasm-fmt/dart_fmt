#!/usr/bin/env node
import process from "node:process";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const file_path = path.resolve(process.cwd(), process.argv[2]);
let file_text = fs.readFileSync(file_path, { encoding: "utf-8" });

file_text = file_text.replace(`"length": (s) => s.length`, `"length": (s) => s?.length||0`);
file_text = file_text.replace(`globalThis.format`, `this.format`);
file_text = file_text.replace(`async instantiate(`, `instantiate(`);
file_text = file_text.replace(`await WebAssembly.instantiate`, `new WebAssembly.Instance`);
file_text += fs.readFileSync(fileURLToPath(import.meta.resolve("./prepend.js")), { encoding: "utf-8" });

fs.writeFileSync(file_path, file_text);
