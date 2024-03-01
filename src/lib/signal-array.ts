import { createSignal, type ISignal } from "./signal";

export interface IArraySignal<Element> extends ISignal<Element[]>, Array<Element> {
  clear: () => void;
}
export const createArraySignal = <Element>(defaultValue: Element[]): IArraySignal<Element> => {
  const signal = createSignal(defaultValue);

  return {
    get value() {
      return signal.value;
    },
    set value(v: Element[]) {
      signal.value = v;
    },
    sub: signal.sub,
    unsub: signal.unsub,
    update: signal.update,
    get length() {
      return signal.value.length;
    },
    at(index) {
      return signal.value.at(index);
    },
    concat(...items: (Element | ConcatArray<Element>)[]) {
      return signal.value.concat(...items);
    },
    copyWithin(target, start, end?: number) {
      signal.value.copyWithin(target, start, end);
      signal.update();
      return this;
    },
    entries() {
      return signal.value.entries();
    },
    every(predicate: (value: Element, index: number, array: Element[]) => unknown, thisArg?: any) {
      return signal.value.every(predicate, thisArg);
    },
    fill(value, start, end) {
      signal.value.fill(value, start, end);
      signal.update();
      return this;
    },
    filter(predicate: (value: Element, index: number, array: Element[]) => unknown, thisArg?: any) {
      return signal.value.filter(predicate, thisArg);
    },
    find(predicate: (value: Element, index: number, array: Element[]) => unknown, thisArg?: any) {
      return signal.value.find(predicate, thisArg);
    },
    findIndex(predicate, thisArg) {
      return signal.value.findIndex(predicate, thisArg);
    },
    findLast(predicate: (value: Element, index: number, array: Element[]) => unknown, thisArg?: any) {
      return signal.value.findLast(predicate, thisArg);
    },
    findLastIndex(predicate, thisArg) {
      return signal.value.findLastIndex(predicate, thisArg);
    },
    flat(depth) {
      return signal.value.flat(depth) as any;
    },
    flatMap(callback, thisArg) {
      return signal.value.flatMap(callback, thisArg);
    },
    forEach(callbackfn, thisArg) {
      return signal.value.forEach(callbackfn, thisArg);
    },
    includes(searchElement, fromIndex) {
      return signal.value.includes(searchElement, fromIndex);
    },
    indexOf(searchElement, fromIndex) {
      return signal.value.indexOf(searchElement, fromIndex);
    },
    join(separator) {
      return signal.value.join(separator);
    },
    keys() {
      return signal.value.keys();
    },
    lastIndexOf(searchElement, fromIndex) {
      return signal.value.lastIndexOf(searchElement, fromIndex);
    },
    map(callbackfn, thisArg) {
      return signal.value.map(callbackfn, thisArg);
    },
    pop() {
      const value = signal.value.pop();
      signal.update();
      return value;
    },
    push(...items) {
      const result = signal.value.push(...items);
      signal.update();
      return result;
    },
    reduce(callbackfn: any, initialValue?: any) {
      return signal.value.reduce(callbackfn, initialValue);
    },
    reduceRight(callbackfn: any, initialValue?: any) {
      return signal.value.reduceRight(callbackfn, initialValue);
    },
    reverse() {
      const result = signal.value.reverse();
      signal.update();
      return result;
    },
    shift() {
      const result = signal.value.shift();
      signal.update();
      return result;
    },
    slice(start, end) {
      return signal.value.slice(start, end);
    },
    some(predicate, thisArg) {
      return signal.value.some(predicate, thisArg);
    },
    sort(compareFn) {
      signal.value.sort(compareFn);
      signal.update();
      return this;
    },
    splice(start, deleteCount, ...items) {
      const result = signal.value.splice(start, deleteCount as any, ...items as any);
      signal.update();
      return result;
    },
    toLocaleString() {
      return signal.value.toLocaleString();
    },
    toReversed() {
      return signal.value.toReversed();
    },
    toSorted(compareFn) {
      return signal.value.toSorted();
    },
    toSpliced(start, deleteCount, ...items) {
      return signal.value.toSpliced(start, deleteCount as any, ...items as any);
    },
    toString() {
      return signal.value.toString();
    },
    unshift(...items) {
      const result = signal.value.unshift(...items);
      signal.update();
      return result;
    },
    values() {
      return signal.value.values();
    },
    with(index, value) {
      return signal.value.with(index, value);
    },
    [Symbol.iterator]() {
      return signal.value[Symbol.iterator]();
    },
    [Symbol.unscopables]: signal.value[Symbol.unscopables],
    clear() {
      signal.value = [];
      signal.update();
    }
  }
}