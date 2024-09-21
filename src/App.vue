<script>

import ToolbarContent from "./public/component/toolbar-content.component.vue";
import DataManager from "./shared/components/data-manager.component.vue";
import PageNotFound from "./public/pages/page-not-found.component.vue";

export default {
  name: "app",
  components: {PageNotFound, DataManager, ToolbarContent},



  created() {
    console.log('App created');
  }
}

</script>

<template>

  <page-not-found></page-not-found>



</template>


<style scoped>

</style>
