<template>
  <div>
    <v-container class="mt-10">
      <v-layout>
        <v-flex>
          <div class="contacts-page">
            <div class="cp-left">
              <h3>
                Nous aimerions recevoir de vos nouvelles
              </h3>
              <p>
                Envoyez nous un message. Nous vous répondrons le plus rapidement possible
              </p>
              <div class="cp-line"></div>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  validation
                >
                  <v-text-field
                    outlined
                    v-model="form.name"
                    :rules="[v => !!v || `${$t('Form.rules.name')}`]"
                    name="name"
                    :label="$t('Form.name')"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="form.email"
                    :rules="emailRules"
                    name="email"
                    :label="$t('Form.email')"
                    type="email"
                    required
                  ></v-text-field>
                  <v-textarea
                    outlined
                    v-model="form.message"
                    name="message"
                    :label="$t('Form.message')"
                    type="text"
                    rows="4"
                  ></v-textarea>
                  <v-checkbox
                    class="mt-0"
                    v-model="checkbox"
                    :rules="[v => !!v || `${$t('Form.rules.accept')}`]"
                    :label="$t('Form.accept')"
                    required
                    :messages="msg"
                  ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions
                class="d-flex justify-center"
              >
                <v-btn
                  style="font-size: 14px; color: #ffffff"
                  class="mb-5"
                  width="220px"
                  @click="onSubmit"
                  :disabled="!valid"
                  color="#5191FA"
                >
                  CONTACTEZ-NOUS
                </v-btn>
              </v-card-actions>
            </div>
            <div class="cp-right">
              <div class="bg"><img src="https://acmap.travelerwp.com/wp-content/uploads/2018/12/bg-contact-1.jpg"
                                   alt="">
              </div>
              <div class="orange-box">
                <h3>Traveler Ltd</h3>
                <p>Tell: +33 (0) 1 84 88 33 57</p>
                <p>Email: contact@russieautrement.com</p>
                <p class="cp-adress">
                  Bureau 1
                  Quai de la Moika, 67-69
                  Saint-Pétersbourg, Russie
                  191186
                </p>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7995.637412967884!2d30.3159477!3d59.9336463!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x76d6b2ef83b3d0d1!2sRussie%20Autrement!5e0!3m2!1sru!2sru!4v1568968823323!5m2!1sru!2sru"
      width="100%" height="500" frameborder="0" style="border:0;" allowfullscreen="">
    </iframe>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkbox: false,
        form: {
          name: '',
          email: '',
          message: '',
        },
        msg: '',
        valid: false,
        emailRules: [
          v => !!v || `${this.$t('Form.rules.email.req')}`,
          v => /.+@.+/.test(v) || `${this.$t('Form.rules.email.valid')}`
        ],
      }
    },
    methods: {
      onSubmit() {
        this.$axios.post('/send', {
          name: this.form.name,
          email: this.form.email,
          message: this.form.message,
        })
          .then(res => {
            this.msg = res.data
          })
          .catch(e => {
            this.msg = e
          })
      }
    },
    head() {
      return {
        title: this.$t('contact.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('contact.description')}
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .contacts-page {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
  }

  .contacts-page > div {
    width: 40%;
  }


  .cp-left > h3 {
    font-size: 24px;
    color: #1A2B48;
    margin-top: 0;
  }

  .cp-left > p {
    font-size: 14px;
    color: #5E6D77;
    margin-bottom: 0
  }

  .cp-line {
    border: 1px solid #DAE1E7;
    margin: 30px 0 30px;
  }

  .cp-form {
    display: flex;
    flex-direction: column;
  }

  .cp-form > input, .cp-form > textarea {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 2px;
    border: 1px solid #DAE1E7;
    font-family: 'Poppins', sans-serif;
  }

  .cp-button {
    background: #5191FA;
    border-radius: 3px;
    border: none;
    color: #fff;
    margin-top: 20px;
    padding-left: 35px;
    padding-right: 35px;
    width: 30%;
    text-transform: uppercase;
  }

  .cp-right {
    position: relative;
    display: flex;
    justify-content: flex-end;
  }


  .bg > img {
    display: block;
    height: auto;
  }

  .orange-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: #FA5636;
    padding: 30px;
    max-width: 385px;
    min-height: 320px;
    color: #fff;
    position: absolute;
    top: 50%;
    margin-top: -240px;
    margin-left: -130px;
  }

  .orange-box > h3 {
    margin-bottom: auto;
  }

  .orange-box > p {
    margin: 5px 0;
    word-break: break-word;
  }


  .cp-adress {
    font-size: 14px;
    margin-top: 10px !important;
  }

  @media (max-width: 1000px) {
    .contacts-page {
      flex-direction: column;
    }

    .contacts-page > div {
      width: 99%
    }
    .cp-right {
      justify-content: start;
    }

    .bg {
      display: none;
      visibility: hidden;
    }
    .orange-box {
      position: unset;
      top: 0;
      margin: 0;
      width: 99%;
      height: auto;
      max-width: unset;
    }

    .cp-button {
      min-width: 150px;
    }
  }
</style>