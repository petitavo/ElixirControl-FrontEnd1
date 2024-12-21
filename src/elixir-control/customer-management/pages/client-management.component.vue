<script>
import { ClientsService } from '../services/clients.service.js';
import { Clients } from '../model/clients.entity.js';
import ClientCreateAndEditComponent from "../components/client-create-and-edit.component.vue";
import { FilterMatchMode } from "@primevue/core";
import HeaderContent from "../../../public/component/header-content.component.vue";
import { ProfileApiService} from "../../winemaking-process/services/profile-api.service.js";
import { useAuthenticationStore } from "../../../iam/services/authentication.store.js";

export default {
  name: "client-management",
  components: {
    HeaderContent,
    ClientCreateAndEditComponent,
  },
  data() {
    const authenticationStore = useAuthenticationStore();

    return {
      clients: [],
      editDialogVisible: false,
      selectedClient: null,
      clientsService: new ClientsService(),
      profileApiService: new ProfileApiService(),
      currentUserId: authenticationStore.currentUserId,
      profileId: null,
      globalFilterValue: '',
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        personName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        businessName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH},
      },
      loading: false,
    };
  },
  methods: {
    getProfileAndClients() {
      this.profileApiService.getProfileById(this.currentUserId).then(response => {
        this.profileId = response.data.id;
        this.getClientsByProfileId(this.profileId);
      }).catch(error => {
        console.error("Error getting profile by user id", error);
      });
    },

    getClientsByProfileId(profileId) {
      this.clientsService.getAllByProfileId(profileId).then(response => {
        this.clients = response.data.map(client => new Clients(client));
      }).catch(error => {
        console.error("Error fetching clients", error);
      });
    },

    createClient(client) {
      if (this.profileId) {
        this.clientsService.createByProfileId(this.profileId, client).then(response => {
          this.clients.push(new Clients(response.data));
        }).catch(error => {
          console.error("Error creating client", error);
        });
      }
    },

    // Other CRUD methods remain unchanged
  },
  created() {
    this.getProfileAndClients();
  }
};
</script>
