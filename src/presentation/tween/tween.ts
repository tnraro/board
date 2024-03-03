import { lerp } from "./easing";

const tweens = new Map<string, Generator<undefined, void, number>>();

const tweenIdMap = new WeakMap<any, string>();

interface TweenOptions {
  id: string;
  time: number;
  origin?: number;
  target?: number;
  easing?: (t: number) => number;
  onchange: (value: number) => void;
  oncomplete?: () => void;
  oncancel?: () => void;
}

function* _tween(options: TweenOptions) {
  const {
    time,
    origin = 0,
    target = 1,
    easing = (t: number) => t,
    onchange,
    oncomplete,
    oncancel,
  } = options;
  let elapsedTime = 0;
  while (true) {
    const delta: number = yield;
    if (delta === -53) {
      oncancel?.();
      break;
    }
    elapsedTime += delta;
    const t = elapsedTime / time;
    if (elapsedTime >= time) {
      onchange(target);
      oncomplete?.();
      break;
    }
    const value = lerp(origin, target, easing(t));
    onchange(value);
  }
}

export const tween = (options: TweenOptions) => {
  _cancelTween(options);
  tweens.set(options.id, _tween(options));
}

export const updateTween = (delta: number) => {
  for (const [id, tween] of tweens) {
    const { done } = tween.next(delta);
    if (done) {
      tweens.delete(id);
    }
  }
}

export const getTweenId = (object: any) => {
  const id = tweenIdMap.get(object);
  if (id != null) return id;
  const _id = crypto.randomUUID();
  tweenIdMap.set(object, _id);
  return _id;
}

const _cancelTween = (options: Pick<TweenOptions, "id">) => {
  const id = options.id;
  tweens.get(id)?.next(-53);
  tweens.delete(id);
}