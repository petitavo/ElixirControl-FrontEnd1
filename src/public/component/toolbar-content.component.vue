<script>

import LanguageSwitcher from "./language-switcher.component.vue";

export default {
  name: "toolbar-content",
  components: {LanguageSwitcher},
}
</script>

<template>

  <pv-toolbar class="w-full fixed top-0 left-0 pr-6 pl-6" style="background-color:#8B0000;">

    <template #start>
      <pv-button>Left</pv-button>
    </template>

    <template #center>
     <img src="../../assets/img/logo-elixir-control.png" width="85"  alt="Logo Elixir Control"/>
    </template>

    <template #end>
      <language-switcher></language-switcher>
    </template>
  </pv-toolbar>


</template>

<style scoped>



</style>