<script>
import OrderRequestsProcessApiService from "../services/order-requests-api.service.js"; // Asegúrate de que la ruta sea correcta
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';

export default {
  components: {
    'pv-dialog': Dialog,
    'pv-input-text': InputText,
    'pv-input-number': InputNumber,
    'pv-calendar': Calendar,
    'pv-button': Button,
  },
  props: {
    Visible: {
      type: Boolean,
      required: true,
    },
    orderRequests: {
      type: Object,
      default: () => ({
        quantity: 0,
        price: 0,
        status: '',
        orderNumber: '',
        orderDate: '',
        transportCondition: '',
        paymentMethod: '',
        consumerPhone: '',
        producerPhone: '',
        paymentTerms: '',
        date: '',
        deliveryDate: '',
        type: ''
      }),
    },
    edit: {
      type: Boolean,
      default: false,
    },
},
  data() {
  return {
  orderItem: { ...this.orderRequests },
};
},
  watch: {
  orderRequests(newVal) {
  this.orderItem = { ...newVal };
}
},
  methods: {
    closeDialog() {
      this.$emit('canceled');
    },
    async saveOrder() {
      try {
        // Check if it's an edit operation
        if (this.edit && this.orderItem.id) {
          await OrderRequestsProcessApiService.update(this.orderItem.id, this.orderItem);
        } else {
          // For new orders, do not include id
          await OrderRequestsProcessApiService.create(this.orderItem);
        }
        this.$emit('saved');
        this.closeDialog();
      } catch (error) {
        console.error("Error saving order:", error);
      }
    },
  },
};
</script>

<template>
    <pv-dialog :visible="Visible" @hide="closeDialog" header="Create/Edit Order Requests">
      <div class="form-group">
        <label for="type">Type:</label>
        <pv-input-text id="type" v-model="orderItem.type" required />
      </div>

      <div>

      <div class="form-group">
        <label for="date">Date:</label>
        <pv-calendar id="date" v-model="orderItem.date" dateFormat="mm/dd/yy" required />
      </div>

      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <pv-input-number id="quantity" v-model="orderItem.quantity" required />
      </div>

      <div class="form-group">
        <label for="producerphone">Producer Phone:</label>
        <pv-input-text id="producerphone" v-model="orderItem.producerphone" required />
      </div>

      <div class="form-group">
        <label for="consumerphone">Consumer Phone:</label>
        <pv-input-text id="consumerphone" v-model="orderItem.consumerphone" required />
      </div>

      <div class="form-group">
        <label for="paymentmethod">Payment Method:</label>
        <pv-input-text id="paymentmethod" v-model="orderItem.paymentmethod" required />
      </div>

      <div class="form-group">
        <label for="paymentterms">Payment Terms:</label>
        <pv-input-text id="paymentterms" v-model="orderItem.paymentterms" required />
      </div>

      <div class="form-group">
        <label for="deliverydate">Delivery Date:</label>
        <pv-calendar id="deliverydate" v-model="orderItem.deliverydate" dateFormat="mm/dd/yy" required />
      </div>

      <div class="form-group">
        <label for="transportcondition">Transport Condition:</label>
        <pv-input-text id="transportcondition" v-model="orderItem.transportcondition" required />
      </div>

      <div class="form-group">
        <label for="status">Status:</label>
        <pv-input-text id="status" v-model="orderItem.status" required />
      </div>

      <div class="form-group">
        <label for="ordernumber">Order Number:</label>
        <pv-input-text id="ordernumber" v-model="orderItem.ordernumber" required />
      </div>

      <div class="form-group">
        <label for="price">Price:</label>
        <pv-input-text id="price" v-model="orderItem.price" required />
      </div>

      <div class="form-group">
        <label for="orderdate">Order Date:</label>
        <pv-input-text id="orderdate" v-model="orderItem.orderdate" required />
      </div>
      </div>

      <template #footer>
        <pv-button label="Cancel" @click="closeDialog" />
        <pv-button label="Save" severity="success" @click="saveOrder" />
      </template>
    </pv-dialog>

</template>

<style scoped>

</style>

