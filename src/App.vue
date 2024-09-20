<script>

import ToolbarContent from "./public/component/toolbar-content.component.vue";
import DataManager from "./shared/components/data-manager.component.vue";

export default {
  name: "app",
  components: {DataManager, ToolbarContent},



  created() {
    console.log('App created');
  }
}

</script>

<template>

  <toolbar-content></toolbar-content>

  <data-manager title="" items=""></data-manager>
</template>


<style scoped>

</style>
