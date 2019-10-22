<template>
  <v-layout row>
    <input type="text" v-model="test2">
   {{test}}
   {{test2}}
  </v-layout>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['images', 'tabs', 'test'],
    data() {
      return {
        valid: false,
        tab: null,
        test2: this.test
      }
    },
    watch: {

    },
    computed: {
      ...mapGetters({
        loading: 'shared/loading',
        error: 'shared/error',
      })
    },
    methods: {
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
          if (file.length === 0) return;

          for (let i = 0; i < file.length; i++) {
            this.fileReaderGalery(file[i], 'galery')
            this.images.galery.image.push(file[i]);
          }
        }
      }
    },
    name: "NewAddForm"
  }
</script>

<style scoped>

</style>