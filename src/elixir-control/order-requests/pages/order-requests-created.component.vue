<script>
import OrderRequestsService from '../services/order-requests-api.service.js';
import OrderRequestsCreateAndEdit from "../components/order-requests-create-and-edit.component.vue";
import NavbarElixirControl from "../../../public/component/navbar-elixir-control.component.vue";
export default {
  components: {
    NavbarElixirControl,
    OrderRequestsCreateAndEdit,
  },
  data() {
    return {
      orderRequests: [],
      editDialogVisible: false,
      selectedOrderRequests: null,
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        this.orderRequests = await OrderRequestsService.getAllOrderRequests();
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },

    closeEditDialog() {
      this.editDialogVisible = false;
      this.selectedOrderRequests = null;
    },

    openNewOrderDialog() {
      this.selectedOrderRequests = {
        quantity: 0,
        price: 0,
        status: '',
        ordernumber: '',
        orderdate: '',
        transportcondition: '',
        paymentmethod: '',
        consumerphone: '',
        producerphone: '',
        paymentterms: '',
        date: '',
        deliverydate: '',
        type: ''
      };
      this.editDialogVisible = true;
    }
  },
};
</script>

<template>

  <NavbarElixirControl/>

  <div class="order-requests">
    <h1>Order Requests</h1>

    <pv-data-table
        :value="orderRequests"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 15]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} items"
    >
      <pv-column field="type" header="Type" />
      <pv-column field="date" header="Date" />
      <pv-column field="quantity" header="Quantity" />
      <pv-column field="producerphone" header="Producer Phone" />
      <pv-column field="consumerphone" header="Consumer Phone" />
      <pv-column field="paymentmethod" header="Payment Method" />
      <pv-column field="paymentterms" header="Payment Terms" />
      <pv-column field="deliverydate" header="Delivery Date" />
      <pv-column field="transportcondition" header="Transport Condition" />
      <pv-column field="status" header="Status" />
      <pv-column field="ordernumber" header="Order Number" />
      <pv-column field="orderdate" header="Order Date" />
      <pv-column field="price" header="Price" />

    </pv-data-table>

    <!-- Paginador -->
    <paginator :totalRecords="orderRequests.length" :rows="10" @page="onPageChange"></paginator>
    <!-- Botón para agregar un nuevo pedido -->
    <pv-button label="Add New Order" @click="openNewOrderDialog" class="mt-3" />

    <!-- Dialog for order creation/editing -->
    <OrderRequestsCreateAndEdit
          v-model:visible="editDialogVisible"
          :order="selectedOrderRequests"
          :edit="selectedOrderRequests !== null"
        @canceled="closeEditDialog"
        @saved="fetchOrders"
    />
  </div>
</template>

<style scoped>

</style>