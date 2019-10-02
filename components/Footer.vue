<template>

  <div class="footer">
    <div class="footer-item">
      <span class="footer-top-element">Need help?</span>
      <span class="footer-top-element-border"/>
      <div class="footer-social-elements">
        <span class="footer-social-elements-small">Call Us</span>
        <span class="footer-social-elements-bold">+00222445678</span>
      </div>
      <div class="footer-social-elements">
        <span class="footer-social-elements-small">Email for Us</span>
        <span class="footer-social-elements-bold">hello@yoursite.com</span>
      </div>
      <div class="footer-social-elements">
        <span class="footer-social-elements-small">Follow Us</span>
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
      <span class="footer-top-element">Company</span>
      <span class="footer-top-element-border"/>
      <div class="footer-item-list">

        <span>About Us</span>
        <span>Community Blog</span>
        <span>Meet the Team</span>

      </div>
    </div>
    <div class="footer-item">
      <span class="footer-top-element">Support</span>
      <span class="footer-top-element-border"/>
      <div class="footer-item-list">
        <span>Contact</span>
        <span>Legal</span>
        <span>Privacy Policy</span>
      </div>
    </div>
    <div class="footer-item">
      <span class="footer-top-element">Settings</span>
      <span class="footer-top-element-border"/>
      <div class="footer-item-list">
        <span>Language</span>
          <div class="footer-select">
            <v-btn
              text
              to="/en"
              @click="switchLanguage"
            >
              English
            </v-btn>
            <v-btn
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
</template>

<script>
  export default {
    methods: {
      switchLanguage () {
        setTimeout(() => {
          this.$store.state.locale = 'fr'
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
    margin-top: 50px;
    margin-left: 10%;

    &-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      &-list {
        display: flex;
        flex-direction: column;
        padding-top: 20px;

        span {
          margin-bottom: 10px;
          font-size: 13px;
        }
      }
    }

    &-top-element {
      display: block;
      padding-bottom: 20px;

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
      border-left: 2px solid #5191fa;
      padding-left: 10px;

      &-small {
        font-size: 12px;
      }

      &-bold {
        font-size: 20px;
        color: #000;
      }
    }

    &-select {
      display: flex;
      flex-direction: column;
    }
  }


</style>