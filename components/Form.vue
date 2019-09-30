<template>
  <v-card class="elevation-12" style="width: 270px; max-height: 450px;">
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
          v-model="form.name"
          :rules="[v => !!v || 'Name is required']"
          name="name"
          label="Name"
          type="text"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          name="email"
          label="Email"
          type="email"
          required
        ></v-text-field>
        <v-textarea
          v-model="form.message"
          name="message"
          label="Message"
          type="text"
          rows="3"
        ></v-textarea>
        <v-checkbox
          style="margin-top: 0"
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
        <div
          v-if="isSend"
        >
          {{msg}}
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions
      class="d-flex justify-center"
    >
      <v-btn
        width="200px"
        @click="onSubmit"
        :disabled="!valid"
        color="primary"
      >Book now
      </v-btn>
    </v-card-actions>
  </v-card>
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
        isSend: false,
        msg: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
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
            this.isSend = true;
            this.msg = res.data
          })
          .catch(e => {
            this.isSend = true;
            this.msg = e
          })
        // form.submit()
      }
    }
  }
</script>