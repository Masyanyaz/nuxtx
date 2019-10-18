<template>
  <div>
    <v-navigation-drawer
      class="d-flex d-md-none"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list dense>
        <v-list-item
          v-for="(link, i) in links"
          :key="i"
          link
          :to="link.url"
        >
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar height="80" style="box-shadow: none; border-bottom: 1px solid #EAEEF3; background-color: inherit"
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
          <img src="/logo.svg" alt="" style="margin-bottom: -7px;" />
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
        drawer: null
      }
    },
    computed: {
      isUserloggedIn() {
        return this.$store.getters['user/isUserloggedIn']
      },
      links() {
        return [
          {title: this.$t('Navbar.activities.name'), url: this.$t('Navbar.activities.url')},
          {title: this.$t('Navbar.destinations.name'), url: this.$t('Navbar.destinations.url')},
          {title: this.$t('Navbar.about.name'), url: this.$t('Navbar.about.url')},
          {title: this.$t('Navbar.contact.name'), url: this.$t('Navbar.contact.url')},
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