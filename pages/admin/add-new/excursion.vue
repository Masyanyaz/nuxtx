<template>
  <v-layout>
    <NewAddForm :headerNames="headerNames" :tabItems="tabItems" :createAd="createAd" />
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    async fetch({store}) {
      await store.dispatch('city/fetchAllCities');
      // await store.dispatch('filter/fetchCategory')
    },
    computed: mapGetters({
      cities: 'city/cities',
      category: 'filter/category',
      images: 'admin/images/images',
    }),
    data() {
      return {
        headerNames: ['Основное', 'Мета теги', 'Детальное описание', 'Раздел', 'Цена'],
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
            },
            url: {
              itemName: 'url',
              label: 'Url',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            },
            time: {
              itemName: 'time',
              label: 'Время',
              model: '',
              rules: false
            },
            groupSize: {
              itemName: 'groupSize',
              label: 'Размер группы',
              model: '',
              rules: false,
              type: 'number'
            },
            popular: {
              itemName: 'popular',
              label: 'Популярная экскурсия?',
              checkbox: true,
              model: false,
              required: true,
              rules: v => !!v || 'Is required'
            }
          },
          metaTags: {
            h1: {
              itemName: 'h1',
              label: 'Заголовок H1',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            },
            title: {
              itemName: 'title',
              label: 'Title',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            },
            description: {
              itemName: 'description',
              label: 'Description',
              model: '',
              required: true,
              rules: v => !!v || 'Is required'
            }
          },
          detail: {
            detailText: {
              itemName: 'detailText',
              label: 'Детальное описание',
              model: '',
              required: false,
              textarea: true,
              rules: v => !!v || 'Is required'
            },
            included: {
              itemName: 'included',
              label: 'Что включено в экскурсию',
              model: '',
              required: false,
              textarea: true,
              rules: false
            },
            excluded: {
              itemName: 'excluded',
              label: 'Что НЕ включено в экскурсию',
              model: '',
              required: false,
              textarea: true,
              rules: false
            }
          },
          section: {
            city: {
              itemName: 'city',
              label: 'Город',
              model: '',
              required: true,
              select: true,
              items: [],
              rules: v => !!v || 'Is required'
            },
            type: {
              itemName: 'type',
              label: 'Тип экскурсии',
              model: '',
              multiple: true,
              select: true,
              rules: false,
              items: [],
            }
          },
          price: {
            priceList: {
              itemName: 'priceList',
              label: 'Таблица с ценами',
              model: '',
              required: false,
              textarea: true,
              rules: false
            },
            pricePerPerson: {
              itemName: 'pricePerPerson',
              label: 'Цена за количество человек',
              model: 4,
              rules: false,
              type: 'number'
            },
          }
        },
      }
    },
    created() {
      this.cities.forEach(a => {
        this.tabItems.section.city.items.push({text: `${a.name} [${a.lang}]`, value: a.id})
      })
      this.category.forEach(a => {
        this.tabItems.section.type.items.push({text: a.name, value: a.id})
      })
    },
    components: {
      NewAddForm: () => import('~/components/Admin/NewAddForm')
    },
    methods: {
      async createAd() {
        let formData = new FormData();
        formData.append('previewImage', this.images.previewImage.image);
        formData.append('mainImage', this.images.mainImage.image);
        this.images.galery.image.forEach(img => {
          formData.append('galery', img);
        });
        this.tabItems.section.type.model.forEach(type => {
          formData.append('type', type);
        })
        formData.append('city_id', this.tabItems.section.city.model);
        formData.append('detailText', this.tabItems.detail.detailText.model);
        formData.append('included', this.tabItems.detail.included.model);
        formData.append('excluded', this.tabItems.detail.excluded.model);
        formData.append('groupSize', this.tabItems.main.groupSize.model);
        formData.append('priceList', this.tabItems.price.priceList.model);
        formData.append('pricePerPerson', this.tabItems.price.pricePerPerson.model);
        formData.append('time', this.tabItems.main.time.model);
        formData.append('title', this.tabItems.metaTags.title.model);
        formData.append('description', this.tabItems.metaTags.description.model);
        formData.append('h1', this.tabItems.metaTags.h1.model);
        formData.append('url', this.tabItems.main.url.model);
        formData.append('name', this.tabItems.main.name.model);
        formData.append('russianName', this.tabItems.main.russianName.model);
        formData.append('popular', this.tabItems.main.popular.model);

        await this.$store.dispatch('excursion/createExcursion', formData);
        try {
        } catch (e) {
          throw e;
        }
      }
    }
  }

</script>