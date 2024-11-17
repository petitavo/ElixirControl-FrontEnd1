import { createRouter, createWebHistory } from 'vue-router';
import OrderRequestsCreated from "../elixir-control/order-requests/pages/order-requests-created.component.vue";
import homeContentComponent from "../elixir-control/security/pages/home-content.component.vue";
import navbarElixirControlComponent from "../public/component/navbar-elixir-control.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/distributor/order-requests', name: 'OrderRequests', component: OrderRequestsCreated, meta: { title: 'Order Requests' } },
        { path: '/distributor/login', name: 'Navigator', component: navbarElixirControlComponent, meta: { title: 'Navigator' } },
        { path: '/home', name: 'Home', component: homeContentComponent, meta: { title: 'Home' } },

        { path: '/', redirect: '/home' },
        { path: '/:pathMatch(.*)*', redirect: '/home' }
    ]
});

export default router;