<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <div class="d-flex wrap" style="max-width: 600px;">
          <div class="d-flex align-center justify-center">
            <v-icon left class="fill-height mr-1">alarm</v-icon>
            <div class="d-flex" style="flex-direction: column">
              <b>Duration</b>
              <span>{{ad.time}} hours</span>
            </div>
          </div>
          <div class="d-flex align-center justify-center">
            <v-icon right class="fill-height mr-1">alarm</v-icon>
            <div class="d-flex" style="flex-direction: column">
              <b>Cancellation</b>
              <span>4 hours</span>
            </div>
          </div>
          <div class="d-flex align-center justify-center">
            <v-icon right class="fill-height mr-1">group</v-icon>
            <div class="d-flex" style="flex-direction: column">
              <b>Group Size</b>
              <span>{{ad.groupSize}} peoples</span>
            </div>
          </div>
          <div class="d-flex align-center justify-center">
            <v-icon right class="fill-height mr-1">alarm</v-icon>
            <div class="d-flex" style="flex-direction: column">
              <b>Price</b>
              <span>{{ad.price}} €</span>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['ad']
  }
</script>
