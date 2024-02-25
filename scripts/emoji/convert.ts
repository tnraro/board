import { foods } from "./lib/foods";
// @ts-expect-error use bun
import { $ } from "bun";
import { join } from "path";

const convertedPath = join(import.meta.dirname, "converted")
await $`rm -r ${convertedPath}`
await $`mkdir ${convertedPath}`
for (const food of foods) {
  const _from = join(import.meta.dirname, "twemoji", food.svg);
  // @ts-expect-error esnext
  const _to = join(import.meta.dirname, "converted", `${food.en.replaceAll(/\s+/g, "-")}.svg`);
  await $`cp ${_from} ${_to}`;
}