<template>
  <v-app class="main-color">
    <Navbar/>

    <v-container fluid class="pl-0 pr-0 pt-0">

      <nuxt/>

    </v-container>
    <Footer/>

  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Footer from '@/components/Footer'

  export default {
    data() {
      return {
        title: 'asda'
      }
    },
    components: {
      Navbar,
      Footer
    }
  }
</script>

<style lang="scss" scoped>
  .main-color {
    color: #2a3f54;
  }
</style>
