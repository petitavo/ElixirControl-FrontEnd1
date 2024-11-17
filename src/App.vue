<script>
import NavbarElixirControl from "./public/component/navbar-elixir-control.component.vue";

export default {
  name: "app",
  components: { NavbarElixirControl },
  title: 'Elixir Control',
  created() {
    console.log('App created');
  }
}
</script>

<template>
  <div style="margin-top: 8%; margin-left:320px">
    <router-view />
  </div>
</template>

<style scoped>
</style>