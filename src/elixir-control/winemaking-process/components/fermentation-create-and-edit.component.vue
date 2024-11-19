<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "fermentation-create-and-edit",

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
      this.$emit('cancel-requested-fermentation');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-fermentation', this.item);
    }
  },

  created() {
    console.log('Fermentation Create and Edit Dialog component created');
  }

}
</script>

<template>

  <div>
    <create-and-edit :entity="item" :visible="visible" entity-name="Fermentation"
    @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">

      <template #content>

        <pv-float-label class="mt-5">
          <label for="batch_id">Batch ID</label>
          <pv-input-text id="batch_id" v-model="item.batchId" :class="{ 'p-invalid': submitted && !item.batchId}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="start_date">Start date</label>
          <pv-input-text id="start_date" v-model="item.startDate" :class="{ 'p-invalid': submitted && !item.startDate}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="end_date">End date</label>
          <pv-input-text id="end_date" v-model="item.endDate" :class="{ 'p-invalid': submitted && !item.endDate}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="average_temperature">Average temperature</label>
          <pv-input-text id="average_temperature" v-model="item.averageTemperature" :class="{ 'p-invalid': submitted && !item.averageTemperature}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="initial_density">Initial density</label>
          <pv-input-text id="initial_density" v-model="item.initialDensity" :class="{ 'p-invalid': submitted && !item.initialDensity}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="initial_ph">Initial pH</label>
          <pv-input-text id="initial_ph" v-model="item.initialPh" :class="{ 'p-invalid': submitted && !item.initialPh}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="final_density">Final density</label>
          <pv-input-text id="final_density" v-model="item.finalDensity" :class="{ 'p-invalid': submitted && !item.finalDensity}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="final_ph">Final pH</label>
          <pv-input-text id="final_ph" v-model="item.finalPh" :class="{ 'p-invalid': submitted && !item.finalPh}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="residual_sugar">Residual sugar</label>
          <pv-input-text id="residual_sugar" v-model="item.residualSugar" :class="{ 'p-invalid': submitted && !item.residualSugar}"/>
        </pv-float-label>


      </template>

    </create-and-edit>
  </div>


</template>

<style scoped>

</style>