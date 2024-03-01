import { expect, test } from "vitest";
import { groupBy } from "./map-group-by";

test("group-by", () => {
  const map = groupBy([{ id: 0 }, { id: 1 }], (item) => item.id);
  expect(map.get(0)).toStrictEqual({ id: 0 });
  expect(map.get(1)).toStrictEqual({ id: 1 });
})