import { createRouter, createWebHistory } from 'vue-router';
import batchManagementComponent from "../elixir-control/winemaking-process/pages/batch-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [ { path: '/winemaking/batches',                    name: 'batches', component: batchManagementComponent, meta: { title: 'batches'}},]
});



export default router;