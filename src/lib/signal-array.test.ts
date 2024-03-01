import { expect, test } from "vitest";
import { createArraySignal, type IArraySignal } from "./signal-array";

const createArraySignalPromise = <Element>(defaultValue: Element[], modify: (signal: IArraySignal<Element>) => void) => new Promise((resolve) => {
  const signal = createArraySignal<Element>(defaultValue);
  signal.sub(resolve);
  modify(signal);
});

test("at", async () => {
  const signal = createArraySignal([1, 2]);
  expect(signal.at(1)).toBe(2);
});
test("clear", async () => {
  const result = await createArraySignalPromise<number>([1, 2, 3], (signal) => {
    signal.clear();
  });
  expect(result).toStrictEqual([]);
});
test("concat", async () => {
  const signal = createArraySignal([1, 2]);
  expect(signal.concat(3)).toStrictEqual([1, 2, 3]);
});
test("push", async () => {
  const result = await createArraySignalPromise<number>([], (signal) => {
    signal.push(1);
  });
  expect(result).toStrictEqual([1]);
});