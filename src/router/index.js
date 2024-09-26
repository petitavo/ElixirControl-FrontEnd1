import { createRouter, createWebHistory } from 'vue-router';
import batchManagementComponent from "../elixir-control/winemaking-process/pages/batch-management.component.vue";
import fermentationManagementComponent from "../elixir-control/winemaking-process/pages/fermentation-management.component.vue";
import agingManagementComponent from "../elixir-control/winemaking-process/pages/aging-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/winemaking-process/batches',                    name: 'batches',      component: batchManagementComponent,        meta: { title: 'batches'}},
        {path: '/winemaking-process/fermentation',                name: 'Fermentation', component: fermentationManagementComponent, meta: { title: 'Fermentation'}},
        {path: '/winemaking-process/aging',                       name: 'Aging',        component: agingManagementComponent,        meta: { title: 'Aging'}},
    ]
});



export default router;