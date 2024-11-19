<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "clarification-create-and-edit",
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
      this.$emit('cancel-requested-clarification');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-clarification', this.item);
    }
  },

  created() {
    console.log('Clarification Create and Edit Dialog component created');
  }


}
</script>

<template>

  <div class="p-fluid">
    <create-and-edit :entity="item" :visible="visible" entity-name="Clarification"
                     @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">

      <template #content>

        <pv-float-label class="mt-5">
          <label for="batch_id">Batch ID</label>
          <pv-input-text id="batch_id" v-model="item.batchId" :class="{ 'p-invalid': submitted && !item.batchId}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="products_used">Products used</label>
          <pv-input-text id="products_used" v-model="item.productsUsed" :class="{ 'p-invalid': submitted && !item.productsUsed}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="clarification_method">Clarification method</label>
          <pv-input-text id="clarification_method" v-model="item.clarificationMethod" :class="{ 'p-invalid': submitted && !item.clarificationMethod}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="filtration_date">Filtration date</label>
          <pv-input-text id="filtration_date" v-model="item.filtrationDate" :class="{ 'p-invalid': submitted && !item.filtrationDate}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="clarity_level">Clarity level</label>
          <pv-input-text id="clarity_level" v-model="item.clarityLevel" :class="{ 'p-invalid': submitted && !item.clarityLevel}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="start_date">Start date</label>
          <pv-input-text id="start_date" v-model="item.startDate" :class="{ 'p-invalid': submitted && !item.startDate}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="end_date">End date</label>
          <pv-input-text id="end_date" v-model="item.endDate" :class="{ 'p-invalid': submitted && !item.endDate}"/>
        </pv-float-label>




      </template>

    </create-and-edit>
  </div>


</template>

<style scoped>

</style>