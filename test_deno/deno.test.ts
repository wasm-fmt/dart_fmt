#!/usr/bin/env deno test --allow-read --parallel

import { assertEquals } from "jsr:@std/assert";
import { expandGlob } from "jsr:@std/fs";
import { fromFileUrl } from "jsr:@std/path";

import { format } from "../build/dart_fmt_esm.js";

const test_root = fromFileUrl(new URL(import.meta.resolve("../test_data")));

for await (const entry of expandGlob("**/*.unit", { root: test_root, includeDirs: false })) {
	if (entry.name.startsWith(".")) {
		Deno.test.ignore(entry.name, () => {});
		continue;
	}

	const input_path = entry.path;
	const snap_path = input_path + ".snap";

	const [input, expected] = await Promise.all([Deno.readTextFile(input_path), Deno.readTextFile(snap_path)]);

	Deno.test(input_path, () => {
		const actual = format(input, input_path);
		assertEquals(actual, expected);
	});
}
