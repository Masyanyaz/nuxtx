<template>
  <v-carousel next-icon=">" prev-icon="<" class="galery" hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item"
      height="400"

    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    props: ['items']
  }
</script>

<style lang="scss">
  .galery i {
    font-style: normal;
  }
</style>