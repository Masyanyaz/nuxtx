<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <h1 class="text--secondary mb-3">Create new excursion</h1>
        <v-form
          ref="form"
          v-model="valid"
          validation
          class="mb-3"
        >
          <v-tabs
            v-model="tab"
            background-color=""
            class="elevation-2"
          >
            <v-tab
              v-for="(tab, index) in tabs"
              :key="index"
            >
              {{ tab.headerName }}
            </v-tab>
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="(tab, index) in tabs"
                :key="index"
              >
                <v-card
                  flat
                  tile
                  v-for="(i, index) in tab.item"
                  :key="index"
                  class="pl-3 pr-3"
                >
                  <v-select
                    v-if="i.select"
                    :label="i.itemName"
                    :required="i.required"
                    :disabled="i.disabled"
                    v-model="i.model"
                    :rules="[i.rules]"
                    :items="i.items"
                  ></v-select>
                  <v-textarea
                    v-else-if="i.textarea"
                    v-model="i.model"
                    :rules="[i.rules]"
                    :name="i.itemName"
                    :label="i.itemName"
                    multi-line
                    type="text"
                  ></v-textarea>
                  <v-text-field
                    v-else
                    :rules="[i.rules]"
                    v-model="i.model"
                    :required="i.required"
                    :name="i.itemName"
                    :label="i.itemName"
                    type="text"
                  ></v-text-field>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-form>
        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn
              @click="triggerUpload"
              class="warning"
            >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              @change="onFileChange"
              style="display: none;"
              accept="image/*">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img
              height="100px"
              :src="imageSrc"
              v-if="imageSrc">
          </v-flex>
        </v-layout>
<!--        <v-layout row mb-3>-->
<!--          <v-flex xs12>-->
<!--            <v-btn-->
<!--              @click="galeryUpload"-->
<!--              class="warning"-->
<!--            >-->
<!--              Upload-->
<!--              <v-icon right dark>cloud_upload</v-icon>-->
<!--            </v-btn>-->
<!--            <input-->
<!--              ref="galeryInput"-->
<!--              type="file"-->
<!--              @change="onGaleryChange"-->
<!--              style="display: none;"-->
<!--              accept="image/*"-->
<!--              multiple>-->
<!--          </v-flex>-->
<!--        </v-layout>-->
<!--        {{images}}-->
<!--        <v-layout row>-->
<!--          <v-flex xs12>-->
<!--            <img-->
<!--              class="mr-3"-->
<!--              height="100px"-->
<!--              v-for="item in galerySrc" v-if="galerySrc" :key="item"-->
<!--              :src="item">-->
<!--          </v-flex>-->
<!--        </v-layout>-->
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success"
              @click="createAd"
            >Create ad
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['cities'],
    data() {
      return {
        promo: false,
        valid: false,
        galerySrc: [],
        image: null,
        images: [],
        imageSrc: '',
        tab: null,
        tabs: {
          main: {
            headerName: 'Основное',
            item: {
              name: {
                itemName: 'name',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              },
              url: {
                itemName: 'url',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              },
              price: {
                itemName: 'price',
                model: '',
                rules: false
              },
              time: {
                itemName: 'time',
                model: '',
                rules: false
              },
              groupSize: {
                itemName: 'Group size',
                model: '',
                rules: false
              },
              type: {
                itemName: 'type',
                model: '',
                rules: false
              }
            }
          },
          metaTags: {
            headerName: 'Мета теги',
            item: {
              h1: {
                itemName: 'H1',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              },
              title: {
                itemName: 'Title',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              },
              description: {
                itemName: 'Description',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              }
            }
          },
          detail: {
            headerName: 'Детальное описание',
            item: {
              detailText: {
                itemName: 'detailText',
                model: '',
                required: true,
                textarea: true,
                rules: v => !!v || 'Is required'
              },
              included: {
                itemName: 'included',
                model: '',
                required: true,
                textarea: true,
                rules: v => !!v || 'Is required'
              },
              excluded: {
                itemName: 'excluded',
                model: '',
                required: true,
                textarea: true,
                rules: v => !!v || 'Is required'
              }
            }
          },
          section: {
            headerName: 'Раздел',
            item: {
              language: {
                itemName: 'Language',
                model: this.$store.state.locale,
                required: true,
                select: true,
                disabled: true,
                items: [
                  {text: this.$t('excursionAddNew.tabs.language'), value: this.$store.state.locale},
                ],
                rules: v => !!v || 'Is required'
              },
              city: {
                itemName: 'Город',
                model: '',
                required: true,
                select: true,
                items: [],
                rules: v => !!v || 'Is required'
              }
            }
          },
        },
      }
    },
    created() {
      let cities = this.cities
      cities.forEach(a => {
        this.tabs.section.item.city.items.push({text: a.name, value: a.url})
      })
    },
    computed: mapGetters({
      loading: 'shared/loading',
    }),
    methods: {
      createAd() {
        if (this.$refs.form.validate() && this.image) {
          const ad = {
            h1: this.tabs.metaTags.item.h1.model,
            price: this.tabs.main.item.price.model,
            time: this.tabs.main.item.time.model,
            groupSize: this.tabs.main.item.groupSize.model,
            type: this.tabs.main.item.type.model,
            detailText: this.tabs.detail.item.detailText.model,
            included: this.tabs.detail.item.included.model,
            excluded: this.tabs.detail.item.excluded.model,
            name: this.tabs.main.item.name.model,
            url: this.tabs.main.item.url.model,
            title: this.tabs.metaTags.item.title.model,
            description: this.tabs.metaTags.item.description.model,
            city: this.tabs.section.item.city.model,
            language: this.tabs.section.item.language.model,
            image: this.image,
          }

          this.$store.dispatch('excursion/createExcursion', ad)
            .then(() => {
              this.$router.push('/admin')
            })
            .catch((e) => {
              console.log(e)
            })
        }
      },
      triggerUpload() {
        this.$refs.fileInput.click()
      },
      galeryUpload() {
        this.$refs.galeryInput.click()
      },
      onFileChange(event) {
        const file = event.target.files[0]

        const reader = new FileReader()

        reader.onload = e => {
          this.imageSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
      },
      // onGaleryChange(event) {
      //   const file = event.target.files[0]
      //
      //   const reader = new FileReader()
      //
      //   reader.onload = e => {
      //     this.galerySrc.push(reader.result)
      //   }
      //   reader.readAsDataURL(file)
      //   this.images.push(file)
      // },
    }
  }
</script>