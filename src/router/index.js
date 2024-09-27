import { createRouter, createWebHistory } from 'vue-router';
import batchManagementComponent from "../elixir-control/winemaking-process/pages/batch-management.component.vue";
import fermentationManagementComponent from "../elixir-control/winemaking-process/pages/fermentation-management.component.vue";
import agingManagementComponent from "../elixir-control/winemaking-process/pages/aging-management.component.vue";
import BottlingManagementComponent from "../elixir-control/winemaking-process/pages/bottling-management.component.vue";
import ClarificationManagementComponent
    from "../elixir-control/winemaking-process/pages/clarification-management.component.vue";
import PressingManagementComponent from "../elixir-control/winemaking-process/pages/pressing-management.component.vue";
import WinemakingProcessManagementComponent
    from "../elixir-control/winemaking-process/pages/winemaking-process-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/winemaking-process/batches',          name: 'batches',            component: batchManagementComponent,            meta: { title: 'batches'}},
        {path: '/winemaking-process/fermentation',     name: 'Fermentation',       component: fermentationManagementComponent,     meta: { title: 'Fermentation'}},
        {path: '/winemaking-process/aging',            name: 'Aging',              component: agingManagementComponent,            meta: { title: 'Aging'}},
        {path: '/winemaking-process/bottling',         name: 'Bottling',           component: BottlingManagementComponent,         meta: { title: 'Bottling'}},
        {path: '/winemaking-process/clarification',    name: 'Clarification',      component: ClarificationManagementComponent,    meta: { title: 'Clarification'}},
        {path: '/winemaking-process/pressing',         name: 'Pressing',           component: PressingManagementComponent,         meta: { title: 'Pressing'}},
        {path: '/winemaking-process',                  name: 'Winemaking Process', component: WinemakingProcessManagementComponent,meta: { title: 'Winemaking Process'}},

    ]
});



export default router;