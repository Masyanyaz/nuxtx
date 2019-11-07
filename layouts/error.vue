<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex>
        <div v-if="error.statusCode === 404" class="text-center">
          <h1>
            OOPS...
          </h1>
          <p>Something went wrong here :(</p>
          <img v-lazy="img" alt="" class="my-7">
          <p class="mb-0">Sorry, we couldn't find the page you're looking for.</p>
          <p>Try returning to the <nuxt-link :to="$i18n.path('')">Homepage</nuxt-link></p>
        </div>
        <h1 v-else>
          {{ otherError }}
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    head() {
      const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
      return {
        title
      }
    },
    data() {
      return {
        pageNotFound: '404 Not Found',
        otherError: 'An error occurred',
        img: '/404.jpg'
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 48px;
    font-weight: 500;
  }
</style>
