<template>
  <v-container grid-list-lg class="fill-height d-flex align-center justify-center">
    <v-layout wrap class="rev-line">
      <v-flex
        xs12
        sm6
        md4
        lg4
        xl4
        v-for="(item, i) in items"
        :key="i"
        class="d-flex"
      >
        <v-card class="rev-item">
          <div class="author">
            <img v-lazy="item.imgSrc" alt="">
            <div class="author-meta">
              <span>{{item.name}}</span>
              <div class="star">
                <div class="rev-star" v-for="star in item.rating"></div>
              </div>
            </div>
          </div>
          <p>{{item.text}}</p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            name: 'François',
            imgSrc: '/image/reviews/franсois-michel.jpg',
            rating: 5,
            text: 'Notre séjour dans votre sublime ville a été extraordinaire et ce entre autres grâce aux différentes visites avec Ludmilla. Celle-ci a répondu à toutes nos attentes et a été une guide parfaite et passionnée.'
          },
          {
            name: 'Hervé',
            imgSrc: '/image/reviews/herve.jpg',
            rating: 5,
            text: 'Je viens vous dire tout le plaisir que nous avons eu à visiter le Palais de l\'Ermitage en compagnie de notre guide Natalia. Elle a été à la hauteur de nos espérances, tout était parfait.'
          },
          {
            name: 'Odile',
            imgSrc: '/image/reviews/odile.jpg',
            rating: 5,
            text: 'Nous sommes de retour à Toulouse et gardons de belles images dans la tête. Macha a été particulièrement intéressante, motivée et d\'une grande gentillesse et disponibilité pour nous accompagner.'
          }
        ]
      }
    },
    name: "Reviews"
  }
</script>

<style scoped lang="scss">
  .rev-line {

    /*@media (max-width: 960px) {*/
    /*  flex-direction: column;*/
    /*  margin: 0 auto;*/
    /*}*/

    .rev-item {
      border: 1px solid #D7DCE3;
      border-radius: 3px;
      background: url(http://116.203.132.142/wp-content/themes/traveler/v2/images/qoute_icon.png) top 30px right 30px no-repeat;
      box-sizing: border-box;
      padding: 12px;

      .author {
        display: flex;
        align-items: center;

        img {
          margin-right: 20px;
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }

        &-meta {
          span {
            font-size: 18px;
            margin-bottom: 8px;
            color: #000000;
          }

          .star {
            display: flex;

            .rev-star {
              color: #FFDC00;
              font-size: 16px;
              margin-right: 2px;

              &::before {
                content: "\2605";
              }
            }
          }
        }

      }

      p {
        margin-top: 10px;
        font-size: 14px;
        color: #768092;
        margin-bottom: 0;
      }
    }
  }
</style>