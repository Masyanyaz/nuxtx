<template>
  <div v-if="!loading">
    <v-container grid-list-lg class="container">
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          lg3
          xl2
          v-for="(exc, i) in excursions"
          :key="i"
        >
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 16 : 2}`"
              class="pointer"
              :to="$i18n.path(`${exc.city}/${exc.url}`)"
            >
              <div class="d-flex justify-center align-center" style="overflow: hidden; position: relative;">
                <img v-lazy="exc.previewImage" alt="" height="200px">
                <span style="position: absolute; bottom: 0; right: 5px; color: #ffffff;">{{exc.time}}</span>
              </div>
              <v-card-title
                class="fill-height align-end justify-start pt-2 pl-5 pr-5"
                primary-title
              >
                <div class="d-flex flex-column">
                  <h3 class="headline mb-1" style="font-size: calc(13px + 2 * ((100vw) / 300));">
                    {{exc.name}}
                  </h3>
                  <p style="font-size: calc(9px + 2 * ((100vw) / 300));">
                    from
                    <span style="font-size: calc(16px + 2 * ((100vw) / 300)); font-weight: bold;">
                    {{exc.price}}
                    </span>
                  </p>
                </div>
              </v-card-title>
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
    props: ['excursions'],
    computed: mapGetters({
      loading: 'shared/loading'
    }),
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 12px 4%;
  }
</style>