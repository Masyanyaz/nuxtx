<template>
  <div>
    <v-card class="elevation-12" style="width: 270px;">
      <v-toolbar dark color="primary" class="d-flex justify-center">
        <v-toolbar-title>ONLINE ORDER FORM</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          validation
        >
          <v-text-field
            v-model="form.password"
            name="name"
            label="Name"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            name="email"
            label="Email"
            type="email"
          ></v-text-field>
          <v-textarea
            v-model="form.message"
            name="message"
            label="Message"
            type="text"
            rows="3"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions
        class="d-flex justify-center"
      >
        <v-btn
          width="200px"
          @click="onSubmit"
          :loading="loading"
          :disabled="!valid"
          color="primary"
        >Book now
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: '',
        },
        isError: false,
        errMsg: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
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

      }
    }
  }
</script>