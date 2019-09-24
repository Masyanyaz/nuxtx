<template>
  <div class="d-flex" style="max-width: 600px; flex-wrap: wrap">
    <div class="d-flex header-first">
      <div class="d-flex align-center justify-center">
        <v-icon class="fill-height mr-2">alarm</v-icon>
        <div class="d-flex mr-4" style="flex-direction: column; width: 80px;">
          <b>Duration</b>
          <span>{{exc.time}} hours</span>
        </div>
      </div>
      <div class="d-flex align-center justify-center">
        <v-icon class="fill-height mr-2">group</v-icon>
        <div class="d-flex mr-4" style="flex-direction: column; width: 80px;">
          <b>Group Size</b>
          <span>{{exc.groupSize}} peoples</span>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="d-flex align-center justify-center">
        <v-icon class="fill-height mr-2">language</v-icon>
        <div class="d-flex mr-4" style="flex-direction: column; width: 80px;">
          <b>Language</b>
          <span>English</span>
        </div>
      </div>
      <div class="d-flex align-center justify-center">
        <v-icon class="fill-height mr-2">euro_symbol</v-icon>
        <div class="d-flex mr-4" style="flex-direction: column; width: 80px;">
          <b>Price</b>
          <span>{{exc.price}} €</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['exc']
  }
</script>

<style scoped lang="scss">
  .header-first {
    @media (max-width: 604px) {
      margin-bottom: 15px;
    }
  }
</style>
