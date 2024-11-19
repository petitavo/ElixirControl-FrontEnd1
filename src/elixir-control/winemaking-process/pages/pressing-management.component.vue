<script>
import {Pressing} from "../model/pressing.entity.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import PressingCreateAndEdit from "../components/pressing-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";
import {FermentationApiService} from "../services/fermentation-api.service.js";
import {useAuthenticationStore} from "../../../iam/services/authentication.store.js";
import {ProfileApiService} from "../services/profile-api.service.js";
import {batchApiService} from "../services/batch-api.service.js";
import {Batch} from "../model/batch.entity.js";


export default {
  name: "pressing-management",

  components: {WinemakingProcessManagement, PressingCreateAndEdit, DataManager},

  data() {
    const authenticationStore = useAuthenticationStore();

    return {
      title: { singular: 'Pressing', plural: 'Pressings' },
      pressingArray: [],
      pressing: new Pressing({}),
      selectedPressings: [],
      pressingApiService: null,
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
      return this.pressingArray.findIndex(pressing => pressing.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.pressing = new Pressing({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.pressing = new Pressing(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.pressing = new Pressing(item);
      this.deletePressing();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedPressings = selectedItems;
      this.deleteSelectedPressings();
    },

    onCanceledRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      console.log('onSaveRequestedManagement', item);

      if (this.isEdit) {
        this.updatePressing();
      } else {
        this.createPressing();
      }

      this.submitted = true;

      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion


    //#region CRUD Operations

    createPressing() {
      this.pressingApiService.create(this.pressing.batchId, this.pressing).then(response => {
          let newPressing = new Pressing(response.data);
          this.pressingArray.push(newPressing);
          this.notifySuccessfulAction('Pressing created successfully');
        }).catch(error => {
          console.error('Error creating pressing', error);
        });
    },


    updatePressing() {
      this.pressingApiService.update(this.pressing.batchId, this.pressing).then(response => {
          let index = this.findIndexById(this.pressing.id);
          this.pressingArray[index] = new Pressing(response.data);
          this.notifySuccessfulAction('Pressing updated successfully');
        }).catch(error => {
          console.error('Error updating pressing', error);
        });
    },

    deletePressing() {
      this.pressingApiService.delete(this.pressing.id).then(() => {
          let index = this.findIndexById(this.pressing.id);
          this.pressingArray.splice(index, 1);
          this.notifySuccessfulAction('Pressing deleted successfully');
        }).catch(error => {
          console.error('Error deleting pressing', error);
        });
    },

    deleteSelectedPressings() {
      this.selectedPressings.forEach(variable => {
        this.pressingApiService.delete(variable.id).then(() => {
          this.pressingArray = this.pressingArray.filter(p => p.id !== variable.id);
        }).catch(error => {
          console.error('Error deleting pressing', error);
        });
      });
      this.notifySuccessfulAction('Pressings deleted successfully');
    },
    //#endregion


    getAllBatches(profileId) {

      this.batchApiService = new batchApiService();

      this.batchApiService.getAllBatches(profileId).then(response => {
        console.log('Batches Data: ', response.data);
        this.batches = response.data.map(batch => new Batch(batch));

        //Recorrer el array de batches y obtener el id de cada uno para obtener el pressing
        this.batches.forEach(batch => {
          this.pressingApiService.getPressingByBatch(batch.id).then(response => {
            console.log('Pressing Data: ', response.data);
            this.pressingArray.push(new Pressing(response.data));
          }).catch(error => {
            console.error("Error getting pressing by batch id", error);
          });
        });
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

    this.fermentationApiService = new FermentationApiService();

    this.getProfileByUserId(this.currentUserId);


    console.log('Pressing Management component created');
  }

}
</script>

<template>

  <winemaking-process-management></winemaking-process-management>

  <div class="w-full">
    <data-manager :title="title"
                  :items="pressingArray"
                  v-on:new-item-requested-manager="onNewItem"
                  v-on:edit-item-requested-manager="onEditItem($event)"
                  v-on:delete-item-requested-manager="onDeleteItem($event)"
                  v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">


      <template #custom-columns-manager>

        <pv-column :sortable="true" field="batchId"      header="Batch Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="pressingDate" header="Pressing Date" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="mustVolume"   header="Must Volume" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="pressType"    header="Press Type" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="appliedPressure" header="Applied Pressure" style="min-width: 6rem"/>

      </template>

    </data-manager>

    <pressing-create-and-edit
        :edit="isEdit"
        :item="pressing"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested-pressing="onCanceledRequested"
        @save-requested-pressing="onSaveRequested($event)">
    </pressing-create-and-edit>
  </div>



</template>

<style scoped>

</style>