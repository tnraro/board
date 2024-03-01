import { expect, test } from "vitest";
import { createSignal, type ISignal } from "./signal";

const createSignalPromise = <T>(defaultValue: T, modify: (signal: ISignal<T>) => void) => new Promise((resolve) => {
  const signal = createSignal(defaultValue);
  signal.sub(resolve);
  modify(signal);
});

test("update", async () => {
  const result = await createSignalPromise(0, signal => {
    signal.value += 1;
  });
  expect(result).toBe(1);
});

test("batch update", async () => {
  const result = await createSignalPromise(1, signal => {
    signal.value += signal.value; // 2
    signal.value += signal.value; // 4
    signal.value += signal.value; // 8
  });
  expect(result).toBe(8);
});

test("update object", async () => {
  const result = await createSignalPromise({ a: 5, b: 2 }, signal => {
    signal.value = {
      ...signal.value,
      b: 3,
    }
  });
  expect(result).toStrictEqual({
    a: 5,
    b: 3,
  });
});

test("update object manually", async () => {
  const result = await createSignalPromise({ a: 5, b: 2 }, signal => {
    signal.value.b = 3;
    signal.update();
  });
  expect(result).toStrictEqual({
    a: 5,
    b: 3,
  });
});