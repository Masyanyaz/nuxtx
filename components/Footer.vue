<template>
  <div>
    <div class="footer container">
      <div class="footer-item">
        <span class="footer-top-element">Нужна помощь?</span>
        <span class="footer-top-element-border"/>
        <div class="footer-social-elements">
          <span class="footer-social-elements-small">Позвоните нам</span>
          <span class="footer-social-elements-bold">+00222445678</span>
        </div>
        <div class="footer-social-elements">
          <span class="footer-social-elements-small">Напишите нам</span>
          <span class="footer-social-elements-bold">hello@yoursite.com</span>
        </div>
        <div class="footer-social-elements">
          <span class="footer-social-elements-small">Следуйте за нами</span>
          <div>
            <img class="alignnone wp-image-7794 size-full"
                 src="https://travelhotel.wpengine.com/wp-content/uploads/2018/12/ico_facebook_footer.png" alt=""
                 width="21" height="25" style="margin-right:10px; ">
            <img class="alignnone wp-image-7795 size-full"
                 src="https://travelhotel.wpengine.com/wp-content/uploads/2018/12/ico_twitter_footer.png" alt=""
                 width="32" height="24" style="margin-right:10px;">
            <img class="alignnone wp-image-7796 size-full"
                 src="https://travelhotel.wpengine.com/wp-content/uploads/2018/12/ico_instagram_footer.png" alt=""
                 width="24" height="22">
          </div>
        </div>
      </div>
      <div class="footer-item">
        <span class="footer-top-element">Компания</span>
        <span class="footer-top-element-border"/>
        <div class="footer-item-list">

          <span>О нас</span>
          <span>Команда</span>
          <span>Блог</span>

        </div>
      </div>
      <div class="footer-item">
        <span class="footer-top-element">Поддержка</span>
        <span class="footer-top-element-border"/>
        <div class="footer-item-list">
          <span>Контакты</span>
          <span>Юр инфо</span>
          <span>Политика конфиденциальности</span>
        </div>
      </div>
      <div class="footer-item">
        <span class="footer-top-element">Настройки</span>
        <span class="footer-top-element-border"/>
        <div class="footer-item-list">
          <span>Язык</span>
          <div class="footer-select">
            <!--            <v-btn-->
            <!--              text-->
            <!--              to="/en"-->
            <!--              @click="switchLanguage"-->
            <!--            >-->
            <!--              English-->
            <!--            </v-btn>-->
            <v-btn
              class="pl-0 pr-0"
              text
              to="/fr"
              @click="switchLanguage"
            >
              Français
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <footer style="border-top: 1px solid #EAEEF3;" class="container">
      <div class="d-flex justify-space-between align-center" style="padding: 0 7%;">
        <div>
          Copyright © 2019 by
        </div>
        <div>
          <img src="/image/footer/1.svg" alt="">
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    methods: {
      switchLanguage() {
        setTimeout(() => {
          location.reload();
        }, 1000)
      }
    },
    name: "Footer"
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0;
    padding-right: 0;
    padding-left: 0;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 0 7%;
    margin: 50px 0;
    flex-wrap: wrap;

    @media(max-width: 600px) {
      width: 90%;
    }

    &-item {
      display: flex;
      flex-direction: column;

      &-list {
        display: flex;
        flex-direction: column;
        padding-top: 20px;

        span {
          margin-bottom: 25px;
          font-size: 16px;
        }
      }
    }

    &-top-element {
      display: block;
      padding-bottom: 20px;
      text-transform: uppercase;
      font-size: 16px;

      &-border {
        width: 30%;
        border-bottom: 1px solid #ebebeb;
        display: block;
      }
    }

    &-social-elements {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      border-left: 3px solid #5191fa;
      padding-left: 15px;
      margin-bottom: 15px;

      &-small {
        font-size: 14px;
      }

      &-bold {
        font-size: 22px;
        color: #000;
      }
    }

    &-select {
      display: flex;
      flex-direction: column;
    }
  }


</style>