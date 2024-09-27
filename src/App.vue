<script>

import LanguageSwitcher from "./public/component/language-switcher.component.vue";
import NavbarElixirControl from "./public/component/navbar-elixir-control.component.vue";


export default {
  name: "app",
  components: {NavbarElixirControl},


  title: 'Elixir Control',

  created() {
    console.log('App created');
  }
}

</script>

<template>

  <navbar-elixir-control></navbar-elixir-control>

</template>


<style scoped>

</style>
