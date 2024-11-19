<script>
import OrderService from '../services/order-api.service.js';
import OrderCreateAndEdit from "../components/order-create-and-edit.vue";
import Paginator from 'primevue/paginator';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

export default {
  components: {
    OrderCreateAndEdit,
    Paginator,
    Toast,
  },
  data() {
    return {
      orders: [],
      editDialogVisible: false,
      selectedOrder: null,
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        this.orders = await OrderService.getAllOrders();
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },

    showDetails(order) {
      this.$router.push({ name: 'OrderDetails', params: { id: order.id } });
    },

    showStatus(order) {
      this.$toast.add({ severity: 'info', summary: 'Order Status', detail: `Status: ${order.status}`, life: 3000 });
    },

    async deleteOrder(order) {
      try {
        await OrderService.delete(order.id);
        this.fetchOrders(); // Refresh the list after deletion
        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Order deleted successfully', life: 3000 });
      } catch (error) {
        console.error("Error deleting order:", error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete order', life: 3000 });
      }
    },

    closeEditDialog() {
      this.editDialogVisible = false;
      this.selectedOrder = null;
    },

    openNewOrderDialog() {
      this.selectedOrder = {
        businessName: '',
        requestedDate: '',
        quantity: 0,
        phone: '',

      };
      this.editDialogVisible = true;
    },

    getStatusClass(status) {
      switch (status) {
        case 'Pending':
          return 'p-button-pending';
        case 'In process':
          return 'p-button-in-process';
        case 'Shipped':
          return 'p-button-shipped';
        case 'Delivered':
          return 'p-button-delivered';
        case 'Cancelled':
          return 'p-button-cancelled';
        case 'Refund':
          return 'p-button-refund';
        default:
          return '';
      }
    }
  },
};
</script>

<template>
  <div class="my-orders">
    <h1>My Orders</h1>

    <pv-data-table
        :value="orders"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 15]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} items"
    >
      <pv-column field="businessName" header="Business" />
      <pv-column field="requestedDate" header="Date" />
      <pv-column field="phone" header="Phone" />

      <pv-column headerStyle="width: 20rem">
        <template #body="{ data }">
          <pv-button label="Details" icon="pi pi-info-circle" @click="showDetails(data)" />
          <pv-button :label="data.status" :class="getStatusClass(data.status)" @click="showStatus(data)" />
          <pv-button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="deleteOrder(data)" />
        </template>
      </pv-column>
    </pv-data-table>

    <!-- Paginador -->
    <Paginator :totalRecords="orders.length" :rows="10" @page="onPageChange"></Paginator>

    <!-- Botón para agregar un nuevo pedido -->
    <pv-button label="Add New Order" @click="openNewOrderDialog" class="mt-3" />

    <!-- Dialog for order creation/editing -->
    <OrderCreateAndEdit
        v-model:visible="editDialogVisible"
        :order="selectedOrder"
        :edit="selectedOrder !== null"
        @canceled="closeEditDialog"
        @saved="fetchOrders"
    />

    <!-- Toast for notifications -->
    <Toast></Toast>
  </div>
</template>

<style scoped>
.p-button-pending {
  background-color: yellow;
  border-color: yellow;
}

.p-button-in-process {
  background-color: orange;
  border-color: orange;
}

.p-button-shipped {
  background-color: gray;
  border-color: gray;
}

.p-button-delivered {
  background-color: green;
  border-color: green;
}

.p-button-cancelled {
  background-color: red;
  border-color: red;
}

.p-button-refund {
  background-color: #8B4513; /* Marrón */
  border-color: #8B4513;
}
h1 {
  text-align: center;
}
button {
  margin: 1.5px;
}
</style>