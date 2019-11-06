<template>
  <v-app class="main-color">
    <Navbar/>

    <v-container fluid class="px-0 pt-0 mx-0">

      <nuxt/>

    </v-container>

    <Footer/>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    components: {
      Navbar: () => import('~/components/Navbar'),
      Footer: () => import('~/components/Footer')
    }
  }
</script>

<style lang="scss" scoped>
  .main-color {
    color: #2a3f54;
  }
</style>
