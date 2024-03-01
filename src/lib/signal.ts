export interface ISignal<T> extends Disposable {
  value: T;
  sub: (listener: (value: T) => void) => void;
  unsub: (listener: (value: T) => void) => void;
  update: () => void;
};
export const createSignal = <T>(defaultValue: T): ISignal<T> => {
  type Listener = (value: T) => void;
  let value: T = defaultValue;
  const listeners = new Set<Listener>();

  let isUpdating = false;

  const sub = (listener: Listener) => {
    listeners.add(listener);
  }
  const unsub = (listener: Listener) => {
    listeners.delete(listener);
  }
  const update = () => {
    if (isUpdating) return;
    isUpdating = true;
    queueMicrotask(() => {
      isUpdating = false;
      for (const listener of listeners) {
        try {
          listener(value);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
  const dispose = () => {
    listeners.clear();
  }
  return {
    get value() {
      return value;
    },
    set value(v: T) {
      value = v;
      update();
    },
    sub,
    unsub,
    update,
    [Symbol.dispose]: dispose,
  }
}

export interface ISignalEntity<T> {
  get signal(): ISignal<T>
}