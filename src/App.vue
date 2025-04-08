<!-- src\App.vue -->

<template>
  <TheHeader />
  <!-- <MainMenu /> -->
  <router-view />
  <TheFooter />
</template>


<script>
import MainMenu from './components/layout/MainMenu.vue'
import TheHeader from './components/common/TheHeader.vue'
import TheFooter from './components/common/TheFooter.vue'

export default {
  name:'App',
  components:{
    TheHeader,
    MainMenu,
    TheFooter,
  }
}
</script>
<style></style>