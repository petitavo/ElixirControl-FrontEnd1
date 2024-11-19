<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "pressing-create-and-edit",
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
      this.$emit('cancel-requested-pressing');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-pressing', this.item);
    }
  },

  created() {
    console.log('Pressing Create and Edit Dialog component created');
  }

}
</script>

<template>

  <div>
    <create-and-edit :entity="item" :visible="visible" entity-name="Pressing"
                     @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">

      <template #content>

        <pv-float-label class="mt-5">
          <label for="batch_id">Batch ID</label>
          <pv-input-text id="batch_id" v-model="item.batchId" :class="{ 'p-invalid': submitted && !item.batchId}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="pressing_date">Pressing date</label>
          <pv-input-text id="pressing_date" v-model="item.pressingDate" :class="{ 'p-invalid': submitted && !item.pressingDate}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="must_volume">Must volume</label>
          <pv-input-text id="must_volume" v-model="item.mustVolume" :class="{ 'p-invalid': submitted && !item.mustVolume}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="press_type">Press type</label>
          <pv-input-text id="press_type" v-model="item.pressType" :class="{ 'p-invalid': submitted && !item.pressType}"/>
        </pv-float-label>

        <pv-float-label class="mt-5">
          <label for="applied_pressure">Applied pressure</label>
          <pv-input-text id="applied_pressure" v-model="item.appliedPressure" :class="{ 'p-invalid': submitted && !item.appliedPressure}"/>
        </pv-float-label>

      </template>

    </create-and-edit>

  </div>



</template>

<style scoped>

</style>