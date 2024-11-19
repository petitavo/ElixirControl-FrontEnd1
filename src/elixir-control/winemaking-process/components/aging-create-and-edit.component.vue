<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "aging-create-and-edit",

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
      this.$emit('cancel-requested-aging');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-aging', this.item);
    }
  },

  created() {
    console.log('Aging Create and Edit Dialog component created');
  }

}
</script>

<template>

  <div>
    <create-and-edit :entity="item" :visible="visible" entity-name="Aging" @canceled-shared="onCancelRequested"
                     @saved-shared="onSaveRequested">

      <template #content>

        <pv-float-label class="mt-5">
          <label for="batch_id">Batch ID</label>
          <pv-input-text id="batch_id" v-model="item.batchId" :class="{ 'p-invalid': submitted && !item.batchId}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="barrel_type">Barrel type</label>
          <pv-input-text id="barrel_type" v-model="item.barrelType" :class="{ 'p-invalid': submitted && !item.barrelType}"/>
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
          <label for="aging_duration_months">Aging duration months</label>
          <pv-input-text id="aging_duration_months" v-model="item.agingDurationMonths" :class="{ 'p-invalid': submitted && !item.agingDurationMonths}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="inspections_performed">Inspections performed</label>
          <pv-input-text id="inspections_performed" v-model="item.inspectionsPerformed" :class="{ 'p-invalid': submitted && !item.inspectionsPerformed}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="inspection_result">Inspection result</label>
          <pv-input-text id="inspection_result" v-model="item.inspectionResult" :class="{ 'p-invalid': submitted && !item.inspectionResult}"/>
        </pv-float-label>


      </template>

    </create-and-edit>
  </div>

</template>

<style scoped>

</style>