<script>

import LanguageSwitcher from "./public/component/language-switcher.component.vue";

export default {
  name: "app",
  components: {LanguageSwitcher},

  title: 'Elixir Control',

  data() {
    return {
      drawer: false,
      items: [
        { label: 'Batches', to: '/winemaking-process/batches'},
        { label: 'Fermentation', to: '/winemaking-process/fermentation'},
        { label: 'Aging', to: '/winemaking-process/aging'}
      ]
    }
  },


  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },


  created() {
    console.log('App created');
  }
}

</script>

<template>


  <pv-toast/>

  <header>
    <pv-toolbar class="w-full fixed top-0 left-0 pr-6 pl-6 z-1" style="background-color:#8B0000; margin-top: 0;">

      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
        <img src="../src/assets/img/logo-elixir-control.png" width="80" alt="Logo Elixir Control"/>
      </template>

      <template #center>

      </template>

      <template #end>

        <div class="flex-column pl-6 pr-6" >
          <router-link v-for="item in items" :key="item.label" v-slot="{navigate, href}" :to="item.to" custom>
            <pv-button :href="href" class="p-button-text mr-3" @click="navigate" >{{ item.label }}</pv-button>
          </router-link>
        </div>

        <div>
          <language-switcher/>
        </div>

      </template>
    </pv-toolbar>

    <pv-drawer v-model:visible="drawer"/>
  </header>

  <main class="z-0" style="margin-top: 8%">
    <router-view/>
  </main>




</template>


<style scoped>

</style>
