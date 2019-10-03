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
                    :name="i.itemName"
                    return-object
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
              @click="$refs.previewImage.click()"
              class="warning"
            >
              Upload preview
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              ref="previewImage"
              name="previewImage"
              type="file"
              @change="onFileChange"
              style="display: none;"
              accept="image/*">
          </v-flex>
        </v-layout>
        <v-layout row v-if="images.preview.src">
          <v-flex xs12>
            <img
              height="100px"
              :src="images.preview.src">
          </v-flex>
        </v-layout>
        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn
              @click="$refs.mainImage.click()"
              class="warning"
            >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              ref="mainImage"
              name="mainImage"
              type="file"
              @change="onFileChange"
              style="display: none;"
              accept="image/*">
          </v-flex>
        </v-layout>
        <v-layout row v-if="images.main.src">
          <v-flex xs12>
            <img
              height="100px"
              :src="images.main.src">
          </v-flex>
        </v-layout>

        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn
              @click="$refs.galery.click()"
              class="warning"
            >
              Upload galery
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              ref="galery"
              name="galery"
              type="file"
              multiple
              @change="onFileChange"
              style="display: none;"
              accept="image/*">
          </v-flex>
        </v-layout>
        <v-layout row v-if="images.galery.src">
          <v-flex xs12>
            <img
              class="mr-3"
              v-for="(img, i) in images.galery.src"
              :key="i"
              height="100px"
              :src="img">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !images.preview.image || !images.main.image || loading"
              class="success"
              @click="createAd"
            >Create ad
            </v-btn>
            <div
              v-if="error"
            >
              {{error}}
            </div>
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
        images: {
          preview: {
            image: null,
            src: ''
          },
          main: {
            image: null,
            src: ''
          },
          galery: {
            image: [],
            src: []
          },
        },
        valid: false,
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
              lang: {
                itemName: 'lang',
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
          },

        },
      }
    },
    computed: {
      ...mapGetters({
        loading: 'shared/loading',
        error: 'shared/error',
      })
    },
    methods: {
      async createAd() {
        let formData = new FormData();
        formData.append('previewImage', this.images.preview.image);
        formData.append('mainImage', this.images.main.image);
        this.images.galery.image.forEach(img => {
          formData.append('galery', img);
        })
        formData.append('title', this.tabs.metaTags.item.title.model);
        formData.append('description', this.tabs.metaTags.item.description.model);
        formData.append('h1', this.tabs.metaTags.item.h1.model);
        formData.append('url', this.tabs.main.item.url.model);
        formData.append('lang', this.tabs.section.item.lang.model.value);
        formData.append('name', this.tabs.main.item.name.model);

        await this.$store.dispatch('city/createCity', formData)
        try {
          this.$refs.form.reset();
          this.images = {
            preview: {
              image: null,
              src: ''
            },
            main: {
              image: null,
              src: ''
            },
            galery: {
              image: [],
              src: []
            },
          };
        }
        catch (e) {
          throw e;
        }
      },
      fileReader(file, name) {
        const reader = new FileReader();
        reader.onload = e => {
          this.images[name].src = reader.result
        };
        reader.readAsDataURL(file);
      },
      fileReaderGalery(file, name) {
        const reader = new FileReader();
        reader.onload = e => {
          this.images[name].src.push(reader.result)
        };
        reader.readAsDataURL(file);
      },
      onFileChange(event) {
        if (event.target.name === 'previewImage') {
          const file = event.target.files[0];

          this.fileReader(file, 'preview')

          this.images.preview.image = file
        }
        if (event.target.name === 'mainImage') {
          const file = event.target.files[0];

          this.fileReader(file, 'main')

          this.images.main.image = file
        }
        if (event.target.name === 'galery') {
          const file = event.target.files;

          for (let i = 0; i < file.length; i++) {
            this.fileReaderGalery(file[i], 'galery')
            this.images.galery.image.push(file[i]);
          }
        }
      }
    }
  }
</script>