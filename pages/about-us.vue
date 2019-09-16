<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex>
        <h1>about-us</h1>
        <div class="Content">
          <div class="container">
            <h1 class="Content__Title">
              {{ $t('about.title') }}
            </h1>
            <p>{{ $t('about.introduction') }}</p>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    head: {
      title: 'About us',
      meta: [
        { hid: 'description', name: 'description', content: 'desc About us' }
      ]
    }
  }
</script>

<style scoped>

</style>