<template>
  <div>
    <v-card-actions v-if="isUserloggedIn" style="position: absolute; top: 0; right: 0;">
      <v-spacer></v-spacer>
      <CityEdit></CityEdit>
    </v-card-actions>
    <v-layout>
      <v-flex xs12>
        <div
          :style="{background: 'url(' + city.mainImage + ') no-repeat 50% 15% /cover'}"
          class="welcome-top"
        >
          <h1 class="welcome-top__text">{{city.h1}}</h1>
        </div>
      </v-flex>
    </v-layout>
    <h2 class="d-flex justify-center mt-9 mb-4">
      Choisissez une visite guidée
    </h2>
    <CategoryCards :category="categoryFilter" />
    <h3 class="d-flex justify-center mt-9 mb-4">
      Voir d'autres excursions
    </h3>
    <v-container>
      <v-chip-group
        column
        active-class="green lighten-1"
      >
        <v-chip
          outlined
          color="green"
          v-for="(tag, i) in anotherCategory"
          :key="i"
          :disabled="tag.exc_count === 0"
          :to="$i18n.path(`${city.url}/${tag.url}`)"
        >
          {{ tag.name }}
          <span
            class="ml-1 font-weight-bold"
          >
            {{tag.exc_count}}
          </span>
        </v-chip>
      </v-chip-group>
    </v-container>
    <h2 class="d-flex justify-center my-8" style="text-align: center">
      Nos meilleurs visites à Saint-Pétersbourg
    </h2>
    <ExcursionCards :excursions="excursions"/>
    <v-container class="d-flex justify-center">
      <v-btn
        :to="$i18n.path(`${city.url}/all`)"
      >
        Voir toutes les visites
      </v-btn>
    </v-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    async asyncData({store, params, error}) {
      const url = {
        language: store.state.locale,
        city_url: params.city,
        order: 'excursion.popular',
        sort: 'desc',
        limit: 8
      };
      if (store.getters['filter/category'].length === 0 || store.getters['city/cityByUrl'](params.city).url !== params.city) {
        await store.dispatch('filter/fetchCategory', url)
      }

      if (store.getters['city/city'].length === 0 || store.getters['city/cityByUrl'](params.city).url !== params.city) {
        await store.dispatch('city/fetchCity', url)
      }
      await store.dispatch('excursion/fetchExcursions', url)
      let city = await store.getters['city/cityByUrl'](params.city)

      if(!city) {
        return error({statusCode: 404})
      }

      return {city}
    },
    head() {
      return {
        title: this.city.title,
        meta: [
          {hid: 'description', name: 'description', content: this.city.description}
        ]
      }
    },
    computed: {
      categoryFilter() {
        return this.category.filter(a => a.popular === 'true')
      },
      anotherCategory() {
        return this.category.filter(a => a.popular === 'false')
      },
      ...mapGetters({
        category: 'filter/category',
        excursions: 'excursion/excursions',
        isUserloggedIn: 'user/isUserloggedIn'
      })
    },
    components: {
      CategoryCards: () => import('~/components/Category/Cards'),
      ExcursionCards: () => import("~/components/Excursion/ExcursionCards"),
      CityEdit: () => import("~/components/City/CityEdit"),
    },
  }
</script>

<style scoped lang="scss">
  h2 {
    font-size: calc(17px + 2 * ((100vw) / 200));
  }
</style>