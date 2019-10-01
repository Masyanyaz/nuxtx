<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex>
        <h1>{{hhh}}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    data() {
      return {
        hhh: this.$t('about.title')
      }
    },
    head() {
      return {
        title: this.$t('index.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('index.description')}
        ]
      }
    },
    nuxtI18n: {
      paths: {
        en: '/contact',
        fr: '/contact',
      }
    }
  }
</script>

<style scoped>

</style>