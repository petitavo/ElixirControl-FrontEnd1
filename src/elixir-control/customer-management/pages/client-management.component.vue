<script>
import {Clients} from "../model/clients.entity.js";
import {ClientsService} from "../services/clients.service.js";
import DataManager from "../../../shared/components/data-manager.component.vue";
import ClientCreateAndEditComponent from "../components/client-create-and-edit.component.vue";
import {ProfileApiService} from "../../winemaking-process/services/profile-api.service.js";
import {useAuthenticationStore} from "../../../iam/services/authentication.store.js";

export default {
  name: "client-management",
  components: {ClientCreateAndEditComponent, DataManager},

  data() {
    const authenticationStore = useAuthenticationStore();

    return {
      title: { singular: 'Client', plural: 'Clients' },
      clients: [],
      client: new Clients({}),
      selectedClients: [],
      clientApiService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
      profileId: null,

      profileApiService: new ProfileApiService(),

      currentUserId: authenticationStore.currentUserId,
    }
  },

  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.clients.findIndex(client => client.id === id);
    },

    onNewItem() {
      this.client = new Clients({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.client = new Clients(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.client = new Clients(item);
      this.deleteClient();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedClients = selectedItems;
      this.deleteSelectedClients();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      console.log('onSaveRequestedManagement', item);

      if (this.isEdit) {
        this.updateClient();
      } else {
        this.createClient();
      }

      this.submitted = true;
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },

    createClient() {
      console.log('Create Client', this.profileId);

      this.clientApiService.create(this.client, this.profileId).then(response => {
        let newClient = new Clients(response.data);
        this.clients.push(newClient);
        this.notifySuccessfulAction('Client created successfully');
      }).catch(error => {
        console.error("Error creating a client", error);
      });
    },

    updateClient() {
      console.log('Update Client', this.client.id);
      this.clientApiService.update(this.client.id, this.client).then(response => {
        let index = this.findIndexById(this.client.id);
        this.clients[index] = new Clients(response.data);
        this.notifySuccessfulAction('Client updated successfully');
      }).catch(error => {
        console.error("Error updating a client", error);
      });
    },

    deleteClient() {
      this.clientApiService.delete(this.client.id).then(() => {
        let index = this.findIndexById(this.client.id);
        this.clients.splice(index, 1);
        this.notifySuccessfulAction('Client deleted successfully');
      }).catch(error => {
        console.error("Error deleting a client", error);
      });
    },

    deleteSelectedClients() {
      this.selectedClients.forEach((variable) => {
        this.clientApiService.delete(variable.id).then(() => {
          this.clients = this.clients.filter((c) => c.id !== variable.id);
        }).catch(error => {
          console.error("Error deleting a client", error);
        });
      });

      this.notifySuccessfulAction('Clients deleted successfully');
    },

    getAllResources(profileId) {
      this.clientApiService.getAllResourcesByProfileId(profileId).then(response => {
        this.clients = response.data.map(client => new Clients(client));
        console.log('Clients', this.clients);
      }).catch(error => {
        console.error("Error getting all clients", error);
      });
    },

    getProfileByUserId(userId) {
      this.profileApiService.getProfileById(userId).then(response => {
        console.log('Profile Data: ', response.data);
        this.profileId = response.data.id;
        this.getAllResources(this.profileId);
      }).catch(error => {
        console.error("Error getting profile by user id", error);
      });
    }
  },

  created() {
    this.clientApiService = new ClientsService();
    this.getProfileByUserId(this.currentUserId);
    console.log('Client Management component created');
  }
}
</script>

<template>
  <div>
    <data-manager :title="title"
                  v-bind:items="clients"
                  v-on:new-item-requested-manager="onNewItem"
                  v-on:edit-item-requested-manager="onEditItem($event)"
                  v-on:delete-item-requested-manager="onDeleteItem($event)"
                  v-on:delete-selected-items-requested-manager="onDeleteSelectedItems($event)">
      <template #custom-columns-manager>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="personName" header="Person Name" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="businessName" header="Business Name" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="email" header="Email" style="min-width: 6rem"/>
        <pv-column :sortable="true" field="phone" header="Phone" style="min-width: 6rem"/>
      </template>
    </data-manager>

    <client-create-and-edit-component
        :visible="createAndEditDialogIsVisible"
        :item-client="client"
        @canceled-shared="onCancelRequested"
        @save-requested-clients="onSaveRequested"
    />
  </div>
</template>

<style scoped>
/* Add any necessary styles here */
</style>