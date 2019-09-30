<template>
  <div v-if="!loading">
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg3
        xl2
        v-for="city in cities"
        :key="city.id"
      >
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 16 : 2}`"
            class="pointer"
            :to="$store.state.locale === 'en' ? city.url : $store.state.locale + '/' + city.url"
          >
            <v-img
              :src="city.previewImage"
              class="white--text"
              height="200px"
              aspect-ratio="3"
            >
              <v-card-title
                class="fill-height align-end justify-center pa-0"
                primary-title
              >
                <div style="text-align: center">
                  <h3 class="headline mb-0" style="font-size: calc(15px + 2 * ((100vw) / 300));">{{city.name}}</h3>
                  <p style="font-size: calc(9px + 2 * ((100vw) / 300));">{{city.id}}</p>
                </div>
              </v-card-title>
            </v-img>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="d-flex justify-center pt-5">
          <v-progress-circular
            :size="100"
            :width="4"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['cities'],
    computed: mapGetters({
      loading: 'shared/loading'
    }),
  }
</script>

<style scoped>

</style>