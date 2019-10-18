<template>
  <div>
    <div class="footer container">
      <div class="footer-item">
        <span class="footer-top-element">{{$t('Footer.needHelp.title')}}</span>
        <span class="footer-top-element-border"/>
        <div class="footer-social-elements">
          <span class="footer-social-elements-small">{{$t('Footer.needHelp.phone.title')}}</span>
          <span class="footer-social-elements-bold">{{$t('Footer.needHelp.phone.number')}}</span>
        </div>
        <div class="footer-social-elements">
          <span class="footer-social-elements-small">{{$t('Footer.needHelp.email.title')}}</span>
          <span class="footer-social-elements-bold">{{$t('Footer.needHelp.email.email')}}</span>
        </div>
        <div class="footer-social-elements">
          <span class="footer-social-elements-small">{{$t('Footer.needHelp.social')}}</span>
          <div>
            <a
              v-for="(src, i) in socials"
              :href="src.href"
              :key="i"
              target="_blank"
            >
              <img
                v-lazy="src.src"
                alt=""
                style="margin-right:10px; ">
            </a>
          </div>
        </div>
      </div>
      <div class="footer-item">
        <span class="footer-top-element">{{$t('Footer.company.title')}}</span>
        <span class="footer-top-element-border"/>
        <div class="footer-item-list">

          <span>{{$t('Footer.company.about.title')}}</span>
          <span>{{$t('Footer.company.team.title')}}</span>
          <span>{{$t('Footer.company.blog.title')}}</span>

        </div>
      </div>
      <div class="footer-item">
        <span class="footer-top-element">{{$t('Footer.support.title')}}</span>
        <span class="footer-top-element-border"/>
        <div class="footer-item-list">
          <span>
            <nuxt-link
              :to="$i18n.path(`contacts`)"
              style="text-decoration: none; color: inherit;"
            >
              {{$t('Footer.support.contact.title')}}
            </nuxt-link>
          </span>
          <span>{{$t('Footer.support.legal.title')}}</span>
          <span>
            <nuxt-link
              :to="$i18n.path(`cookies`)"
              style="text-decoration: none; color: inherit;"
            >
              {{$t('Footer.support.cookies.title')}}
            </nuxt-link>
          </span>
          <span>
            <nuxt-link
              :to="$i18n.path(`politique-de-confidentialite`)"
              style="text-decoration: none; color: inherit;"
            >
              {{$t('Footer.support.privacy.title')}}
            </nuxt-link>
          </span>
        </div>
      </div>
      <div class="footer-item">
        <span class="footer-top-element">{{$t('Footer.setting')}}</span>
        <span class="footer-top-element-border"/>
        <div class="footer-item-list">
          <span>{{$t('commonWords.languages.title')}}</span>
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
              {{$t('commonWords.languages.fr')}}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <footer style="border-top: 1px solid #EAEEF3;" class="container">
      <div class="d-flex justify-space-between align-center copyright">
        <div>
          Copyright © 2019 by Russie Autrement
        </div>
        <div class="d-flex justify-space-between align-center">
          <img v-lazy="paySrc" alt="">
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        socials: [
          {src: '/image/footer/ico_facebook_footer.png', href: 'https://www.facebook.com/Russieautrement/'},
          {src: '/image/footer/ico_instagram_footer.png', href: 'https://www.instagram.com/russieautrement/'},
          {src: '/image/footer/ico_twitter_footer.png', href: 'https://twitter.com/Russie_A_Ltd/'}
        ],
        paySrc: '/image/footer/1.svg'
      }
    },
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
  .footer {
    display: flex;
    justify-content: space-between;
    margin: 50px auto;
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

          a {
            text-decoration: none;
            color: inherit;
          }
        }
      }
    }

    &-top-element {
      display: block;
      padding-bottom: 20px;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: bold;

      &-border {
        width: 100px;
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
        font-size: calc(16px + 2 * ((100vw) / 500));
        color: #000;
      }
    }

    &-select {
      display: flex;
      flex-direction: column;
    }
  }

  .copyright {
    div {
      @media(max-width: 660px) {
        margin-bottom: 15px;
      }
    }
    @media(max-width: 660px) {
      flex-direction: column;
    }
  }


</style>