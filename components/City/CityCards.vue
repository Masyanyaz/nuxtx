<template>
  <div v-if="!loading">
    <v-container grid-list-lg class="container ml-0">
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
              class="pointer"
              :to="$i18n.path(`${city.url}`)"
              height="350"
              style="border-radius: 0"
            >
              <div class="d-flex justify-center align-center" style="overflow: hidden; position: relative;">
                <img v-lazy="city.previewImage" alt="" height="350" :class="{cardHover : hover}"
                     style="transition: all .3s;">
                <div style="text-align: center; position: absolute; color: #ffffff; bottom: 10%;">
                  <h3 class="headline mb-0 pb-0"
                      style="font-size: calc(15px + 2 * ((100vw) / 300)); font-weight: bold; text-shadow: 1px 1px #000;">
                    {{city.name}}
                  </h3>
                  <span
                    style="font-size: calc(10px + 2 * ((100vw) / 400));text-shadow: 1px 1px #000;"
                  >
                    {{city.excCount}} excursions
                  </span>
                </div>
              </div>
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

<style scoped lang="scss">
  .cardHover {
    transform: scale(1.1);
  }

  .container {
    padding: 12px 7%;
  }
</style>