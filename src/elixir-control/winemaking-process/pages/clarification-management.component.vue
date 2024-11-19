<script>
import {Clarification} from "../model/clarification.entity.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import ClarificationCreateAndEdit from "../components/clarification-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";
import {ClarificationApiService} from "../services/clarification-api.service.js";
import {ProfileApiService} from "../services/profile-api.service.js";
import {useAuthenticationStore} from "../../../iam/services/authentication.store.js";
import {batchApiService} from "../services/batch-api.service.js";
import {Batch} from "../model/batch.entity.js";
import {Fermentation} from "../model/fermentation.entity.js";


export default {
  name: "clarification-management",
  components: {WinemakingProcessManagement, ClarificationCreateAndEdit, DataManager},

  data() {
    const authenticationStore = useAuthenticationStore();

    return {
      title: {singular: 'Clarification', plural: 'Clarifications'},
      clarificationArray: [],
      clarification: new Clarification({}),
      selectedClarification: [],
      clarificationApiService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,

      batchApiService: null,

      profileApiService: new ProfileApiService(),

      currentUserId: authenticationStore.currentUserId,
    }
  },

  methods: {
    //#region Utility Methods
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.clarificationArray.findIndex(clarification => clarification.id === id);
    },
    //#endregion


    //#region Event Handlers
    onNewItem() {
      this.clarification = new Clarification({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      console.log("Item: ", item);
      this.clarification = new Clarification(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.clarification = new Clarification(item);
      this.deleteClarification();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedClarification = selectedItems;
      this.deleteSelectedClarification();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      console.log('onSaveRequestedManagement', item);

      if (this.isEdit) {
        console.log('Updating Clarification');
        this.updateClarification();
      } else {
        console.log('Creating Clarification');
        this.createClarification();
      }

      this.submitted = true;

      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion


    //#region Actions Methods
    createClarification() {
      this.clarificationApiService.create(this.clarification.batchId, this.clarification).then(response => {
        let newClarification = new Clarification(response.data);
        this.clarificationArray.push(newClarification);
        this.notifySuccessfulAction('Clarification created successfully');

      }).catch(error => {
        console.error("Error creating a Clarification", error);
      });
    },

    updateClarification() {
      this.clarificationApiService.update(this.clarification.batchId, this.clarification).then(response => {
        let index = this.findIndexById(this.clarification.id);
        this.clarificationArray[index] = new Clarification(response.data);
        this.notifySuccessfulAction('Clarification updated successfully');
      }).catch(error => {
        console.error("Error updating a Clarification", error);
      });
    },

    deleteClarification() {
      this.clarificationApiService.delete(this.clarification.batchId).then(() => {
        let index = this.findIndexById(this.clarification.batchId);
        this.clarificationArray.splice(index, 1);
        this.notifySuccessfulAction('Clarification deleted successfully');
      }).catch(error => {
        console.error("Error deleting a Clarification", error);
      });
    },

    deleteSelectedClarification() {
      this.selectedClarification.forEach((variable) => {
        this.clarificationApiService.delete(variable.id).then(() => {
          let index = this.findIndexById(variable.id);
          this.clarificationArray.splice(index, 1);
        }).catch(error => {
          console.error("Error deleting a Clarification", error);
        });
      });

      this.notifySuccessfulAction('Clarifications deleted successfully');
    },
    //#endregion

    getAllBatches(profileId) {

      this.batchApiService = new batchApiService();

      this.batchApiService.getAllBatches(profileId).then(response => {
        console.log('Batches Data: ', response.data);
        this.batches = response.data.map(batch => new Batch(batch));

        //Recorrer el array de batches y obtener el id de cada uno para obtener la fermentación
        this.batches.forEach(batch => {
          this.clarificationApiService.getClarificationByBatch(batch.id).then(response => {
            console.log('Fermentation Data: ', response.data);
            this.clarificationArray.push(new Clarification(response.data));
          }).catch(error => {
            console.error("Error getting fermentation by batch id", error);
          });
        });

      }).catch(error => {
        console.error("Error getting all batches", error);
      });

    },


    getProfileByUserId(userId) {
      this.profileApiService.getProfileById(userId).then(response => {

        console.log('Profile Data: ', response.data);

        this.profileId = response.data.id;

        this.getAllBatches(this.profileId);

      }).catch(error => {
        console.error("Error getting profile by user id", error);
      });
    }


  },



  created() {

    this.clarificationApiService = new ClarificationApiService();

    this.getProfileByUserId(this.currentUserId);

    console.log('Clarification Management component created');
  }
}

</script>

<template>

  <winemaking-process-management></winemaking-process-management>

  <div>

    <data-manager :title="title"
                  v-bind:items="clarificationArray"
                  v-on:new-item-requested-manager="onNewItem"
                  v-on:edit-item-requested-manager="onEditItem($event)"
                  v-on:delete-item-requested-manager="onDeleteItem($event)"
                  v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">


      <template #custom-columns-manager>

        <pv-column :sortable="true" field="batchId"              header="Batch Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="productsUsed"         header="Products Used" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="clarificationMethod"  header="Clarification Method" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="filtrationDate"       header="Filtration Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="clarityLevel"         header="Clarity Level" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="startDate"            header="Start Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="endDate"              header="End Date" style="min-width: 6rem"/>

      </template>

    </data-manager>

    <clarification-create-and-edit
        :edit = "isEdit"
        :item="clarification"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested-clarification="onCancelRequested"
        v-on:save-requested-clarification="onSaveRequested($event)">
    </clarification-create-and-edit>

  </div>
  
</template>

<style scoped>

</style>