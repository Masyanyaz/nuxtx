<template>
  <div class="d-flex">
    <div>
      <v-navigation-drawer
        permanent
      >
        <v-list dense class="py-0">
          <v-list-item
            v-for="(link, i) in links"
            :key="i"
            link
            :to="$i18n.path(`${link.url}`)"
            class="px-0"
          >
            <v-list-item-content class="py-0">
              <v-list-item-title class="px-5 py-4">
                {{ link.title }}
              </v-list-item-title>
              <v-divider />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-container>
      <nuxt-child />
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        links: [
          {title: 'К сайту', url: ''},
          {title: 'Добавить город', url: 'admin/add-new/city'},
          {title: 'Добавить экскурсию', url: 'admin/add-new/excursion'},
        ],
        drawer: false
      }
    },
    components: {},
    layout: 'admin'
  }
</script>

<style scoped>

</style>