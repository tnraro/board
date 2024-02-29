<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    id: string;
    x: number;
    y: number;
    z: number;
    r: number;
    flipped: boolean;
    children: Snippet;
  }
  const focus = () => {
    dy = -2;
    dz = 999999;
  };
  const blur = () => {
    dy = 0;
    dz = 0;
  };
  let { id, x, y, z, r, flipped, children } = $props<Props>();
  let dy = $state(0);
  let dz = $state(0);
</script>

<button
  class="_ card"
  style:left="{x}rem"
  style:top="{y + dy - (z + dz) * 0.1}rem"
  style:z-index={z + dz}
  style:---r="{r}deg"
  style:---ry="{flipped ? 0.5 : 0}turn"
  data-id={id}
>
  <div class="_front">
    {@render children()}
  </div>
  <div class="_back">
    <p class="_back-text _back-text--rev">뒷면</p>
    <img class="_back-img" src="/food/hamburger.svg" alt="" draggable="false">
    <p class="_back-text">뒷면</p>
  </div>
</button>

<style lang="scss">
  ._ {
    all: unset;
    position: absolute;
    transition:
      top 0.2s ease-in-out,
      left 0.2s ease-in-out,
      transform 0.5s ease-in-out;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%) rotate(var(---r)) rotateY(var(---ry));
    width: 12rem;
    height: 16rem;
    user-select: none;
    &front,&back {
      position: absolute;
      backface-visibility: hidden;
      width: 100%;
      height: 100%;
    }
    &back {
      transform: rotateY(0.5turn);
      background: var(--gold-3);
      outline: 1px solid var(--gold-6);
      border-radius: 0.5rem;
      display: grid;
      place-items: center;
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      &-img {
        width: 6rem;
        mix-blend-mode: luminosity;
      }
      &-text {
        color: var(--gold-11);
        &--rev {
          transform: rotate(0.5turn);
        }
      }
    }
  }
</style>
