import { expect, test } from "vitest";
import { emit } from "./runtime";

test("emit", () => {
  emit("start-game", { players: ["a", "b", "c", "d"] });
  
})