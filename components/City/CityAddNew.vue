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
          action="/api/addcity"
          method="POST"
          id="form"
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
                  <!--                  <select v-if="i.select" name="language" id="language">-->
                  <!--                    <option value="en">english</option>-->
                  <!--                    <option value="fr">franc</option>-->
                  <!--                  </select>-->
                  <div
                    v-if="i.select"
                  >
                    <v-select
                      :label="i.itemName"
                      :required="i.required"
                      :disabled="i.disabled"
                      v-model="i.model"
                      :rules="[i.rules]"
                      :items="i.items"
                    ></v-select>
                    <v-text-field
                      :rules="[i.rules]"
                      v-model="i.model"
                      :required="i.required"
                      :name="i.itemName"
                      :label="i.itemName"
                      type="text"
                      style="display: none;"
                    ></v-text-field>
                  </div>
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
        <!--        <v-layout row mb-3>-->
        <!--          <v-flex xs12>-->
        <!--            <v-btn-->
        <!--              @click="triggerUpload"-->
        <!--              class="warning"-->
        <!--            >-->
        <!--              Upload-->
        <!--              <v-icon right dark>cloud_upload</v-icon>-->
        <!--            </v-btn>-->
        <!--            <input-->
        <!--              ref="fileInput"-->
        <!--              type="file"-->
        <!--              @change="onFileChange"-->
        <!--              style="display: none;"-->
        <!--              accept="image/*">-->
        <!--          </v-flex>-->
        <!--        </v-layout>-->
        <!--        <v-layout row>-->
        <!--          <v-flex xs12>-->
        <!--            <img-->
        <!--              height="100px"-->
        <!--              :src="imageSrc"-->
        <!--              v-if="imageSrc">-->
        <!--          </v-flex>-->
        <!--        </v-layout>-->
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || image || loading"
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
    data() {
      return {
        valid: false,
        image: null,
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
              }
            }
          },
          metaTags: {
            headerName: 'Мета теги',
            item: {
              h1: {
                itemName: 'h1',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              },
              title: {
                itemName: 'title',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              },
              description: {
                itemName: 'description',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              }
            }
          },
          section: {
            headerName: 'Раздел',
            item: {
              language: {
                itemName: 'language',
                model: this.$store.state.locale,
                required: true,
                select: true,
                disabled: false,
                items: [
                  {text: this.$t('excursionAddNew.tabs.language'), value: 'en'},
                ],
                rules: v => !!v || 'Is required'
              }
            }
          },
          photoGalery: {
            headerName: 'Фотографии',
            item: {
              previewImageSrc: {
                itemName: 'previewImageSrc',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              },
              imageSrc: {
                itemName: 'imageSrc',
                model: '',
                required: true,
                rules: v => !!v || 'Is required'
              },
            }
          },
        },
      }
    },
    computed: mapGetters({
      loading: 'shared/loading'
    }),
    methods: {
      createAd() {
        form.submit()
        // if (this.$refs.form.validate()) {
        //   const ad = {
        //     h1: this.tabs.metaTags.item.h1.model,
        //     name: this.tabs.main.item.name.model,
        //     url: this.tabs.main.item.url.model,
        //     title: this.tabs.metaTags.item.title.model,
        //     description: this.tabs.metaTags.item.description.model,
        //     language: this.tabs.section.item.language.model,
        //     image: this.image
        //   }
        //
        //   this.$store.dispatch('city/createCity')
        //     .then(() => {
        //       this.$router.push('/admin')
        //     })
        //     .catch((e) => {
        //       console.log(e)
        //     })
        // }
      },
      triggerUpload() {
        this.$refs.fileInput.click()
      },
      onFileChange(event) {
        const file = event.target.files[0]

        const reader = new FileReader()

        reader.onload = e => {
          this.imageSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
      }
    }
  }
</script>