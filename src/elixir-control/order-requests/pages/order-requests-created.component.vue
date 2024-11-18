<script>
import OrderRequestsService from "../services/order-requests-api.service.js";
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

    async deleteOrder(id) {
      try {
        await OrderRequestsService.deleteOrderRequests(id);
        this.fetchOrders(); // Actualiza la lista después de eliminar
      } catch (error) {
        console.error(`Error deleting order with ID ${id}:`, error);
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
        status: "",
        orderNumber: "",
        orderDate: "",
        transportCondition: "",
        paymentMethod: "",
        consumerPhone: "",
        producerPhone: "",
        paymentTerms: "",
        date: "",
        deliveryDate: "",
        type: "",
      };
      this.editDialogVisible = true;
    },
  },
};
</script>

<template>
  <NavbarElixirControl />

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
      <pv-column field="producerPhone" header="Producer Phone" />
      <pv-column field="consumerPhone" header="Consumer Phone" />
      <pv-column field="paymentMethod" header="Payment Method" />
      <pv-column field="paymentTerms" header="Payment Terms" />
      <pv-column field="deliveryDate" header="Delivery Date" />
      <pv-column field="transportCondition" header="Transport Condition" />
      <pv-column field="status" header="Status" />
      <pv-column field="orderNumber" header="Order Number" />
      <pv-column field="orderDate" header="Order Date" />
      <pv-column field="price" header="Price" />
      <pv-column header="Actions">
        <template #body="slotProps">
          <!-- Botón de eliminar -->
          <button @click="deleteOrder(slotProps.data.id)" class="delete-button">
            Delete
          </button>
        </template>
      </pv-column>
    </pv-data-table>

    <!-- Botón para agregar un nuevo pedido -->
    <button @click="openNewOrderDialog" class="add-order-button">New Order</button>

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
.add-order-button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.delete-button {
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px 1px;
  cursor: pointer;
}
</style>
