<script>
import {Product} from "../model/product.entity.js";
import {ProductApiService} from "../services/product-api.service.js";
import ProductCreateAndEdit from "../components/product-create-and-edit.component.vue";
import HeaderContent from "../../../public/component/header-content.component.vue";
import {useAuthenticationStore} from "../../../iam/services/authentication.store.js";
import {ProfileApiService} from "../../winemaking-process/services/profile-api.service.js";




export default {
  name: "product-management",
  components: {HeaderContent, ProductCreateAndEdit},

  data() {
    const authenticationStore = useAuthenticationStore();

    return {
      title: { singular: 'Product', plural: 'Products'},
      productArray: [],
      product: new Product({}),
      selectedProduct: [],
      productApiService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,


      profileId: null,

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
      return this.productArray.findIndex(product => product.id === id);
    },
    //#endregion

    //#region Event Handlers
    onNewItem() {
      this.product = new Product({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      console.log("Item: ", item);
      this.product = new Product(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.product = new Product(item);
      this.deleteProduct();
    },

    onCancelRequestedManagement() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },


    onSaveRequestedManagement(item) {
      console.log('onSaveRequestedManagement', item);
      this.submitted = true

      if (this.isEdit) {
        console.log('Updating product');
        this.updateProduct();
      } else {
        console.log('Creating product');
        this.createProduct();
      }
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },
    //#endregion

    //#region Actions Methods

    createProduct() {
      this.productApiService.create(this.profileId, this.product).then(response => {
          let newProduct = new Product(response.data);
          this.productArray.push(newProduct);
          this.notifySuccessfulAction('Product created successfully');
        }).catch(error => {
          console.error('Error creating Product:', error);
        });
    },

    updateProduct() {
      this.productApiService.update(this.product.id, this.product).then(response => {
          let index = this.findIndexById(this.product.id);
          this.productArray[index] = new Product(response.data);
          this.notifySuccessfulAction('Product updated successfully');
        }).catch(error => {
          console.error('Error updating Product:', error);
        });
    },

    deleteProduct() {
      this.productApiService.delete(this.product.id).then(() => {
          let index = this.findIndexById(this.product.id);
          this.productArray.splice(index, 1);
          this.notifySuccessfulAction('Product deleted successfully');
        }).catch(error => {
          console.error('Error deleting Product:', error);
        });
    },

    getAllResources(profileId){

      console.log('Profile Id: ', profileId);

      this.productApiService.getAllProductsByProfileId(profileId).then(response => {

        this.productArray = response.data.map(newProduct => new Product(newProduct));

        console.log('Products Data: ', this.productArray);
      }).catch(error => {
        console.error("Error getting all products", error);
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
    this.productApiService = new ProductApiService();

    this.getProfileByUserId(this.currentUserId)

    console.log('Product Management created');
  }
}
</script>

<template>

  <header-content></header-content>

  <pv-toast/>

  <div class="p-grid p-justify-center">
    <div class="p-col-12">
      <h2>My {{title.plural}}</h2>
    </div>
  </div>

  <div class="flex flex-wrap justify-content-center gap-4" >
    <div v-for="item in productArray" :key="item.id" >
      <pv-card>
        <template #title>
          <img :src="item.imageUrl" alt="product image" style="width: 120px;"/>
        </template>

        <template #subtitle>
          <p class="m-4"> Name: {{item.productName}} </p>
          <p> Type of wine: {{item.wineType}}</p>
        </template>

        <template #content>
          <div>
            <span class="m-4">Price: S/. {{item.price}}</span>
            <span>Stock: {{item.quantity}} und</span>
          </div>
        </template>

        <template #footer>
          <div>
            <pv-button class="mr-4 mt-2" label="Edit" icon="pi pi-pencil" @click="onEditItem(item)"/>
            <pv-button label="Delete" icon="pi pi-trash" @click="onDeleteItem(item)"/>
          </div>
        </template>

      </pv-card>

      <product-create-and-edit
          :item="product"
          :edit="isEdit"
          :visible="createAndEditDialogIsVisible"
          @cancel-requested-product="onCancelRequestedManagement"
          @save-requested-product="onSaveRequestedManagement($event)"/>
    </div>
  </div>


  <div>
    <pv-button label="New product" icon="pi pi-plus" @click="onNewItem"/>
  </div>



</template>

<style scoped>

</style>