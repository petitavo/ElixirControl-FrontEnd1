<script>
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import OrderService from '../services/order-api.service.js';

export default {
  components: {
    Dropdown,
    Button,
    Toast,
  },
  data() {
    return {
      order: null,
      statusOptions: [
        { label: 'Pending', value: 'Pending' },
        { label: 'In process', value: 'In process' },
        { label: 'Shipped', value: 'Shipped' },
        { label: 'Delivered', value: 'Delivered' },
        { label: 'Cancelled', value: 'Cancelled' },
        { label: 'Refund', value: 'Refund' },
      ],
      selectedStatus: null,
    };
  },
  created() {
    const id = this.$route.params.id;
    this.fetchItemDetails(id);
  },
  methods: {
    async fetchItemDetails(id) {
      const response = await OrderService.getOrderById(id);
      this.order = response.data;
      this.selectedStatus = this.order.status;
    },
    async updateStatus() {
      try {
        this.order.status = this.selectedStatus;
        await OrderService.update(this.order.id, this.order);
        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Order status updated successfully', life: 3000 });
      } catch (error) {
        console.error("Error updating order status:", error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update order status', life: 3000 });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<template>
  <div class="order-details">
    <h1>Order Details</h1>
    <div v-if="order" class="card">
      <div class="card-header">
        <p><strong>Business Name: </strong>{{order.businessName}}</p>
        <p><strong>Requested Date:</strong> {{ order.requestedDate }}</p>
        <p><strong>Quantity:</strong> {{ order.quantity }}</p>
      </div>
      <div class="card-body">
        <h3>Contact Details</h3>
        <p><strong>Contact Name:</strong> {{ order.contactName }}</p>
        <p><strong>Phone:</strong> {{ order.phone }}</p>
        <p><strong>Address:</strong> {{ order.address }}</p>
        <p><strong>Email:</strong> {{ order.email }}</p>
        <p><strong>RUC:</strong> {{ order.ruc }}</p>
        <p><strong>Wine Type:</strong> {{ order.wineType }}</p>
        <p><strong>Payment Method:</strong> {{ order.paymentMethod }}</p>
        <p><strong>Delivery Date:</strong> {{ order.deliveryDate }}</p>
        <h3>Order Details</h3>
        <p><strong>Product Name:</strong> {{ order.productName }}</p>
        <p><strong>Conditions of Transport:</strong> {{ order.transportCondition }}</p>
        <p><strong>Terms of Pay:</strong> {{ order.paymentTerms }}</p>
        <h3>Update Status</h3>
        <Dropdown v-model="selectedStatus" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="Select a Status" />
        <Button label="Update Status" @click="updateStatus" class="mt-2" />
      </div>
    </div>
    <div class="button-container">
      <button class="back-button" @click="goBack">Back</button>
    </div>
    <Toast></Toast>
  </div>
</template>

<style scoped>
.order-details {
  padding: 20px;
  text-align: left;
}
h2 {
  text-align: center;
  font-size: 30px;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.card-header {
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.card-body h3 {
  margin-top: 15px;
}
.card {
  max-width: 600px;
}
.button-container {
  margin-top: 20px;
  text-align: center;
}
.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.back-button:hover {
  background-color: #0056b3;
}
</style>