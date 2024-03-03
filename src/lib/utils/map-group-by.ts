export const groupBy = <Key, Element>(
  items: Iterable<Element>,
  callbackFn: (value: Element, index: number, items: Iterable<Element>) => Key) => {
  const map = new Map<Key, Element>();
  let index = 0;
  for (const item of items) {
    const key = callbackFn(item, index++, items);
    map.set(key, item);
  }
  return map;
}