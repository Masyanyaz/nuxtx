<template>
  <div class="blue-block">
    <div class="container d-flex">
      <div class="bb-item"
           :class="i === 1 ? 'px-3' : 'px-0'"
           v-for="(item,i) in items"
           :key="i"
      >
        <img v-lazy="item.img" alt="">
        <span>{{item.title}}</span>
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            img: '/svg/ico_travelers_1.svg',
            title: 'Excursions à la carte',
            text: 'Toutes nos excursions sont individuelles. Nous n\'organisons pas de grands groupes pré-formés avec des gens qui ne se connaissent pas.'
          },
          {
            img: '/svg/ico_maps_1.svg',
            title: 'Économie du temps',
            text: 'Notre guide vous donnera les informations nécessaires pour une meilleure compréhension de l\'histoire russe! Il vous conseillera aussi de bonnes adresses où manger.'
          },
          {
            img: '/svg/ico_localguide_1.svg',
            title: 'Immersion culturelle',
            text: 'Profitez de la découverte de Saint-Pétersbourg en compagnie d’un guide locale, représentant de sa culture.'
          }
        ]
      }
    },
    name: "Blog"
  }
</script>

<style scoped lang="scss">
  .blue-block {
    background: #4287f8;
    color: #fff;

    .container {
      @media (max-width: 960px) {
        flex-direction: column;
      }

      .bb-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;

        span {
          font-size: 22px;
          margin-top: 20px;
          text-align: center;
          font-weight: bold;
        }

        p {
          margin: 20px 0;
          text-align: center;
        }
      }
    }
  }

</style>