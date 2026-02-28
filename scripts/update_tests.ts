#!/usr/bin/env -S deno run --allow-read --allow-write
import { expandGlob } from "jsr:@std/fs";
import { fromFileUrl } from "jsr:@std/path";

import { format } from "../build/dart_fmt_esm.js";

const test_root = fromFileUrl(new URL(import.meta.resolve("../test_data")));

for await (const entry of expandGlob("**/*.unit", { root: test_root, includeDirs: false })) {
	if (entry.name.startsWith(".")) {
		continue;
	}

	const expect_path = entry.path + ".snap";
	const input = await Deno.readTextFile(entry.path);

	const actual = format(input, entry.path);
	await Deno.writeTextFile(expect_path, actual);
}
console.log("done");
