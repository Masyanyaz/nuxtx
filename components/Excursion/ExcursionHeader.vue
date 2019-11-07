<template>
  <div class="header">
    <div class="excursion-head">
      <div class="excursion-head-item"
           v-for="(item, i) in items"
           :key="i">
        <img v-lazy="item.img"
             alt=""
             class="mr-2">
        <div>
          <div class="font-weight-bold">{{item.title}}</div>
          <div>{{item.value}} {{item.valueLang}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    props: ['exc'],
    data (){
      return {
        items: [
          {
            img: '/svg/duration.svg',
            title: this.$t('commonWords.duration.title'),
            value: this.exc.time,
            valueLang: this.exc.time === '1' ? this.$t('commonWords.duration.hour') : this.$t('commonWords.duration.hours')
          },
          {
            img: '/svg/groupSize.svg',
            title: this.$t('commonWords.groupSize.title'),
            value: this.exc.groupSize,
            valueLang: this.$t('commonWords.groupSize.persons')
          },
          {
            img: '/svg/language.svg',
            title: this.$t('commonWords.languages.title'),
            value: '',
            valueLang: this.$t('commonWords.languages.fr')
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    border-top: 1px solid #D7DCE3;
    border-bottom: 1px solid #D7DCE3;

    .excursion-head {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      width: 100%;
      max-width: 600px;
      flex-wrap: wrap;

      &-item {
        display: flex;
        align-items: center;

        @media (max-width: 600px) {
          width: 50%;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
