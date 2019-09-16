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
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dense>
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <nuxt-link
          exact
          class="mr-5"
          :to="localePath('index')"
        >
          Excursion
        </nuxt-link>
      </v-toolbar-title>
      <v-toolbar-items class="d-none d-md-flex">
        <v-btn
          text
          v-for="(link, i) in links"
          :key="i"
          :to="localePath(link.url)"
        >
          {{link.title}}
          <v-icon>{{link.icon}}</v-icon>
        </v-btn>
        <v-btn
          text
          v-if="isUserloggedIn"
          @click="onLogout"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
        <v-btn
          text
          :to="switchLocalePath('en')"
          @click="switchLanguage"
        >
          English
        </v-btn>
        <v-btn
          text
          :to="switchLocalePath('fr')"
          @click="switchLanguage"
        >
          Français
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
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
          {title: this.$t('links.activities'), icon: 'keyboard_arrow_down', url: 'activities'},
          {title: this.$t('links.destinations'), icon: 'keyboard_arrow_down', url: 'destinations'},
          {title: this.$t('links.faq'), url: 'faq'},
          {title: this.$t('links.aboutUs'), url: 'about-us'},
          {title: this.$t('links.contact'), url: 'contact'},
          {title: this.$t('links.new'), url: 'admin'}
        ]
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('user/logoutUser')
        this.$router.push('/')
      },
      switchLanguage () {
        setTimeout(() => {
          location.reload();
        }, 1000)
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