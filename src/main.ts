import { mount } from "svelte";
import "./lib/styles/index.scss";
import App from "./presentation/app.svelte";

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
