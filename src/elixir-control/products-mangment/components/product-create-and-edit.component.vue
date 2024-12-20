<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "product-create-and-edit",
  components: {CreateAndEdit},

  props: {
    item: null,
    visible: Boolean
  },

  data() {
    return {
      submitted: false
    }
  },

  methods: {

    onCancelRequested() {
      this.$emit('cancel-requested-product');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-product', this.item);
    }
  },

  created() {
    console.log('Product Create and Edit Dialog component created');
  }

}
</script>

<template>

  <create-and-edit :entity="item" :visible="visible" entity-name="Product" @canceled-shared="onCancelRequested"
                   @saved-shared="onSaveRequested">

    <template #content>

      <pv-float-label class="mt-5">
        <label for="productName">Product Name</label>
        <pv-input-text id="productName" v-model="item.productName" :class="{ 'p-invalid': submitted && !item.productName}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="grapeVariety">Grape Variety</label>
        <pv-input-text id="grapeVariety" v-model="item.grapeVariety" :class="{ 'p-invalid': submitted && !item.grapeVariety}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="wineType">Wine Type</label>
        <pv-input-text id="wineType" v-model="item.wineType" :class="{ 'p-invalid': submitted && !item.wineType}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="origin">Origin</label>
        <pv-input-text id="origin" v-model="item.origin" :class="{ 'p-invalid': submitted && !item.origin}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="alcoholContent">Alcohol Content</label>
        <pv-input-text id="alcoholContent" v-model="item.alcoholContent" :class="{ 'p-invalid': submitted && !item.alcoholContent}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="price">Price</label>
        <pv-input-text id="price" v-model="item.price" :class="{ 'p-invalid': submitted && !item.price}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="foodPairing">Food Pairing</label>
        <pv-input-text id="foodPairing" v-model="item.foodPairing" :class="{ 'p-invalid': submitted && !item.foodPairing}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="quantity">Quantity</label>
        <pv-input-text id="quantity" v-model="item.quantity" :class="{ 'p-invalid': submitted && !item.quantity}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="imageUrl">Image URL</label>
        <pv-input-text id="imageUrl" v-model="item.imageUrl" :class="{ 'p-invalid': submitted && !item.imageUrl}"/>
      </pv-float-label>

    </template>
  </create-and-edit>

</template>

<style scoped>

</style>