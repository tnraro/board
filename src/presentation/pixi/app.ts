import { Application } from "pixi.js";

export class PixiApp extends Application {
  constructor(view: HTMLCanvasElement) {
    super({
      view,
      background: "white",
      resizeTo: window,
      antialias: true,
      resolution: 2,
    });
  }
}