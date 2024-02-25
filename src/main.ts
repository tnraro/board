import { mount } from "svelte";
import App from "./app/app.svelte";
import "./lib/styles/index.scss";

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
