<template>
  <v-footer class="d-flex justify-center">
    <div class="text-center" style="font-size: calc(12px + 2 * ((100vw) / 500));">Сайт с
      экскурсиями &copy; {{ new Date().getFullYear()
      }}</div>
  </v-footer>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>

</style>