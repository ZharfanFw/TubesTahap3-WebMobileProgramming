import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/components/pages/Welcome.vue";
import BookingSection from "@/components/pages/BookingSection.vue";
// import TempatSection from "@/components/pages/TempatSection.vue";
// import ShopSection from "@/components/pages/ShopSection.vue";
// import SewaSection from "@/components/pages/SewaSection.vue";
// import LoginSection from "@/components/pages/LoginSection.vue";
// import SignupSection from "@/components/pages/SignupSection.vue";

const routes = [
  { path: "/", component: Welcome },
  { path: "/booking", component: BookingSection },
  //  { path: "/tempat", component: TempatSection },
  //  { path: "/shop", component: ShopSection },
  //  { path: "/sewa", component: SewaSection },
  // { path: "/login", component: LoginSection },
  // { path: "/signup", component: SignupSection },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
