import { createApp } from "vue";
import "./style.css"; // ✅ CSS sudah di-import
import App from "./App.vue";
import router from "./router"; // ✅ Router sudah di-import

const app = createApp(App);

app.use(router); // ✅ Router sudah di-use

app.mount("#app");
