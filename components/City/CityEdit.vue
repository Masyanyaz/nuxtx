<template>
  <div>
    <v-btn
      class="warning mr-2"
      text
      @click="openEditWindow"
    >
      Edit
    </v-btn>
    <v-btn
      class="error mr-2"
      text
      @click="deleteCity"
    >
      Dalete
    </v-btn>
    <v-dialog
      width="700px"
      v-model="modal"
      v-if="modal"
    >
      <v-container style="background-color: #fff;">
        <v-layout>
          <NewAddForm :headerNames="headerNames" :tabItems="tabItems" :createAd="updatedCity"/>
        </v-layout>
        {{city}}
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        modal: false,
        headerNames: ['Основное', 'Мета теги', 'Раздел'],
      }
    },
    computed: {
      city() {
        return this.$store.getters['city/cityByUrl'](this.$route.params.city)
      },
      tabItems() {
        return {
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
        }
      },
      ...mapGetters({
        images: 'admin/images/images'
      })
    },
    methods: {
      updatedCity() {
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

        this.$axios.post(`/admin/api/updatecity/${this.city.id}`, formData)
          .then(res => {
            this.isSend = true;
            this.msg = res.data
          })
          .catch(e => {
            this.isSend = true;
            this.msg = e
          })
      },
      deleteCity() {
        let accept = confirm(`Удалить ${this.city.name}?`);
        if (accept) {
          this.$axios.post(`/admin/api/deletecity/${this.city.id}`)
            .then(() => {
              console.log('deleted')
            })
            .catch(e => {
              throw e;
            })
        }
      },
      async openEditWindow() {
        const url = {
          language: this.$store.state.locale,
          city_url: this.$route.params.city,
        };
        await this.$store.dispatch('city/fetchFullCity', url)
        this.modal = !this.modal;
      }
    },
    components: {
      NewAddForm: () => import('~/components/Admin/NewAddForm')
    }
  }
</script>
