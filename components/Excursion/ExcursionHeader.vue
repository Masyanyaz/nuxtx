<!--<template>
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
</template>-->
<template>
    <div class="excursion-head">
        <div class="excursion-head-item">
            <v-icon class="exc-head">alarm</v-icon>
            <div class="excursion-head-item-cont">
                <span class="qqq">Duration</span>
                <span class="www">{{exc.time}} hours</span>
            </div>
        </div>
        <div class="excursion-head-item">
            <v-icon class="exc-head">group</v-icon>
            <div class="excursion-head-item-cont">
                <span class="qqq">Group Size</span>
                <span class="www">{{exc.groupSize}} peoples</span>
            </div>
        </div>
        <div class="excursion-head-item">
            <v-icon class="exc-head">language</v-icon>
            <div class="excursion-head-item-cont">
                <span class="qqq">Language</span>
                <span class="www">English</span>
            </div>
        </div>
        <div class="excursion-head-item">
            <v-icon class="exc-head">euro_symbol</v-icon>
            <div class="excursion-head-item-cont">
                <span class="qqq">Price</span>
                <span class="www">{{exc.price}} €</span>
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

    .excursion-head {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-top: 1px solid #D7DCE3;
        border-bottom: 1px solid #D7DCE3;

        &-item {
            display: flex;
            align-items: center;
            @media (max-width: 1000px) {
                width: 50%;
                margin-top: 20px;
            }

            &-cont {
                display: flex;
                flex-direction: column;
            }
        }

        @media (max-width: 1000px) {
            flex-wrap: wrap;
        }
    }

    .qqq {
        font-weight: bold;
    }

    .exc-head {
        margin-right: 15px;
    }
</style>
