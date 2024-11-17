<script>
import ToolbarContent from "../component/toolbar-content.component.vue";

export default {
  name: "page-not-found.component",
  components: { ToolbarContent },
}
</script>

<template>
  <div>
    <div>
      <img src="../../assets/img/page-not-found.jpg" width="400"/>
    </div>
    <div>
      <pv-button>Go to Home</pv-button>
    </div>
  </div>
</template>

<style scoped>
</style>