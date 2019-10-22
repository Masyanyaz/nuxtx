<template>
  <v-container>
    <h1 class="d-flex justify-center mt-7 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      QUI SOMMES NOUS ?
    </h1>
    <div class="au-top">
      <div class="au-top-item">
        <img src="https://acmap.travelerwp.com/wp-content/uploads/2018/12/about_1.jpg">
        <span>Our Story</span>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, eaque veritatis. Nam nulla illum vero
          repellendus corporis facilis in cumque, quos consectetur? Repellat repudiandae cum dicta voluptatem blanditiis
          impedit minus!</p>
      </div>
      <div class="au-top-item">
        <img src="https://acmap.travelerwp.com/wp-content/uploads/2018/12/about_2.png">
        <span>Our mission</span>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, eaque veritatis. Nam nulla illum vero
          repellendus corporis facilis in cumque, quos consectetur? Repellat repudiandae cum dicta voluptatem blanditiis
          impedit minus!</p>
      </div>
    </div>

    <div class="card-line mt-7 mb-7">
      <div class="card" v-for="(item, i) in cardItems" :key="i">
        <div class="front">
          <h3>{{item.title}}</h3>
          <span>{{item.text}}</span>
        </div>
        <div class="back">
          <p>{{item.backText}}</p>
        </div>
      </div>
    </div>

    <div class="au-quote">
      <p>"Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus, quis mollis nisl nunc et massa. Nam
        dapibus nisl vitae elit fringilla rutrum."</p>
      <div class="au-quote-img">
        <img src="https://acmap.travelerwp.com/wp-content/uploads/2018/12/people_10.jpg" alt="">
        <span class="name">Adam Blin</span>
        <span class="pos">Founder</span>
      </div>
    </div>

    <h2 class="aaa mt-10 mb-5">
      Leadership Team
    </h2>

    <div class="au-wokers">
      <div class="au-wokers-item">
        <img src="https://acmap.travelerwp.com/wp-content/uploads/2018/12/people_3.jpg" alt="">
        <span class="name">Eva Hicks</span>
        <span class="pos">CEO</span>
      </div>
      <div class="au-wokers-item">
        <img src="https://acmap.travelerwp.com/wp-content/uploads/2018/12/people_3.jpg" alt="">
        <span class="name">Eva Hicks</span>
        <span class="pos">CEO</span>
      </div>
      <div class="au-wokers-item">
        <img src="https://acmap.travelerwp.com/wp-content/uploads/2018/12/people_3.jpg" alt="">
        <span class="name">Eva Hicks</span>
        <span class="pos">CEO</span>
      </div>
      <div class="au-wokers-item">
        <img src="https://acmap.travelerwp.com/wp-content/uploads/2018/12/people_3.jpg" alt="">
        <p class="name">Eva Hicks</p>
        <p class="pos">CEO</p>
      </div>

    </div>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        cardItems: [
          {
            title: '100+',
            text: 'partner',
            backText: '',
          },
          {
            title: '2k+',
            text: 'properties',
            backText: '',
          },
          {
            title: '300+',
            text: 'destinations',
            backText: '',
          },
          {
            title: '40k+',
            text: 'booking',
            backText: '',
          }
        ]
      }
    },
    head() {
      return {
        title: this.$t('index.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('index.description')}
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .au-top {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }

  .au-top-item {
    width: 48%;
    display: flex;
    flex-direction: column;
  }

  .au-top-item > img {
    width: auto;
    margin-bottom: 35px;
  }

  .au-top-item > span {
    font-size: 24px;
    color: #5191FA;
    margin-bottom: 20px;
  }

  .au-top-item > p {
    font-size: 16px;
    color: #768092;
    line-height: 24px;
  }

  .card-line {
    display: flex;
    position: relative;
  }

  .card {
    transform: translate (-50%, -50%);
    transform-style: preserve-3d;
    transition: 1s;
    text-align: center;
    position: relative;
    width: 23%;
    box-sizing: border-box;
    min-height: 200px;
    margin: 10px;
  }

  .card .front {
    position: absolute;
    transform: rotateY(0deg);
    transition: all 0.5s;
    backface-visibility: hidden;
    border: 5px solid #5191FA;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  /*.card:hover .front {
    transform: rotateY(-180deg);
  }*/

  .card .back {
    position: absolute;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    transition: all 0.5s;
    background: #5191FA;
    height: 100%;
    border: 5px solid #5191FA;
    box-sizing: border-box;
  }

  /*.card:hover .back {
    transform: rotateX(0deg);
  }*/

  .front > h3 {
    margin-top: 0;
    font-size: 36px;
    color: #1A2B48;
    font-weight: 500;
  }

  .fron > p {
    font-size: 16px;
    color: #1A2B48;
    font-weight: 500
  }

  .back > p {
    margin-bottom: 0px;
    font-size: 14px;
    color: #fff;
    text-align: left;
    margin: 20px;
  }

  .au-quote, .au-quote-img {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .au-quote > p {
    width: 75%;
    text-align: center;
    font-size: 20px;
    color: #1A2B48;
    letter-spacing: 0;
    line-height: 40px;
    font-weight: 300;
    margin-bottom: 40px;
  }

  .au-quote-img > img {
    margin-bottom: 10px;
    max-width: 80px;
    height: auto;
  }

  .au-quote-img .name {
    font-size: 14px;
    color: #1A2B48;
    margin-bottom: 0;
  }

  .au-quote-img .pos {
    font-size: 14px;
    color: #768092;
    margin-bottom: 0;
  }

  .aaa {
    text-align: center;
    font-size: 28px;
    color: #1A2B48;
    margin-bottom: 20px;
  }

  .au-wokers {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(23%, 1fr));
  }


  .au-wokers-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }

  .au-wokers-item > img {
    width: 100%;
    max-width: 240px;
  }

  .au-wokers-item .name {
    font-size: 14px;
    color: #1A2B48;
    margin-top: 10px;
    margin-bottom: 0px;
  }

  .au-wokers-item .pos {
    font-size: 14px;
    color: #768092;
    margin-bottom: 0px;
  }


  @media (max-width: 1000px) {
    .au-top {
      flex-direction: column;
    }

    .au-top-item {
      width: 99%;
      margin-bottom: 40px;
    }

    .au-top-item > img {
      width: 100%;

    }

    .card-line {
      flex-wrap: wrap;
    }
    .card {
      width: 47%;
    }

    .au-wokers {
      grid-template-columns: repeat(auto-fit, minmax(49%, 1fr));
    }
  }

  @media (max-width: 768px) {
    .card {
      width: 99%;
    }
  }
</style>