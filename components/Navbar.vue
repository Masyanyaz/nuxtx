<template>
  <div>
    <v-navigation-drawer
      class="d-flex"
      v-if="drawer"
      v-model="drawer"
      app
      temporary
    >
      <v-list dense class="py-0">
        <v-btn text
               class="d-flex justify-start"
               width="100%"
               height="51"
               style="font-size: 20px; font-weight: 300; background-color: rgba(0,0,0,.1);"
               @click.stop="drawer = !drawer">
          <
        </v-btn>

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

    <div style="border-bottom: 1px solid #EAEEF3;">
      <v-app-bar height="80"
                 style="box-shadow: none; background-color: inherit"
                 class="container d-flex align-center">
        <v-app-bar-nav-icon
          class="d-flex d-md-none"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <nuxt-link
          exact
          class="mr-5"
          :to="$i18n.path('')"
        >
          <img src="/svg/logo.svg" alt="" style="margin-left: -16px;" />
        </nuxt-link>
        <v-toolbar-items class="d-none d-md-flex pl-0 pr-0">
          <v-btn
            text
            v-for="(link, i) in links"
            :key="i"
            :to="$i18n.path(`${link.url}`)"
          >
            {{link.title}}
          </v-btn>
          <v-btn
            text
            v-if="isUserloggedIn"
            :to="$i18n.path('admin')"
          >
            Ad new
          </v-btn>
          <v-btn
            text
            v-if="isUserloggedIn"
            @click="onLogout"
          >
            Logout
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        drawer: false
      }
    },
    computed: {
      links() {
        return [
          {title: this.$t('Links.activities.title'), url: this.$t('Links.activities.url')},
          {title: this.$t('Links.destinations.title'), url: this.$t('Links.destinations.url')},
          {title: this.$t('Links.about.title'), url: this.$t('Links.about.url')},
          {title: this.$t('Links.contact.title'), url: this.$t('Links.contact.url')},
        ]
      },
      ...mapGetters({
        isUserloggedIn: 'user/isUserloggedIn'
      })
    },
    methods: {
      onLogout() {
        this.$store.dispatch('user/logoutUser');
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    @media (max-width: 960px) {
      padding: 0;
    }
  }

  a {
    text-decoration: none;
    color: #000;
  }
</style>