<script>
import DataManager from "../../../shared/components/data-manager.component.vue";
import {Aging} from "../model/aging.entity.js";
import AgingCreateAndEdit from "../components/aging-create-and-edit.component.vue";
import WinemakingProcessManagement from "./winemaking-process-management.component.vue";
import {AgingApiService} from "../services/aging-api.service.js";


export default {
  name: "aging-management",
  components: {WinemakingProcessManagement, AgingCreateAndEdit, DataManager},

  data() {

    //const authenticationStore = useAuthenticationStore();

    return {
      title: { singular: 'Aging', plural: 'Agings'},
      agingArray: [],
      aging: new Aging({}),
      selectedAging: [],
      agingApiService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,

      //-> Data -> authenticationStore
      //isSignedIn: authenticationStore.isSignedIn,
      //currentUserId: authenticationStore.currentUserId,
      //currentUsername: authenticationStore.currentUsername,
      //currentToken: authenticationStore.currentToken,
      //currentRole: authenticationStore.currentRole

    }
  },

  methods:{
    //#region Utility Methods
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.agingArray.findIndex(aging => aging.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.aging = new Aging({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      console.log("Item: ", item);
      this.aging = new Aging(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.aging = new Aging(item);
      this.deleteAging();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedAging = selectedItems;
      this.deleteSelectedAging();
    },

    onCancelRequestedManagement() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequestedManagement(item) {
      console.log('onSaveRequestedManagement', item);
      this.submitted = true

      if (item.id) {
        this.updateAging();
      } else {
        this.createAging();
      }

      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },

    //#endregion


    //#region Actions Methods

    createAging() {
      this.agingApiService.create(this.aging).then(response => {
        let newAging = new Aging(response.data);
        this.agingArray.push(newAging);
        this.notifySuccessfulAction('Aging created successfully');
      }).catch(error => {
            console.error(" Error creating aging data  ", error);
      });
    },

    updateAging() {
      this.agingApiService.update(this.aging.id, this.aging).then(response => {
        let index = this.findIndexById(this.aging.id);
        this.agingArray[index] = new Aging(response.data);
        this.notifySuccessfulAction('Aging updated successfully');
      }).catch(error => {
        console.error(" Error updating aging data  ", error);
      });
    },

    deleteAging() {
      this.agingApiService.delete(this.aging.id).then(() => {
        let index = this.findIndexById(this.aging.id);
        this.agingArray.splice(index, 1);
        this.notifySuccessfulAction('Aging deleted successfully');
      }).catch(error => {
        console.error(" Error deleting aging data  ", error);
      });
    },

    deleteSelectedAging() {
      this.selectedAging.forEach((aging) => {
        this.agingApiService.delete(aging.id).then(() => {
          this.agingArray = this.agingArray.filter(a => a.id !== aging.id);
        }).catch(error => {
          console.error(" Error deleting aging data  ", error);
        });
      });
      this.notifySuccessfulAction('Aging deleted successfully');
    },
    //#endregion

    getAllAging(){

      this.agingApiService.getAllAging().then(response => {
        this.agingArray = response.data.map(newAging => new Aging(newAging));
        console.log("Aging data: ", this.agingArray);
      }).catch(error => {
        console.error(" Error getting aging data  ", error);
      });
    }


  },

  //#region Lifecycle Hooks
  created() {
    this.agingApiService = new AgingApiService();
    this.getAllAging();
    console.log('Aging Management component created');
  }

}
</script>

<template>

  <winemaking-process-management></winemaking-process-management>

  <div>

    <data-manager
        :title="title"
        v-bind:items="agingArray"
        v-on:new-item-requested-manager="onNewItem"
        v-on:edit-item-requested-manager="onEditItem($event)"
        v-on:delete-item-requested-manager="onDeleteItem($event)"
        v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">

      <template #custom-columns-manager>
        <pv-column :sortable="true" field="batchId" header="Batch ID" style="min-width: 8rem"/>
        <pv-column :sortable="true" field="barrelType" header="Barrel Type" style="min-width: 8rem"/>
        <pv-column :sortable="true" field="startDate" header="Start Date" style="min-width: 8rem"/>
        <pv-column :sortable="true" field="endDate" header="End Date" style="min-width: 8rem"/>
        <pv-column :sortable="true" field="agingDurationMonths" header="Aging Duration Months" style="min-width: 8rem"/>
        <pv-column :sortable="true" field="inspectionsPerformed" header="Inspections Performed" style="min-width: 8rem"/>
        <pv-column :sortable="true" field="inspectionResult" header="Inspection Result" style="min-width: 8rem"/>
      </template>

    </data-manager>

    <aging-create-and-edit
        :edit = "isEdit"
        :item="aging"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested-aging="onCancelRequestedManagement"
        v-on:save-requested-aging="onSaveRequestedManagement($event)">
    </aging-create-and-edit>

  </div>


</template>

<style scoped>

</style>