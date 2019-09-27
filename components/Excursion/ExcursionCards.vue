<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg3
        xl2
        v-for="exc in excursions"
        :key="exc.id"
      >
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 16 : 2}`"
            class="pointer"
            :to="$store.state.locale === 'en' ? '/' + exc.city + '/' + exc.url : '/' + $store.state.locale + '/' +
            exc.city + '/' + exc.url"
          >
            <v-img
              :src="exc.imageSrc"
              class="white--text"
              height="200px"
              aspect-ratio="3"
            >
              <v-card-title
                class="fill-height align-end justify-center pa-0"
                primary-title
              >
                <div style="text-align: center">
                  <h3 class="headline mb-0" style="font-size: calc(15px + 2 * ((100vw) / 300));">{{exc.name}}</h3>
                  <p style="font-size: calc(9px + 2 * ((100vw) / 300));">{{exc.id}}</p>
                </div>
              </v-card-title>
            </v-img>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['excursions'],
    computed: mapGetters({
      loading: 'shared/loading'
    }),
  }
</script>

<style scoped>

</style>