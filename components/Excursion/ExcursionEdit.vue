<template>
  <div>
    <v-btn
      class="warning mr-2"
      text
      @click="modal = !modal"
    >
      Edit
    </v-btn>
    <v-btn
      class="error mr-2"
      text
      @click="deleteExcursion"
    >
      Dalete
    </v-btn>
    <v-dialog
      width="900px"
      v-model="modal"
      v-if="modal"
    >
      <v-container style="background-color: #fff;">
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
                        :name="i.itemName"
                        :required="i.required"
                        :disabled="i.disabled"
                        v-model="i.model"
                        :rules="[i.rules]"
                        :items="i.items"
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
                  :disabled="!valid || loading"
                  class="success"
                  @click="updatedExcursion"
                >Create ad
                </v-btn>
                <div
                  v-if="isSend"
                >
                  {{msg}}
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['cities', 'exc'],
    data() {
      return {
        modal: false,
        images: {
          preview: {
            image: null,
            src: this.exc.previewImage
          },
          main: {
            image: null,
            src: this.exc.mainImage
          },
          galery: {
            image: [],
            src: this.exc.galery
          },
        },
        valid: false,
        isSend: false,
        msg: '',
        tab: null,
        tabs: {
          main: {
            headerName: 'Основное',
            item: {
              name: {
                itemName: 'name',
                model: this.exc.name,
                required: true,
                rules: v => !!v || 'Is required'
              },
              url: {
                itemName: 'url',
                model: this.exc.url,
                required: true,
                rules: v => !!v || 'Is required'
              },
              price: {
                itemName: 'price',
                model: this.exc.price,
                rules: false
              },
              time: {
                itemName: 'time',
                model: this.exc.time,
                rules: false
              },
              groupSize: {
                itemName: 'groupSize',
                model: this.exc.groupSize,
                rules: false
              },
              type: {
                itemName: 'type',
                model: this.exc.type,
                rules: false
              }
            }
          },
          metaTags: {
            headerName: 'Мета теги',
            item: {
              h1: {
                itemName: 'h1',
                model: this.exc.h1,
                required: true,
                rules: v => !!v || 'Is required'
              },
              title: {
                itemName: 'title',
                model: this.exc.title,
                required: true,
                rules: v => !!v || 'Is required'
              },
              description: {
                itemName: 'description',
                model: this.exc.description,
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
                model: this.exc.detailText,
                required: false,
                textarea: true,
                rules: v => !!v || 'Is required'
              },
              included: {
                itemName: 'included',
                model: this.arrayToString('included'),
                required: false,
                textarea: true,
                rules: false
              },
              excluded: {
                itemName: 'excluded',
                model: this.arrayToString('excluded'),
                required: false,
                textarea: true,
                rules: false
              }
            }
          },
          section: {
            headerName: 'Раздел',
            item: {
              lang: {
                itemName: 'lang',
                model: this.exc.lang,
                required: true,
                select: true,
                disabled: false,
                items: [
                  {text: 'Английский', value: 'en'},
                  {text: 'Французккий', value: 'fr'},
                ],
                rules: v => !!v || 'Is required'
              },
              city: {
                itemName: 'city',
                model: this.exc.city,
                required: true,
                select: true,
                items: [],
                rules: v => !!v || 'Is required'
              }
            }
          }
        },
      }
    },
    created() {
      this.cities.forEach(a => {
        this.tabs.section.item.city.items.push({text: a.name, value: a.id, url: a.url})
      })
    },
    computed: {
      ...mapGetters({
        loading: 'shared/loading',
      })
    },
    methods: {
      arrayToString(name) {
        if(!this.exc[name]) return '';
        let str = '';
        this.exc[name].forEach((a, i, arr) => {
          str += i !== arr.length - 1 ? a + '\n' : a
        });
        return str
      },
      updatedExcursion() {
        let formData = new FormData();
        formData.append('previewImage', this.images.preview.image);
        formData.append('mainImage', this.images.main.image);
        this.images.galery.image.forEach(img => {
          formData.append('galery', img);
        })
        formData.append('city', this.tabs.section.item.city.model.url);
        formData.append('city_id', this.tabs.section.item.city.model.value);
        formData.append('detailText', this.tabs.detail.item.detailText.model);
        formData.append('included', this.tabs.detail.item.included.model);
        formData.append('excluded', this.tabs.detail.item.excluded.model);
        formData.append('groupSize', this.tabs.main.item.groupSize.model);
        formData.append('price', this.tabs.main.item.price.model);
        formData.append('time', this.tabs.main.item.time.model);
        formData.append('type', this.tabs.main.item.type.model);
        formData.append('title', this.tabs.metaTags.item.title.model);
        formData.append('description', this.tabs.metaTags.item.description.model);
        formData.append('h1', this.tabs.metaTags.item.h1.model);
        formData.append('url', this.tabs.main.item.url.model);
        formData.append('lang', this.tabs.section.item.lang.model.value);
        formData.append('name', this.tabs.main.item.name.model);

        this.$axios.post(`/admin/api/updateexcursion/${this.exc.id}`, formData)
          .then(res => {
            this.isSend = true;
            this.msg = res.data
          })
          .catch(e => {
            this.isSend = true;
            this.msg = e
          })
      },
      fileReader(file, name) {
        const reader = new FileReader();
        reader.onload = e => {
          this.images[name].src = reader.result
        };
        reader.readAsDataURL(file);
      },
      fileReaderGalery(file, name) {
        this.images.galery.src = [];
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
      },
      deleteExcursion() {
        let accept = confirm(`Удалить ${this.exc.name}?`);
        if (accept) {
          this.$axios.post(`/admin/api/deleteexcursion/${this.exc.id}`)
            .then(() => {
              console.log('deleted')
            })
            .catch(e => {
              throw e;
            })
        }
      }
    }
  }
</script>