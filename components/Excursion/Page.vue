<template>
  <div>
    <v-card-actions v-if="isUserloggedIn" style="position: absolute; top: 0; right: 0;">
      <v-spacer></v-spacer>
      <ExcursionEdit :exc="exc" :cities="cities"></ExcursionEdit>
    </v-card-actions>
    <v-layout>
      <v-flex xs12>
        <div
          :style="{background: 'url(' + exc.mainImage + ') no-repeat 50% 15% /cover'}"
          class="welcome-top">
          <!--            <h1 class="welcome-top__text">{{exc.h1}}</h1>-->
          <v-btn
            v-if="exc.galery"
            text
            @click="showGalery = !showGalery"
            style="font-size: calc(12px + 2 * ((100vw) / 600)); color: #ffffff; position: absolute; bottom: 5px;
              right: 10px;"
          >
            <svg class="mr-2" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
                 style="enable-background:new 0 0 24 24;" xml:space="preserve">
              <g fill="#FFFFFF">
                <path d="M3.75,22.5C1.682,22.5,0,20.818,0,18.75V8.25C0,6.182,1.682,4.5,3.75,4.5h9.75V3c0-0.827,0.673-1.5,1.5-1.5h3
                  c0.827,0,1.5,0.673,1.5,1.5v1.5h0.75C22.318,4.5,24,6.182,24,8.25v10.5c0,2.068-1.682,3.75-3.75,3.75H3.75z M1.5,18.75
                  C1.5,19.991,2.509,21,3.75,21h16.5c1.241,0,2.25-1.009,2.25-2.25V16.5h-5.758c-0.869,1.831-2.704,3-4.742,3
                  c-2.038,0-3.873-1.169-4.742-3H1.5V18.75z M12,10.5c-2.068,0-3.75,1.682-3.75,3.75C8.25,16.318,9.932,18,12,18
                  c2.068,0,3.75-1.682,3.75-3.75C15.75,12.182,14.068,10.5,12,10.5z M22.5,15V8.25C22.5,7.009,21.491,6,20.25,6H3.75
                  C2.509,6,1.5,7.009,1.5,8.25V15h5.307c-0.038-0.253-0.057-0.504-0.057-0.75C6.75,11.355,9.105,9,12,9c2.895,0,5.25,2.355,5.25,5.25
                  c0,0.246-0.019,0.497-0.057,0.75H22.5z M18,4.5V3h-3l0,1.5H18z"></path>
                <circle cx="18.75" cy="8.25" r="1.125"></circle>
                <path
                  d="M4.5,9C4.086,9,3.75,8.664,3.75,8.25S4.086,7.5,4.5,7.5h2.25c0.414,0,0.75,0.336,0.75,0.75S7.164,9,6.75,9H4.5z"></path>
              </g>
            </svg>
            {{$t('commonWords.morePhoto')}}
          </v-btn>
        </div>
        <div v-if="showGalery" class="galery align-center justify-center d-flex"
             @click.self="showGalery = !showGalery">
          <Galery :items="exc.galery" style="max-width: 60%; height: 440px; position: absolute;"/>
        </div>
      </v-flex>
    </v-layout>
    <div style="margin: 60px 4% 0; display: flex;" class="container">
        <v-layout>
          <v-flex xs12>
            <h1>{{exc.h1}}</h1>
            <ExcursionHeader :exc="exc"/>

            <h2>{{$t('Excursion.overview')}}</h2>
            <div v-html="exc.detailText"/>

            <div v-if="exc.included || exc.excluded" class="hr">
              <h2>{{$t('Excursion.included')/$t('Excursion.exclude')}}</h2>
              <div class="d-flex justify-space-between included">
                <div
                  v-if="exc.included"
                  class="d-flex justify-start align-start included-item"
                  style="flex-direction: column"
                >
                  <div
                    class="d-flex align-center"
                    v-for="(incl, i) in exc.included"
                  >
                    <svg height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
                         style="enable-background:new 0 0 24 24;" xml:space="preserve" class="mr-3">
                      <g fill="#2ECC71">
                        <path d="M6.347,24.003c-0.601,0-1.182-0.183-1.68-0.529c-0.261-0.181-0.489-0.403-0.68-0.658L0.15,17.7
                          c-0.12-0.16-0.171-0.358-0.143-0.556C0.036,16.946,0.14,16.77,0.3,16.65c0.131-0.098,0.286-0.15,0.45-0.15
                          c0.235,0,0.459,0.112,0.6,0.3l3.839,5.118c0.094,0.127,0.207,0.236,0.335,0.325c0.245,0.17,0.53,0.26,0.826,0.26
                          c0.086,0,0.173-0.008,0.259-0.023c0.381-0.068,0.712-0.281,0.933-0.599L22.636,0.32C22.775,0.12,23.005,0,23.25,0
                          c0.154,0,0.303,0.047,0.429,0.135c0.165,0.115,0.274,0.287,0.309,0.484c0.035,0.197-0.009,0.396-0.124,0.561L8.772,22.739
                          c-0.449,0.645-1.124,1.078-1.9,1.217C6.699,23.987,6.522,24.003,6.347,24.003z">

                        </path>
                      </g>
                    </svg>
                    <span
                      :key="i"
                      v-text="incl"
                    ></span>
                  </div>
                </div>
                <div
                  v-if="exc.excluded"
                  class="d-flex justify-start align-start included-item"
                  style="flex-direction: column"
                >
                  <div
                    class="d-flex align-center"
                    v-for="(excl, i) in exc.excluded"
                  >
                    <svg class="mr-3" height="18px" width="18px" version="1.1" id="Layer_1"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
                         style="enable-background:new 0 0 24 24;" xml:space="preserve">
                      <g fill="#FA5636">
                        <path d="M19.5,20.25c-0.2,0-0.389-0.078-0.53-0.22L12,13.061l-6.97,6.97c-0.142,0.142-0.33,0.22-0.53,0.22s-0.389-0.078-0.53-0.22
                          c-0.292-0.292-0.292-0.768,0-1.061l6.97-6.97L3.97,5.03C3.828,4.889,3.75,4.7,3.75,4.5s0.078-0.389,0.22-0.53
                          C4.111,3.828,4.3,3.75,4.5,3.75s0.389,0.078,0.53,0.22l6.97,6.97l6.97-6.97c0.142-0.142,0.33-0.22,0.53-0.22s0.389,0.078,0.53,0.22
                          c0.142,0.141,0.22,0.33,0.22,0.53s-0.078,0.389-0.22,0.53L13.061,12l6.97,6.97c0.292,0.292,0.292,0.768,0,1.061
                          C19.889,20.172,19.7,20.25,19.5,20.25z"></path>
                      </g>
                    </svg>
                    <span
                      :key="i"
                      v-text="excl"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      <div class="d-none d-md-block fix-stop ml-5" style="width: 270px; min-width: 270px;">
        <Form class="form" :exc="exc"/>
      </div>
    </div>
    <v-container class="hr">
      <v-layout row v-if="excursions.length">
        <v-flex xs12>
          <h2 class="d-flex justify-center">{{$t('Excursion.alsoLike')}}</h2>
        </v-flex>
      </v-layout>
    </v-container>
    <ExcursionCards :excursions="excursions"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const ExcursionHeader = () => import('~/components/Excursion/ExcursionHeader')
  const Galery = () => import('~/components/Galery')
  const ExcursionEdit = () => import('~/components/Excursion/ExcursionEdit')
  const ExcursionCards = () => import("~/components/Excursion/ExcursionCards")
  const Form = () => import("~/components/Form")

  export default {
    props: ['exc'],
    data() {
      return {
        showGalery: false,
        numberOfWidth: null
      }
    },

    components: {
      ExcursionCards,
      ExcursionHeader,
      Galery,
      ExcursionEdit,
      Form
    },
    computed: {
      ...mapGetters({
        excursions: 'excursion/excursions',
        cities: 'city/cities',
        isUserloggedIn: 'user/isUserloggedIn'
      })
    },
    methods: {
      autoScrollForm() {
        let form = document.querySelector('.form');
        let fixStop = document.querySelector('.fix-stop');
        let heightFixStop = null;
        if (!heightFixStop) heightFixStop = fixStop.getBoundingClientRect().height + 155;

        if (heightFixStop <= 700) return false;

        if (pageYOffset <= 600) {
          form.classList.remove('fix');
        }
        if (pageYOffset >= 600 && pageYOffset <= heightFixStop) {
          form.classList.remove('abs');
          form.style.top = '0';
          form.classList.add('fix');
        }
        if (pageYOffset >= heightFixStop) {
          form.classList.remove('fix');
          form.classList.add('abs');
          form.style.top = `${heightFixStop}px`
        }

      },
      sizeWindow() {
        let width = window.innerWidth;
        switch (true) {
          case width > 1904:
            return 6;
          case width > 1264 && width < 1904:
            return 4;
          case width > 960 && width < 1264:
            return 3;
          case width > 600 && width < 960:
            return 2;
          case width < 600:
            return 1;
        }
      },
    },
    created() {
      if (process.browser) {
        if (window.innerWidth >= 960) {
          window.addEventListener('scroll', this.autoScrollForm)
        }
        this.numberOfWidth = this.sizeWindow()
      }
    },
    beforeDestroy() {
      if (process.browser) {
        window.removeEventListener('scroll', this.autoScrollForm)
      }
    }
  }
</script>

<style scoped lang="scss">
  .welcome-top {
    &:before {
      background: none;
    }
  }

  .fix {
    position: fixed;
    top: 0;
    right: 9%;
    margin-top: 12px;
  }

  .abs {
    position: absolute;
    right: 9%;
  }

  h2 {
    margin-top: 25px;
    margin-bottom: 15px;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 30px;
  }

  .car-link {
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-radius: 5px 5px 0 0;
    position: absolute;
  }

  .included {
    max-width: 600px;

    &-item {
      margin-top: 10px;
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  .hr {
    border-top: 2px solid #D7DCE3;
    margin-top: 25px;
  }
</style>