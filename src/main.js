import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import icons and add them to the Library */
import {
  faMagnifyingGlass,
  faStar,
  faLocationDot,
  faCalendarDays,
  faCoins,
  faTrophy,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMagnifyingGlass,
  faStar,
  faLocationDot,
  faCalendarDays,
  faCoins,
  faTrophy,
  faScaleBalanced,
);

const app = createApp(App);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
