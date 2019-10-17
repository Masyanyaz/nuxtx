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
          v-for="(exc, i) in excursions"
          :key="i"
        >
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              class="pointer"
              :to="$i18n.path(`${exc.city_url}/${exc.url}`)"
            >
              <div class="d-flex justify-center align-center" style="overflow: hidden; position: relative;">
                <img v-lazy="exc.previewImage" alt="" height="200" width="100%" :class="{cardHover : hover}" style="transition: all .3s;">
                <span class="pr-1 pl-1 d-flex align-center justify-center time">
                  <svg width="14px" height="14" viewBox="0 0 34 34" version="1.1" class="mr-1"
                       xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                     stroke-linecap="round" stroke-linejoin="round">
                    <g transform="translate(-134.000000, -1005.000000)" stroke="#000">
                      <g id="tour-detail" transform="translate(0.000000, 211.000000)">
                        <g id="feauture" transform="translate(135.000000, 765.000000)">
                          <g id="Group-3">
                            <g id="Group" transform="translate(0.000000, 25.000000)">
                              <g id="ico_clock" transform="translate(0.000000, 5.000000)">
                                <circle id="Oval" cx="16" cy="16" r="16"></circle>
                                <circle id="Oval" cx="16" cy="17.3333333" r="2.28571429"></circle>
                                <path d="M16,15.047619 L16,7.04761905" id="Shape"></path>
                                <path d="M17.6167619,18.9500952 L21.7142857,23.047619"
                                      id="Shape">
                                </path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                  {{exc.time}} heures
                </span>
              </div>
              <v-card-title
                class="fill-height align-start justify-start pt-2 pl-5 pr-5"
                style="height: 160px; word-break: normal"
              >
                <div class="d-flex flex-column fill-height justify-space-between">
                  <h3 class="mb-1" style="">
                    {{exc.name}}
                  </h3>
                  <p style="font-size: calc(7px + 2 * ((100vw) / 300));">
                    <svg width="10px" height="16px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Hotel-layout" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Room_Only_Detail_1" transform="translate(-135.000000, -4858.000000)" fill="#ffab53"
                           fill-rule="nonzero">
                          <g id="nearby-hotel" transform="translate(130.000000, 4334.000000)">
                            <g id="h1-g" transform="translate(5.000000, 136.000000)">
                              <g id="hotel-grid">
                                <g id="price" transform="translate(0.000000, 383.000000)">
                                  <g id="thunder" transform="translate(0.000000, 5.000000)">
                                    <path
                                      d="M10.0143234,6.99308716 C9.91102517,6.83252576 9.73362166,6.73708716 9.54386728,6.73708716 L5.61404272,6.73708716 L5.61404272,0.561648567 C5.61404272,0.296666111 5.42877956,0.0676134793 5.16941114,0.0125959355 C4.90555149,-0.0435444154 4.64730587,0.0923152337 4.5395164,0.333718743 L0.0482883306,10.4389819 C-0.0291853536,10.6118942 -0.0123432484,10.8139994 0.0909549973,10.9723152 C0.194253243,11.1317538 0.371656752,11.2283152 0.561411138,11.2283152 L4.4912357,11.2283152 L4.4912357,17.4037538 C4.4912357,17.6687363 4.67649886,17.8977889 4.93586728,17.9528065 C4.97516552,17.9606661 5.01446377,17.9651573 5.05263921,17.9651573 C5.27046377,17.9651573 5.47369184,17.8382801 5.56576201,17.6316837 L10.0569901,7.5264205 C10.133341,7.35238541 10.1187445,7.15252576 10.0143234,6.99308716 Z"
                                      id="Shape"></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    from
                    <span style="font-size: calc(15px + 2 * ((100vw) / 300)); font-weight: 500;">
                    €{{exc.price}}
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
    })
  }
</script>

<style scoped lang="scss">
  .cardHover {
    transform: scale(1.1);
  }

  h3 {
    margin: 0;
    font-size: 16px;
    line-height: 24px;
  }

  .time {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 2px;
    color: #000;
    font-size: 14px;
    height: 22px;
  }
</style>