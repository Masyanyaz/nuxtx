<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex>
        <h1>{{$t('faq.title')}}</h1>
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="(item,i) in 5"
            :key="i"
          >
            <v-expansion-panel-header>Item</v-expansion-panel-header>
            <v-expansion-panel-content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo
              consequat.
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    head() {
      return {
        title: this.$t('faq.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('faq.description')}
        ]
      }
    },
    nuxtI18n: {
      paths: {
        en: '/faq',
        fr: '/faq',
      }
    }
  }
</script>

<style scoped>

</style>