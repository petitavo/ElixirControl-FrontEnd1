<script>
import OrderProcessApiService from "../services/order-api.service.js";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';

export default {
  components: {
    'pv-dialog': Dialog,
    'pv-input-text': InputText,
    'pv-input-number': InputNumber,
    'pv-calendar': Calendar,
    'pv-button': Button,
    'pv-dropdown': Dropdown,
    'pv-textarea': Textarea,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    order: {
      type: Object,
      default: () => ({
        business: '',
        date: '',
        quantity: 0,
        contact: {
          name: '',
          phone: '',
          address: '',
          email: '',
          ruc: '',
          wineType: '',
          paymentMethod: '',
          deliveryDate: '',
        },
        products: '',
        transportConditions: '',
        paymentTerms: '',
      }),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      orderItem: { ...this.order },
      productOptions: [
        { label: 'Product 1', value: 'product1' },
        { label: 'Product 2', value: 'product2' },
        // Agrega más opciones según sea necesario
      ],
    };
  },
  watch: {
    order(newVal) {
      this.orderItem = { ...newVal };
    }
  },
  methods: {
    closeDialog() {
      this.$emit('canceled');
    },
    async saveOrder() {
      try {
        if (this.edit) {
          await OrderProcessApiService.update(this.orderItem.id, this.orderItem);
        } else {
          await OrderProcessApiService.create(this.orderItem);
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
  <div>
    <pv-dialog :visible="visible" @hide="closeDialog" header="Add New Order">
      <div class="form-group">
        <label for="business">Business:</label>
        <pv-input-text id="business" v-model="orderItem.business" required />
      </div>

      <div class="form-group">
        <label for="date">Date:</label>
        <pv-calendar id="date" v-model="orderItem.date" dateFormat="mm/dd/yy" required />
      </div>

      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <pv-input-number id="quantity" v-model="orderItem.quantity" required />
      </div>

      <h3>Contact Details</h3>

      <div class="form-group">
        <label for="contactName">Contact Name:</label>
        <pv-input-text id="contactName" v-model="orderItem.name" required />
      </div>

      <div class="form-group">
        <label for="contactPhone">Contact Phone:</label>
        <pv-input-text id="contactPhone" v-model="orderItem.phone" required />
      </div>

      <div class="form-group">
        <label for="contactAddress">Contact Address:</label>
        <pv-input-text id="contactAddress" v-model="orderItem.address" required />
      </div>

      <div class="form-group">
        <label for="contactEmail">Contact Email:</label>
        <pv-input-text id="contactEmail" v-model="orderItem.email" required />
      </div>

      <div class="form-group">
        <label for="contactRUC">Contact RUC:</label>
        <pv-input-text id="contactRUC" v-model="orderItem.ruc" required />
      </div>

      <div class="form-group">
        <label for="products">Products:</label>
        <pv-dropdown id="products" v-model="orderItem.products" :options="productOptions" required />
      </div>

      <div class="form-group">
        <label for="transportConditions">Conditions of Transport:</label>
        <pv-textarea id="transportConditions" v-model="orderItem.transportConditions" required />
      </div>

      <div class="form-group">
        <label for="paymentTerms">Terms of Pay:</label>
        <pv-textarea id="paymentTerms" v-model="orderItem.paymentTerms" required />
      </div>

      <template #footer>
        <pv-button label="Cancel" @click="closeDialog" />
        <pv-button label="Save" severity="success" @click="saveOrder" />
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
/* Agrega estilos según sea necesario */
</style>