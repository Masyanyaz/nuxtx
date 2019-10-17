<template>
  <v-app class="main-color">
    <Navbar/>

    <v-container fluid class="pl-0 pr-0 pt-0 mr-0 ml-0">

      <nuxt/>

    </v-container>

    <Footer/>
  </v-app>
</template>

<script>
  const Navbar = () => import('~/components/Navbar')
  const Footer = () => import('~/components/Footer')

  export default {
    data() {
      return {
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
