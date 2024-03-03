<script lang="ts">
  import Canvas from "./canvas.svelte";
  import Ui from "./ui.svelte";
</script>

<div class="_canvas">
  <Canvas />
</div>
<div class="_ui">
  <Ui />
</div>

<style lang="scss">
  ._ui,
  ._canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  ._ui {
    pointer-events: none;
  }
  ._canvas {
    display: grid;
    place-items: center;
  }
</style>
