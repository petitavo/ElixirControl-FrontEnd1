import { createRouter, createWebHistory } from 'vue-router';
import batchManagementComponent from "../elixir-control/winemaking-process/pages/batch-management.component.vue";
import fermentationManagementComponent
    from "../elixir-control/winemaking-process/pages/fermentation-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/winemaking/batches',                    name: 'batches', component: batchManagementComponent, meta: { title: 'batches'}},
        { path: '/winemaking/batches/:batch_id',          name: 'batch', component: batchManagementComponent, meta: { title: 'batch'}},
        {path: '/winemaking/Fermentation',                name: 'Fermentation', component: fermentationManagementComponent, meta: { title: 'Fermentation'}},
    ]
});



export default router;