import { createApp } from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import { vMagnetic, vTilt, vParallax } from "./directives";

createApp(App)
  .directive("magnetic", vMagnetic)
  .directive("tilt", vTilt)
  .directive("parallax", vParallax)
  .mount("#app");
