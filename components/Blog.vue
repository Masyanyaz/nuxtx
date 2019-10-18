<template>
  <div class="blue-block">
    <div class="container d-flex">
      <div class="bb-item pl-0 pr-0">
        <img src="http://116.203.132.142/wp-content/uploads/2019/01/ico_travelers_1.svg" alt="">
        <span>Excursions à la carte</span>
        <p>Toutes nos excursions sont individuelles. Nous n'organisons pas de grands groupes pré-formés avec des gens
          qui ne se connaissent pas.</p>
      </div>

      <div class="bb-item pr-3 pl-3">
        <img src="http://116.203.132.142/wp-content/uploads/2019/01/ico_maps_1.svg" alt="">
        <span>Économie du temps</span>
        <p>Notre guide vous donnera les informations nécessaires pour une meilleure compréhension de l'histoire russe !
          Il vous conseillera aussi de bonnes adresses où manger.</p>
      </div>

      <div class="bb-item pr-0 pl-0">
        <img src="http://116.203.132.142/wp-content/uploads/2019/01/ico_localguide_1.svg" alt="">
        <span>Immersion culturelle</span>
        <p>Profitez de la découverte de Saint-Pétersbourg en compagnie d’un guide locale, représentant de sa
          culture.</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Blog"
  }
</script>

<style scoped lang="scss">
  .blue-block {
    background: #4287f8;
    color: #fff;
    justify-content: space-between;

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