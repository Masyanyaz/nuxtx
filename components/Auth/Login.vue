<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              validation
            >
              <v-text-field
                prepend-icon="person"
                v-model="account.email"
                :rules="emailRules"
                name="email"
                label="Email"
                type="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                v-model="account.password"
                :rules="passwordRules"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
              color="primary"
            >Login
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert v-if="isError" type="error">
          {{errMsg}}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import AlertErrorMsg from '@/components/AlertErrorMsg'

  export default {
    data() {
      return {
        account: {
          email: '',
          password: '',
        },
        isError: false,
        errMsg: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be equal or more than ' + this.account.password.length + '/6 characters'
        ]
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('user/loginUser', this.account)
            .then(() => {
              this.$router.push('/')
            })
            .catch((error) => {
              this.isError = true;
              this.errMsg = error.code;

              setTimeout(() => {
                this.isError = false
              }, 3000)
            })
        }
      }
    },
    created() {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('shared/setError', 'Please log in to access this page.')
      }
    },
    components: {
      // AlertErrorMsg
    }
  }
</script>