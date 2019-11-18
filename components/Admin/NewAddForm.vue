<template>
  <v-layout>
    <v-flex xs12 lg10 offset-lg1>
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
            v-for="(name, index) in headerNames"
            :key="index"
          >
            {{ name }}
          </v-tab>
          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="(item, index) in tabItems"
              :key="index"
            >
              <v-card
                flat
                tile
                v-for="(i, index) in item"
                :key="index"
                class="pl-3 pr-3"
              >
                <v-select
                  v-if="i.select"
                  :label="i.label"
                  :required="i.required"
                  :disabled="i.disabled"
                  v-model="i.model"
                  :rules="[i.rules]"
                  :items="i.items"
                  :name="i.itemName"
                  :multiple="i.multiple"
                  return-object
                ></v-select>
                <v-textarea
                  v-else-if="i.textarea"
                  v-model="i.model"
                  :rules="[i.rules]"
                  :name="i.itemName"
                  :label="i.label"
                  multi-line
                  type="text"
                ></v-textarea>
                <v-checkbox
                  v-else-if="i.checkbox"
                  v-model="i.model"
                  :name="i.itemName"
                  :label="i.label"
                ></v-checkbox>
                <v-text-field
                  v-else
                  :rules="[i.rules]"
                  v-model="i.model"
                  :required="i.required"
                  :name="i.itemName"
                  :label="i.label"
                  type="text"
                ></v-text-field>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-form>
      <v-layout mb-3>
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
      <v-layout v-if="images.previewImage.src">
        <v-flex xs12>
          <img
            height="100px"
            :src="images.previewImage.src">
        </v-flex>
      </v-layout>
      <v-layout mb-3>
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
      <v-layout v-if="images.mainImage.src">
        <v-flex xs12>
          <img
            height="100px"
            :src="images.mainImage.src">
        </v-flex>
      </v-layout>

      <v-layout mb-3>
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
      <v-layout v-if="images.galery.src">
        <v-flex xs12>
          <img
            class="mr-3"
            v-for="(img, i) in images.galery.src"
            :key="i"
            height="100px"
            :src="img">
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="!valid || !images.previewImage.image || !images.mainImage.image || loading"
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
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['headerNames', 'tabItems', 'createAd'],
    data() {
      return {
        valid: false,
        tab: null,
      }
    },
    computed: {
      images: {
        get() {
          return this.$store.getters['admin/images/images']
        },
        set(value) {
          this.$store.commit('admin/images/updateImages', value)
        }
      },
      ...mapGetters({
        loading: 'shared/loading',
        error: 'shared/error'
      })
    },
    methods: {
      onFileChange(event) {
        const target = event.target.name;
        const files = event.target.files;

        if (files.length === 0) return;

        this.$store.dispatch('admin/images/onFileChange', {target, files})

      }
    }
  }
</script>