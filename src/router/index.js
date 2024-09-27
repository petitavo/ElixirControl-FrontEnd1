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
import ProductManagementComponent from "../elixir-control/products-mangment/pages/product-management.component.vue";
import InventoryManagementComponent from "../elixir-control/inventory-management/pages/inventory-management.vue";
import OrderHistory from "../elixir-control/distributor-profile/pages/order-history.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/productor/winemaking-process/batches',          name: 'batches',            component: batchManagementComponent,            meta: { title: 'batches'}},
        {path: '/productor/winemaking-process/fermentation',     name: 'Fermentation',       component: fermentationManagementComponent,     meta: { title: 'Fermentation'}},
        {path: '/productor/winemaking-process/aging',            name: 'Aging',              component: agingManagementComponent,            meta: { title: 'Aging'}},
        {path: '/productor/winemaking-process/bottling',         name: 'Bottling',           component: BottlingManagementComponent,         meta: { title: 'Bottling'}},
        {path: '/productor/winemaking-process/clarification',    name: 'Clarification',      component: ClarificationManagementComponent,    meta: { title: 'Clarification'}},
        {path: '/productor/winemaking-process/pressing',         name: 'Pressing',           component: PressingManagementComponent,         meta: { title: 'Pressing'}},
        {path: '/productor/winemaking-process',                  name: 'Winemaking Process', component: WinemakingProcessManagementComponent,meta: { title: 'Winemaking Process'}},
        {
            path: '/productor/inventory',
            name: 'InventoryManagement',
            component: InventoryManagementComponent,
            meta: { title: 'Inventory Management' }
        },
        {
            path: '/productor/orders/history',
            name: 'OrderHistory',
            component: OrderHistory,
            meta: { title: 'Order History' }
        },
        {path: '/productor/products',                            name: 'Products',           component: ProductManagementComponent,          meta: { title: 'Products'}},

    ]
});



export default router;