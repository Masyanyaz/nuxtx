<template>
  <div>
    <div class="footer container">
      <div class="footer-item">
        <span class="footer-top-element">{{$t('Footer.needHelp.title')}}</span>
        <div class="footer-social-elements">
          <span class="footer-social-elements-small">{{$t('Footer.needHelp.phone.title')}}</span>
          <a class="footer-social-elements-bold" :href="`tel:${$t('Footer.needHelp.phone.number')}`">{{$t('Footer.needHelp.phone.number')}}</a>
        </div>
        <div class="footer-social-elements">
          <span class="footer-social-elements-small">{{$t('Footer.needHelp.email.title')}}</span>
          <a class="footer-social-elements-bold" :href="`mailto:${$t('Footer.needHelp.email.email')}`">{{$t('Footer.needHelp.email.email')}}</a>
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
                class="mr-3"
              >
            </a>
          </div>
        </div>
      </div>
      <div class="footer-item"
           v-for="(item, i) in menuItems"
           :key="i">
        <span class="footer-top-element">{{item.title}}</span>
        <div class="footer-item-list">
          <nuxt-link
            v-for="(link, i) in item.links"
            :key="i"
            :to="$i18n.path(link.url)"
            class="mb-6"
          >
            {{link.title}}
          </nuxt-link>
        </div>
      </div>
      <div class="footer-item">
        <span class="footer-top-element">{{$t('Footer.setting')}}</span>
        <div class="footer-item-list">
          <span>{{$t('commonWords.languages.title')}}</span>
          <div class="footer-select">
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
    <footer style="border-top: 1px solid #EAEEF3;">
      <div class="d-flex justify-space-between align-center copyright container py-4">
        <div class="text-center">
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
        paySrc: '/image/footer/1.svg',
        menuItems: [
          {
            title: this.$t('Footer.company.title'),
            links: [
              {
                url: this.$t('Links.about.url'),
                title: this.$t('Links.about.title'),
              },
              {
                url: this.$t('Links.team.url'),
                title: this.$t('Links.team.title'),
              },
              {
                url: this.$t('Links.blog.url'),
                title: this.$t('Links.blog.title'),
              }
            ]
          },
          {
            title: this.$t('Footer.support.title'),
            links: [
              {
                url: this.$t('Links.contact.url'),
                title: this.$t('Links.contact.title'),
              },
              {
                url: this.$t('Links.legal.url'),
                title: this.$t('Links.legal.title'),
              },
              {
                url: this.$t('Links.cookies.url'),
                title: this.$t('Links.cookies.title'),
              },
              {
                url: this.$t('Links.privacy.url'),
                title: this.$t('Links.privacy.title'),
              }
            ]
          }
        ]
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

        a {
          text-decoration: none;
          color: inherit;
        }
      }
    }

    &-top-element {
      display: block;
      text-transform: uppercase;
      font-weight: bold;

      &::after {
        margin-top: 20px;
        content: '';
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
        font-size: calc(15px + 2 * ((100vw) / 500));
        color: #000;
        text-decoration: none;
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