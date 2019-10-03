<template>
  <v-carousel>
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

<style lang="scss" scoped>

</style>