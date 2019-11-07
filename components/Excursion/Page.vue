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
            <img v-lazy="img.morePhoto" alt="" class="mr-2">
            {{$t('commonWords.morePhoto')}}
          </v-btn>
        </div>
        <div v-if="showGalery"
             class="galery align-center justify-center d-flex"
             @click.self="showGalery = !showGalery">
          <Galery :items="exc.galery" style="max-width: 990px; max-height: 660px;" />
          <v-btn text style="position: absolute; bottom: 0; width: 100%; z-index: 99999; height: 70px; background-color: rgba(0,0,0,.5)" @click="showGalery = !showGalery">x</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <div class="container d-flex mt-10">
      <v-layout>
        <v-flex xs12>
          <h1>{{exc.h1}}</h1>
          <ExcursionHeader :exc="exc" />

          <h2>{{$t('Excursion.Page.overview')}}</h2>
          <div v-html="exc.detailText" />
          <div class="hr" v-if="exc.priceList">
            <h2>{{$t('Excursion.Page.tablePrice')}}</h2>
            <v-layout>
              <v-flex xs12 sm10 md8 xl6>
                <v-simple-table>
                  <template>
                    <tbody>
                    <tr v-for="(price, i) in exc.priceList" :key="i" class="text-center">
                      <td v-if="i < 6">
                        {{i+1}} {{i === 0 ? $t('commonWords.groupSize.person') : $t('commonWords.groupSize.persons')}}
                      </td>
                      <td v-else-if="i === 6">7-15 {{$t('commonWords.groupSize.persons')}}</td>
                      <td v-else>16+ {{$t('commonWords.groupSize.persons')}}</td>
                      <td style="font-weight: 200; color: #bababa; font-size: 20px;">|</td>
                      <td v-if="price === '-'" class="font-weight-bold">{{ price }}</td>
                      <td v-else-if="price === ''" class="font-weight-bold">{{$t('commonWords.request')}}</td>
                      <td v-else class="font-weight-bold pt-2" style="line-height: 8px;">
                        {{ price }} €
                        <div class="font-weight-regular caption">
                          {{$t('commonWords.perPerson')}}
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-flex>
            </v-layout>
          </div>
          <div v-if="exc.included || exc.excluded" class="hr">
            <h2>{{$t('Excursion.Page.included')}}/{{$t('Excursion.Page.excluded')}}</h2>
            <div class="d-flex justify-space-between included">
              <div
                v-if="exc.included"
                class="d-flex justify-start align-start included-item flex-column"
              >
                <div
                  class="d-flex align-center"
                  v-for="(incl, i) in exc.included"
                  :key="i"
                >
                  <img v-lazy="img.included" alt="" class="mr-3">
                  <span>{{incl}}</span>
                </div>
              </div>
              <div
                v-if="exc.excluded"
                class="d-flex justify-start align-start included-item flex-column"
              >
                <div
                  class="d-flex align-center"
                  v-for="(excl, i) in exc.excluded"
                  :key="i"
                >
                  <img v-lazy="img.excluded" alt="" class="mr-3">
                  <span>{{excl}}</span>
                </div>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <div class="d-none d-md-block fix-stop ml-5" style="width: 270px; min-width: 270px;">
        <Form class="form" :price="exc.price" />
      </div>
    </div>
    <v-container class="hr">
      <v-layout row v-if="excursions.length">
        <v-flex xs12>
          <h2 class="d-flex justify-center text-center">{{$t('Excursion.Page.alsoLike')}}</h2>
        </v-flex>
      </v-layout>
    </v-container>
    <ExcursionCards :excursions="excursions" />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['exc', 'excursions'],
    data() {
      return {
        showGalery: false,
        numberOfWidth: null,
        img: {
          morePhoto: '/svg/morePhoto.svg',
          included: '/svg/included.svg',
          excluded: '/svg/excluded.svg'
        }
      }
    },
    components: {
      ExcursionCards: () => import("~/components/Excursion/ExcursionCards"),
      ExcursionHeader: () => import('~/components/Excursion/ExcursionHeader'),
      Galery: () => import('~/components/Galery'),
      ExcursionEdit: () => import('~/components/Excursion/ExcursionEdit'),
      Form: () => import("~/components/Form")
    },
    watch: {
      showGalery() {
        this.showGalery ? document.querySelector('html').style.overflow = 'hidden' : document.querySelector('html').style.overflow = 'auto'
      },
    },
    computed: {
      ...mapGetters({
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
    margin-top: 12px;
  }

  .abs {
    position: absolute;
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

  .v-data-table td {
    font-size: 16px;
  }
</style>