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
              }
            }
          },
        },
      }
    },
    computed: mapGetters({
      loading: 'shared/loading',
    }),
    methods: {
      createAd() {
        if (this.$refs.form.validate() && this.image) {
          const ad = {
            h1: this.tabs.metaTags.item.h1.model,
            name: this.tabs.main.item.name.model,
            url: this.tabs.main.item.url.model,
            title: this.tabs.metaTags.item.title.model,
            description: this.tabs.metaTags.item.description.model,
            language: this.tabs.section.item.language.model,
            image: this.image
          }

          this.$store.dispatch('city/createAd', ad)
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