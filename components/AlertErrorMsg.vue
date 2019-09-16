<template>
  <v-snackbar v-if="isError">
    {{ errMsg }}
    <v-btn
      color="pink"
      text
      @click="isError = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    props: ['errMsg, isError']
  }
</script>

<style scoped>

</style>