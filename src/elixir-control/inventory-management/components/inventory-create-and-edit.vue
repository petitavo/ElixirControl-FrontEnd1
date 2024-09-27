<script>
import InventoryProcessApiService from "../services/inventory-process-api.service.js";

import  Button  from 'primevue/button';
import  Calendar  from 'primevue/calendar';
import  InputText  from 'primevue/inputtext';
import  InputNumber  from 'primevue/inputnumber';
import  Dialog  from 'primevue/dialog';
export default {
  components: {
    'pv-dialog': Dialog,
    'pv-input-text': InputText,
    'pv-input-number': InputNumber,
    'pv-calendar': Calendar,
    'pv-button': Button,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    entity: {
      type: Object,
      default: () => ({}),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inventoryItem: { ...this.entity }, // Usar un nombre más descriptivo
    };
  },
  methods: {
    closeDialog() {
      this.$emit('canceled'); // Emitir evento cancelado al padre
    },
    async saveItem() {
      try {
        if (this.edit) {
          // Actualizar artículo existente
          await InventoryProcessApiService.update(this.inventoryItem.inventory_id, this.inventoryItem);
        } else {
          // Crear nuevo artículo
          await InventoryProcessApiService.create(this.inventoryItem);
        }
        this.$emit('saved'); // Emitir evento guardado al padre
        this.closeDialog(); // Cerrar el diálogo
      } catch (error) {
        console.error("Error saving item:", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <pv-dialog :visible="visible" @hide="closeDialog" header="Add New Inventory Item">
      <div class="form-group">
        <label for="name">Name:</label>
        <pv-input-text id="name" v-model="inventoryItem.name" required />
      </div>

      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <pv-input-number id="quantity" v-model="inventoryItem.quantity" required />
      </div>

      <div class="form-group">
        <label for="unit">Unit:</label>
        <pv-input-text id="unit" v-model="inventoryItem.unit" placeholder="Enter unit (e.g., Kg, Units)" required />
      </div>

      <div class="form-group">
        <label for="supplier">Supplier:</label>
        <pv-input-text id="supplier" v-model="inventoryItem.supplier" required />
      </div>

      <div class="form-group">
        <label for="costPerUnit">Cost Per Unit:</label>
        <pv-input-number id="costPerUnit" v-model="inventoryItem.costPerUnit" required />
      </div>

      <div class="form-group">
        <label for="expiration">Expiration Date:</label>
        <pv-calendar id="expiration" v-model="inventoryItem.expiration" dateFormat="mm/dd/yy" required />
      </div>

      <div class="form-group">
        <label for="lastUpdated">Last Updated:</label>
        <pv-input-text id="lastUpdated" v-model="inventoryItem.lastUpdated" required />
      </div>

      <div class="form-group">
        <label for="type">Type:</label>
        <pv-input-text id="type" v-model="inventoryItem.type" required />
      </div>

      <!-- Add any other fields you need here -->

      <template #footer>
        <pv-button label="Cancel" @click="closeDialog" />
        <pv-button label="Save" severity="success" @click="saveItem" />
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
</style>