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

    <v-app-bar height="80" style="box-shadow: none; border-bottom: 1px solid #EAEEF3;">
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <nuxt-link
          exact
          class="mr-5"
          :to="$i18n.path('')"
        >
          <img src="/logo.svg" alt="" style="margin-bottom: -7px;" />
        </nuxt-link>
      </v-toolbar-title>
      <v-toolbar-items class="d-none d-md-flex">
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
          <v-icon left>exit_to_app</v-icon>
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
      error() {
        return this.$store.getters['shared/error']
      },
      links() {
        return [
          {title: this.$t('Navbar.activities'), icon: 'keyboard_arrow_down', url: 'activities'},
          {title: this.$t('Navbar.destinations'), icon: 'keyboard_arrow_down', url: 'destinations'},
          {title: this.$t('Navbar.aboutUs'), url: 'about-us'},
          {title: this.$t('Navbar.contact'), url: 'contact'},
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
  a {
    text-decoration: none;
    color: #000;
  }
</style>