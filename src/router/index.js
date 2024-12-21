import { createRouter, createWebHistory } from 'vue-router';
import batchManagementComponent from "../elixir-control/winemaking-process/pages/batch-management.component.vue";
import fermentationManagementComponent from "../elixir-control/winemaking-process/pages/fermentation-management.component.vue";
import agingManagementComponent from "../elixir-control/winemaking-process/pages/aging-management.component.vue";
import BottlingManagementComponent from "../elixir-control/winemaking-process/pages/bottling-management.component.vue";
import ClarificationManagementComponent from "../elixir-control/winemaking-process/pages/clarification-management.component.vue";
import PressingManagementComponent from "../elixir-control/winemaking-process/pages/pressing-management.component.vue";
import WinemakingProcessManagementComponent from "../elixir-control/winemaking-process/pages/winemaking-process-management.component.vue";
import ProductManagementComponent from "../elixir-control/products-mangment/pages/product-management.component.vue";
import InventoryManagementComponent from "../elixir-control/inventory-management/pages/inventory-management.vue";
import InventoryDetailComponent from "../elixir-control/inventory-management/pages/inventory-details.vue";
import OrderHistory from "../elixir-control/distributor-profile/pages/order-history.vue";
import HomeContentComponent from "../public/pages/home-content.component.vue";
import ClientManagementComponent from "../elixir-control/customer-management/pages/client-management.component.vue";
import ClientDetailsComponent from "../elixir-control/customer-management/pages/client-details.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";
import OrderRequestsCreated from "../elixir-control/order-requests/pages/order-requests-created.component.vue";
import navbarElixirControlComponent from "../public/component/navbar-elixir-control.component.vue";
import OrderManagement from "../elixir-control/order-management/pages/order-management.vue";
import OrderDetails from "../elixir-control/order-management/pages/order-details.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {path: '/:pathMatch(.*)*', redirect: '/home'},
        {path: '/', name: 'Home', component: HomeContentComponent, meta: { title: 'Home'}},
        {path: '/home', name: 'home', component: HomeContentComponent, meta: { title: 'home'}},


        /*=========================== Winemaking Process Routes ===========================*/
        {path: '/vinicultor/winemaking-process/batches',       name: 'Batches',             component: batchManagementComponent,            meta: { title: 'Batches'}},
        {path: '/vinicultor/winemaking-process/fermentation',  name: 'Fermentation',        component: fermentationManagementComponent,     meta: { title: 'Fermentation'}},
        {path: '/vinicultor/winemaking-process/aging',         name: 'Aging',               component: agingManagementComponent,            meta: { title: 'Aging'}},
        {path: '/vinicultor/winemaking-process/bottling',      name: 'Bottling',            component: BottlingManagementComponent,         meta: { title: 'Bottling'}},
        {path: '/vinicultor/winemaking-process/clarification', name: 'Clarification',       component: ClarificationManagementComponent,    meta: { title: 'Clarification'}},
        {path: '/vinicultor/winemaking-process/pressing',      name: 'Pressing',            component: PressingManagementComponent,         meta: { title: 'Pressing'}},
        {path: '/vinicultor/winemaking-process',               name: 'Winemaking-Process',  component: WinemakingProcessManagementComponent,meta: { title: 'Winemaking Process'}},

        /*=========================== Inventory Management Routes ===========================*/
        {path: '/vinicultor/inventory',                        name: 'Inventory-Management',component: InventoryManagementComponent,        meta: { title: 'Inventory Management' }},
        {path: '/vinicultor/inventory/:id',                    name: 'InventoryDetail',     component: InventoryDetailComponent,            meta: { title: 'Inventory Item Details' }},

        /*=========================== Customer Management Routes ===========================*/
        {path:'/vinicultor/clients',             name: 'Clients', component: ClientManagementComponent, meta: { title: 'Clients'}},
        {path:'/vinicultor/clients/details/:id', name: 'ClientDetails', component: ClientDetailsComponent, meta: { title: 'Client Details'}, props: true},

        /*=========================== Distributor Profile Routes ===========================*/
        {path: '/vinicultor/orders/history', name: 'OrderHistory',        component: OrderHistory,                        meta: { title: 'Order History' }},

        {path: '/vinicultor/products',       name: 'Products',            component: ProductManagementComponent,          meta: { title: 'Products'}},
        {path: '/productor/myorders',        name: 'MyOrder',             component: OrderManagement,                     meta: { title: 'My Orders' }},
        {path: '/productor/orderdetails/:id',       name: 'OrderDetails',            component: OrderDetails,          meta: { title: 'Order Details'}},

        /*=========================== IAM ===========================*/
        { path: '/distributor/order-requests', name: 'OrderRequests', component: OrderRequestsCreated, meta: { title: 'Order Requests' } },
        { path: '/distributor/login', name: 'Navigator', component: navbarElixirControlComponent, meta: { title: 'Navigator' } },
        /*=========================== IAM ===========================*/


        { path: '/home/sign-in',                 name: 'sign-in',    component: SignInComponent,             meta: { title: 'Sign In'}},
        { path: '/home/sign-up',                 name: 'sign-up',    component: SignUpComponent,             meta: { title: 'Sign Up'}}


    ]
});


router.beforeEach((to, from, next) => {
    let baseTitle = 'Elixir Control';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
})

export default router;