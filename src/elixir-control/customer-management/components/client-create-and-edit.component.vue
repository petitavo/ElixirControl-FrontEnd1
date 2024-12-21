<script>
import CreateAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "clients-create-and-edit",

  components: {CreateAndEdit},

  props: {
    itemClient: null,
    visible: Boolean
  },

  data() {
    return {
      submitted: false
    }
  },

  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested-clients');
    },

    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested-clients', this.itemClient);
    }
  },

  created() {
    console.log('Clients Create and Edit Dialog component created');
  }
}
</script>

<template>
  <create-and-edit :entity="itemClient" :visible="visible" entity-name="Client"
                   @canceled-shared="onCancelRequested" @saved-shared="onSaveRequested">
    <template #content>

      <pv-float-label class="mt-5">
        <label for="person_name">Person Name</label>
        <pv-input-text id="person_name" v-model="itemClient.personName" :class="{ 'p-invalid': submitted && !itemClient.personName}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="dni">DNI</label>
        <pv-input-text id="dni" v-model="itemClient.dni" :class="{ 'p-invalid': submitted && !itemClient.dni}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="email">Email</label>
        <pv-input-text id="email" v-model="itemClient.email" :class="{ 'p-invalid': submitted && !itemClient.email}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="business_name">Business Name</label>
        <pv-input-text id="business_name" v-model="itemClient.businessName" :class="{ 'p-invalid': submitted && !itemClient.businessName}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="phone">Phone</label>
        <pv-input-text id="phone" v-model="itemClient.phone" :class="{ 'p-invalid': submitted && !itemClient.phone}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="address">Address</label>
        <pv-input-text id="address" v-model="itemClient.address" :class="{ 'p-invalid': submitted && !itemClient.address}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="country">Country</label>
        <pv-input-text id="country" v-model="itemClient.country" :class="{ 'p-invalid': submitted && !itemClient.country}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="city">City</label>
        <pv-input-text id="city" v-model="itemClient.city" :class="{ 'p-invalid': submitted && !itemClient.city}"/>
      </pv-float-label>

      <pv-float-label class="mt-5">
        <label for="ruc">RUC</label>
        <pv-input-text id="ruc" v-model="itemClient.ruc" :class="{ 'p-invalid': submitted && !itemClient.ruc}"/>
      </pv-float-label>
    </template>
  </create-and-edit>
</template>

<style scoped>
</style>