export const debounce = <P extends Array<unknown>>(delay: number, callback: (...args: P) => void) => {
  let id: number | undefined;
  let args: P = [] as unknown as P;
  const fn = (...rest: P): void => {
    args = rest;
    if (id != null) return;
    id = setTimeout(done, delay);
  }
  const done = () => {
    callback(...args);
    clear();
  }
  const clear = () => {
    clearTimeout(id);
    id = undefined;
  }
  fn[Symbol.dispose] = clear;
  fn.cancel = clear;
  fn.done = done;
  return fn;
}