<script>
import {Batch} from "../model/batch.entity.js";
import {batchApiService} from "../services/batch-api.service.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import BatchesCreateAndEdit from "../components/batch-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";
import {ProfileApiService} from "../services/profile-api.service.js";
import {useAuthenticationStore} from "../../../iam/services/authentication.store.js";


export default {
  name: "batch-management",
  components: {WinemakingProcessManagement, BatchesCreateAndEdit, DataManager},

  data() {

    const authenticationStore = useAuthenticationStore();

    return {
      title: { singular: 'Batch', plural: 'Batches' },
      batches: [],
      batch: new Batch({}),
      selectedBatches: [],
      batchApiService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
      profileId: null,

      profileApiService: new ProfileApiService(),

      isSignedIn: authenticationStore.isSignedIn,
      currentUserId: authenticationStore.currentUserId,
      currentUsername: authenticationStore.currentUsername,
      currentToken: authenticationStore.currentToken,
      currentRole: authenticationStore.currentRole
    }
  },

  methods: {

    //#region Utility Methods
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.batches.findIndex(batch => batch.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.batch = new Batch({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.batch = new Batch(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.batch = new Batch(item);
      this.deleteBatch();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedBatches = selectedItems;
      this.deleteSelectedBatches();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {

      console.log('onSaveRequestedManagement', item);

      if (this.isEdit) {
        this.updateBatch();
      } else {
        this.createBatch();
      }

      this.submitted = true;


      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion

    //#region CRUD Operations
    createBatch() {

      console.log('Create Batch', this.profileId);

      this.batchApiService.create(this.batch, this.profileId).then(response => {
        let newBatch = new Batch(response.data);
        this.batches.push(newBatch);
        this.notifySuccessfulAction('Batch created successfully');
      }).catch(error => {
        console.error("Error creating a batch",error);
      });
    },

    updateBatch() {
      console.log('Update Batch', this.batch.id);
      this.batchApiService.update(this.batch.id, this.batch).then(response => {
       let index = this.findIndexById(this.batch.id);
        this.batches[index] = new Batch(response.data);
        this.notifySuccessfulAction('Batch updated successfully');
      }).catch(error => {
        console.error("Error updating a batch",error);
      });
    },

    deleteBatch() {
      this.batchApiService.delete(this.batch.id).then(() => {
       let index = this.findIndexById(this.batch.id);
        this.batches.splice(index, 1);
        this.notifySuccessfulAction('Batch deleted successfully');
      }).catch(error => {
        console.error("Error deleting a batch",error);
      });
    },

    deleteSelectedBatches() {
      this.selectedBatches.forEach((variable) => {
        this.batchApiService.delete(variable.id).then(() => {
          this.batches = this.batches.filter((b) => b.id !== variable.id);
        }).catch(error => {
          console.error("Error deleting a batch", error);
        });
      });

      this.notifySuccessfulAction('Batches deleted successfully');
    },
    //#endregion

    getAllResources(profileId) {

      this.batchApiService.getAllResourcesByProfileId(profileId).then(response => {

        this.batches = response.data.map(batch => new Batch(batch));

        console.log('Batches', this.batches);

      }).catch(error => {
        console.error("Error getting all batches", error);
      });

    },

    getProfileByUserId(userId) {
      this.profileApiService.getProfileById(userId).then(response => {

        console.log('Profile Data: ', response.data);

        this.profileId = response.data.id;

        this.getAllResources(this.profileId );

      }).catch(error => {
        console.error("Error getting profile by user id", error);
      });
    }

  },


  //#region Lifecycle Hooks
  created() {

    this.batchApiService = new batchApiService();

    this.getProfileByUserId(this.currentUserId);

    console.log('Batch Management component created');
  }
  //#endregion

}
</script>

<template>

  <winemaking-process-management></winemaking-process-management>

  <div>

    <data-manager :title="title"
                  v-bind:items="batches"
                  v-on:new-item-requested-manager="onNewItem"
                  v-on:edit-item-requested-manager="onEditItem($event)"
                  v-on:delete-item-requested-manager="onDeleteItem($event)"
                  v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">

      <template #custom-columns-manager >

        <pv-column :sortable="true" field="id"           header="Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="vineyardCode" header="Vineyard Code" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="grapeVariety" header="Grape Variety" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="harvestDate"  header="Harvest Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="grapeQuantity" header="Grape Quantity" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="vineyardOrigin" header="Vineyard Origin" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="processStartDate" header="Start Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="status" header="Status" style="min-width: 6rem"/>

      </template>
    </data-manager>

    <batches-create-and-edit
        :edit = "isEdit"
        :itemBatch="batch"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested-batches="onCancelRequested"
        v-on:save-requested-batches="onSaveRequested($event)">
    </batches-create-and-edit>

  </div>

</template>

<style scoped>

</style>