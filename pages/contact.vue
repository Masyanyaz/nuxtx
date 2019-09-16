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
    head: {
      title: 'Contact',
      meta: [
        { hid: 'description', name: 'description', content: 'desc Contact' }
      ]
    },
    nuxtI18n: {
      paths: {
        en: '/contact',
        fr: '/contactfr',
      }
    }
  }
</script>

<style scoped>

</style>