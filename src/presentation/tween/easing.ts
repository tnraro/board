export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const cubic1d = (a: number, b: number, t: number) => {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return 3 * a * t * (1 - t) * (1 - t)
    + 3 * b * t * t * (1 - t)
    + t * t * t
}

export const cubic = (x1: number, y1: number, x2: number, y2: number) => {
  if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) throw new Error("x must be between 0 and 1 (inclusive)");
  const xts: { x: number, t: number }[] = [];
  const precision = 64;

  for (let i = 0; i < precision; i++) {
    const t = i / precision;
    const x = cubic1d(x1, x2, t);
    xts.push({ x, t });
  }
  const getT = (x: number) => {
    let last = xts[0];
    for (let i = 0; i < precision; i++) {
      const xt = xts[i];
      if (x === xt.x) {
        return xt.t;
      } else if (x < xt.x) {
        const t = (x - last.x) / (xt.x - last.x)
        return lerp(last.t, xt.t, t);
      }
      last = xt;
    }
    return 1;
  }
  return (x: number) => {
    const t = getT(x);
    return cubic1d(y1, y2, t);
  }
}

