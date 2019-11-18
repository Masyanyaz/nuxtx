<template>
  <v-app class="main-color">
    <v-container fluid class="px-0 pt-0 mx-0">
      <nuxt/>
    </v-container>
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
    }
  }
</script>

<style lang="scss" scoped>
  .main-color {
    color: #2a3f54;
  }
</style>
