<template>
  <v-layout>
    <NewAddForm :headerNames="headerNames" :tabItems="tabItems" :createAd="createAd"/>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        headerNames: ['Основное', 'Мета теги', 'Раздел'],
        tabItems: {
          main: {
            russianName: {
              itemName: 'russianName',
              label: 'Имя на русском',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            },
            name: {
              itemName: 'name',
              label: 'Имя',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            }
            ,
            url: {
              itemName: 'url',
              label: 'Url',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            }
            ,
            popular: {
              itemName: 'popular',
              label: 'Популярный город?',
              checkbox: true,
              model: false,
              required: true,
              rules: v => !!v || 'Is required'
            }
          }
          ,
          metaTags: {
            h1: {
              itemName: 'h1',
              label: 'Заголовок H1',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            }
            ,
            title: {
              itemName: 'title',
              label: 'Title',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            }
            ,
            description: {
              itemName: 'description',
              label: 'Description',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            }
          }
          ,
          section: {
            lang: {
              itemName: 'lang',
              label: 'Язык',
              model: '',
              required: true,
              select: true,
              disabled: false,
              items: [
                {text: 'Английский', value: 'en'},
                {text: 'Французский', value: 'fr'},
              ],
              rules: v => !!v || 'Is required'
            }
          }
          ,
        },
      }
    },
    computed: {
      ...mapGetters({
        images: 'admin/images/images',
      })
    },
    methods: {
      async createAd() {
        let formData = new FormData();
        formData.append('previewImage', this.images.previewImage.image);
        formData.append('mainImage', this.images.mainImage.image);
        this.images.galery.image.forEach(img => {
          formData.append('galery', img);
        });
        formData.append('title', this.tabItems.metaTags.title.model);
        formData.append('description', this.tabItems.metaTags.description.model);
        formData.append('h1', this.tabItems.metaTags.h1.model);
        formData.append('url', this.tabItems.main.url.model);
        formData.append('lang', this.tabItems.section.lang.model.value);
        formData.append('name', this.tabItems.main.name.model);
        formData.append('russianName', this.tabItems.main.russianName.model);
        formData.append('popular', this.tabItems.main.popular.model);

        await this.$store.dispatch('city/createCity', formData);
        try {
        } catch (e) {
          throw e;
        }
      }
    },
    components: {
      NewAddForm: () => import('~/components/Admin/NewAddForm')
    }
  }
</script>