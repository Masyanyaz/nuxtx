<template>
  <div>
    <v-navigation-drawer
      class="d-flex"
      v-if="drawer"
      v-model="drawer"
      app
      temporary
    >
      <v-list dense>
        <v-list-item
          v-for="(link, i) in links"
          :key="i"
          link
          :to="$i18n.path(`${link.url}`)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ link.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar height="80"
               style="box-shadow: none; border-bottom: 1px solid #EAEEF3; background-color: inherit"
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
          <img src="/svg/logo.svg" alt="" style="margin-bottom: -7px;" />
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
</template>

<script>
  export default {
    data() {
      return {
        drawer: false
      }
    },
    computed: {
      isUserloggedIn() {
        return this.$store.getters['user/isUserloggedIn']
      },
      links() {
        return [
          {title: this.$t('Links.activities.title'), url: this.$t('Links.activities.url')},
          {title: this.$t('Links.destinations.title'), url: this.$t('Links.destinations.url')},
          {title: this.$t('Links.about.title'), url: this.$t('Links.about.url')},
          {title: this.$t('Links.contact.title'), url: this.$t('Links.contact.url')},
        ]
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('user/logoutUser')
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