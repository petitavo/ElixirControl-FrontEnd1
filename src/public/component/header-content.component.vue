<script>
import LanguageSwitcher from "./language-switcher.component.vue";
import AuthenticationSection from "../../iam/components/authentication-section.component.vue";


export default {
  name: "header-content",

  components: { LanguageSwitcher,AuthenticationSection},

  title: 'Elixir Control',

  data() {
    return {
      drawer: true,
      visible: false,
      items: [
        { label: "title-winemaking-option", to: '/vinicultor/winemaking-process', icon: 'pi pi-spinner-dotted' },
        { label: "title-my-clients-option", to: '/vinicultor/clients',            icon: 'pi pi-user' },
        { label: "log-out", to: '/vinicultor/orders/history',     icon: 'pi pi-list-check' },
      ]
    }
  },

  methods: {
    closeDrawer() {
      this.visible = false;
    }
  },
  created() {
    console.log('HeaderContent created');
  }

}
</script>

<template>

  <div class="header-content">

    <div class="toolbar-container z-auto">
      <pv-toolbar :items="items" class="w-full fixed top-0 left-0 pr-6 pl-6" style="background-color:#8B0000; max-height:80px; width:100%; height:100%">

        <template #start>
          <button @click="visible = !visible">
            <i class="pi pi-bars"></i>
          </button>
        </template>

        <template #center>
          <img src="../../assets/img/logo-elixir-control.png" max-height="55" height="55"/>
        </template>

        <template #end>
          <language-switcher></language-switcher>
        </template>

      </pv-toolbar>
    </div>

    <div class="drawer-container">
      <pv-drawer :visible="visible" :showCloseIcon="false" style="background-color: #8B0000">

        <template #header>
          <span></span>
          <pv-button @click="visible = false" class="button-close m-1" >
            <i class="pi pi-times"></i>
          </pv-button>
        </template>


        <div class="options">
          <router-link v-for="item in items" :key="item.label" :to="item.to">
            <pv-button @click="visible = false" class="button-option m-1" >
              <i :class="item.icon"></i>
              {{ $t(item.label) }}
            </pv-button>
          </router-link>
        </div>

        <template #footer>
          <span></span>
        </template>
      </pv-drawer>
    </div>
  </div>

  <div style="margin-top:80px">
    <router-view style="margin-top:80px"></router-view>
  </div>

</template>




<style scoped>

.button-close {
  background-color: #8B0000;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  width: 40px;
  height: 40px;
  align-items: start;
  justify-content: center;
}

.button-close:not(:disabled):hover {
  background: #F5F5DC;
  border: none;
  color: black;
  font-weight: bold;
}


.options{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

.options .button-option {
  background-color: #8B0000;
  color: white;
  border: none;
  border-radius: 0;
  padding: 10px;
  width: 220px;
  align-items: start;
  justify-content: start;
  border-bottom: solid 1px #F5F5DC;

}

.options .button-option:not(:disabled):hover {
  background: #F5F5DC;
  border: none;
  color: black;
  font-weight: bold;
}


</style>