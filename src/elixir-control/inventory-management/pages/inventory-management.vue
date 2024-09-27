<script>

import InventoryCreateAndEdit from '../components/inventory-create-and-edit.vue';
import InventoryProcessApiService from "../services/inventory-process-api.service.js";
export default {
  components: {
    InventoryCreateAndEdit,
  },
  data() {
    return {
      inventoryList: [],
      filteredInventoryList: [],
      selectedType: '',
      selectedUnit: '',
      selectedItems: [],
      dialogVisible: false,
      currentItem: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchInventory();
  },
  methods: {
    async fetchInventory() {
      try {
        const items = await InventoryProcessApiService.getAllResources();
        this.inventoryList = items;
        this.filteredInventoryList = items;
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    },

    applyFilter() {
      this.filteredInventoryList = this.inventoryList.filter(item => {
        const matchesType = this.selectedType ? item.type === this.selectedType : true;
        const matchesUnit = this.selectedUnit ? item.unit === this.selectedUnit : true;
        return matchesType && matchesUnit;
      });
    },

    openCreateDialog() {
      this.currentItem = {};
      this.isEditMode = false;
      this.dialogVisible = true;
    },

    editItem(item) {
      this.currentItem = { ...item };
      this.isEditMode = true;
      this.dialogVisible = true;
    },

    confirmDeleteItem(item) {
      if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        console.log("Deleting item with ID:", item.id);
        this.deleteItem(item.id)
      }
    },

    async deleteItem(id) {
      try {
        await InventoryProcessApiService.delete(id);
        await this.fetchInventory();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },

    closeDialog() {
      this.dialogVisible = false;
    }
  }
}
</script>

<template>
  <div class="inventory-management">
    <h1>Inventory Management</h1>

    <div class="filter-container">
      <div class="filter-item">
        <label for="typeFilter">Filter by Type:</label>
        <select v-model="selectedType" @change="applyFilter" id="typeFilter">
          <option value="">All</option>
          <option value="Raw Material">Raw Material</option>
          <option value="Equipment">Equipment</option>
          <option value="Consumable">Consumable</option>
        </select>
      </div>

      <div class="filter-item">
        <label for="unitFilter">Filter by Unit:</label>
        <select v-model="selectedUnit" @change="applyFilter" id="unitFilter">
          <option value="">All</option>
          <option value="kg">kg</option>
          <option value="units">units</option>
        </select>
      </div>
    </div>
    <div class="table-container">
      <pv-data-table
          v-model:selection="selectedItems"
          :value="filteredInventoryList"
      :paginator="true"
      :rows="10"
      :rows-per-page-options="[5, 10, 15]"
      current-page-report-template="Showing {first} to {last} of {totalRecords} items">

      <pv-column field="name" header="Name" />
      <pv-column field="quantity" header="Quantity" />
      <pv-column field="unit" header="Unit" />
      <pv-column field="supplier" header="Supplier" />
      <pv-column field="costPerUnit" header="Cost Per Unit" />
      <pv-column field="expiration" header="Expiration Date" />
      <pv-column field="lastUpdated" header="Last Updated" />
      <pv-column field="type" header="Type" />

      <pv-column headerStyle="width: 8rem">
        <template #body="{ data }">
          <pv-button icon="pi pi-pencil" @click="editItem(data)" />
          <pv-button icon="pi pi-trash" @click="confirmDeleteItem(data)" severity="danger" />
        </template>
      </pv-column>
      </pv-data-table>
    </div>

    <!-- Centered Add New Button -->
    <div class="add-new-button-container">
      <pv-button icon="pi pi-plus" label="Add New" severity="success" @click="openCreateDialog" />
    </div>

    <!-- Dialog for create and edit -->
    <inventory-create-and-edit
        v-model:visible="dialogVisible"
        :entity="currentItem"
        :edit="isEditMode"
        @saved="fetchInventory"
        @canceled="closeDialog"
    />
  </div>
</template>

<style scoped>
  .inventory-management {
    padding: 20px;
  }

  .filter-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    width: 200px;
  }

  .filter-item label {
    margin-bottom: 5px;
  }

  .filter-item select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .table-container {
    max-width: 100%;
    overflow-x: auto;
  }

  .add-new-button-container {
    text-align: center; /* Center the button horizontally */
    margin: 20px 0; /* Add some vertical spacing */
  }
</style>