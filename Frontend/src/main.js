import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import * as BootstrapVueNext from "bootstrap-vue-next";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import CSS của Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
for (const component in BootstrapVueNext) {
  app.component(component, BootstrapVueNext[component]);
}
app.mount("#app");
