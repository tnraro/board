type Event<IntrinsicEvent, Type extends keyof IntrinsicEvent> = { type: Type } & IntrinsicEvent[Type];
type IntrinsicEventHelper<IntrinsicEvent> = { [Type in keyof IntrinsicEvent]: IntrinsicEvent[Type] };
type Listener<IntrinsicEvent, Type extends keyof IntrinsicEvent> = (event: Event<IntrinsicEvent, Type>) => void


export interface IEventEmitter<IntrinsicEvent extends IntrinsicEventHelper<IntrinsicEvent>> {
  on: <Type extends keyof IntrinsicEvent>(type: Type, listener: Listener<IntrinsicEvent, Type>) => void;
  off: <Type extends keyof IntrinsicEvent>(type: Type, listener: Listener<IntrinsicEvent, Type>) => void;
  emit: <Type extends keyof IntrinsicEvent>(event: Event<IntrinsicEvent, Type>) => void;
}

export const emitter = <IntrinsicEvent extends IntrinsicEventHelper<IntrinsicEvent>>(): IEventEmitter<IntrinsicEvent> => {
  const listeners = new Map<keyof IntrinsicEvent, Set<Listener<IntrinsicEvent, keyof IntrinsicEvent>>>();

  const on = <Type extends keyof IntrinsicEvent>(type: Type, listener: Listener<IntrinsicEvent, Type>) => {
    const set = listeners.get(type) ?? new Set();
    set.add(listener as any);
    listeners.set(type, set);
  }
  const off = <Type extends keyof IntrinsicEvent>(type: Type, listener: Listener<IntrinsicEvent, Type>) => {
    const set = listeners.get(type);
    if (set == null) return;
    set.delete(listener as any);
  }
  const emit = <Type extends keyof IntrinsicEvent>(event: Event<IntrinsicEvent, Type>) => {
    const set = listeners.get(event.type);
    if (set != null) return;
    queueMicrotask(() => {
      for (const listener of set!) {
        try {
          listener(event);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
  return {
    on, off, emit,
  };
}