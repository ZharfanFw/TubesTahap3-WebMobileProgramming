import { createRouter, createWebHistory } from "vue-router";

import Welcome from "@/components/pages/Welcome.vue";
import BookingSection from "@/components/pages/BookingSection.vue";
import SignUp from "@/components/pages/Sign-up.vue";
import Payment from "@/components/pages/Payment.vue";
import Welcome from "@/components/pages/Welcome.vue";
import MethodPayment from "@/components/pages/MethodPayment.vue";
import MemancingSection from "@/components/pages/MemancingSection.vue";
import Cart from "@/components/pages/Cart.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/method-payment",
    name: "MethodPayment",
    component: MethodPayment,
  },
  {
    path: "/memancing-section",
    name: "MemancingSection",
    component: MemancingSection,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/booking".
    name: "Booking",
    component: BookingSection,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
