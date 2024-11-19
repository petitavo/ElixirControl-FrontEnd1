<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "batches-create-and-edit",

  components: {CreateAndEdit},

  props: {
    itemBatch: null,
    visible: Boolean
  },

  data() {
    return {
      submitted: false
    }
  },

  methods: {

    onCancelRequested() {
      this.$emit('cancel-requested-batches');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-batches', this.item);
    }
  },

  created() {
    console.log('Batches Create and Edit Dialog component created');
  }

}
</script>



<template>

  <create-and-edit :entity="itemBatch" :visible="visible" entity-name="Batch"
                   @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">

    <!--Definimos el contenido del diálogo de creación y edición de lotes en el slot content del componente -->
    <!--CreateAndEdit-->
    <template #content>

      <pv-float-label class="mt-5">
        <label for="batch_id">Batch ID</label>
        <pv-input-text id="batch_id" v-model="itemBatch.batchId" :class="{ 'p-invalid': submitted && !itemBatch.batchId}"/>
      </pv-float-label>


      <pv-float-label class="mt-5">
        <label for="vineyard_code">Vineyard code</label>
        <pv-input-text id="vineyard_code" v-model="itemBatch.vineyardCode" :class="{ 'p-invalid': submitted && !itemBatch.vineyardCode}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="grape_variety">Grape variety</label>
        <pv-input-text id="grape_variety" v-model="itemBatch.grapeVariety" :class="{ 'p-invalid': submitted && !itemBatch.grapeVariety}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="harvest_date">Harvest date</label>
        <pv-input-text id="harvest_date" v-model="itemBatch.harvestDate" :class="{ 'p-invalid': submitted && !itemBatch.harvestDate}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="grape_quantity">Grape quantity</label>
        <pv-input-text id="grape_quantity" v-model="itemBatch.grapeQuantity" :class="{ 'p-invalid': submitted && !itemBatch.grapeQuantity}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="vineyard_origin">Vineyard origin</label>
        <pv-input-text id="vineyard_origin" v-model="itemBatch.vineyardOrigin" :class="{ 'p-invalid': submitted && !itemBatch.vineyardOrigin}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="process_start_date">Start date</label>
        <pv-input-text id="process_start_date" v-model="itemBatch.processStartDate" :class="{ 'p-invalid': submitted && !itemBatch.processStartDate}"/>
      </pv-float-label>

    </template>

  </create-and-edit>



</template>



<style scoped>

</style>