<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex>
        <h1>destinations</h1>
        <p>update</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    head() {
      return {
        title: this.$t('index.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('index.description')}
        ]
      }
    },
  }
</script>

<style scoped>

</style>