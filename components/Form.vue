<template>
  <v-card class="d-none d-md-block" style="width: 270px; height: auto; border: 1px solid #D7DCE3;
  box-shadow: none; border-radius: 0 0 5px 5px">
    <v-toolbar dark color="#5191FA" class="d-flex pl-2" style="box-shadow: none;">
      <v-toolbar-title style="font-size: 24px;">
        <span style="font-size: 14px;" class="mr-2">{{$t('commonWords.from')}}</span>
        €{{exc.price}}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        validation
      >
        <v-text-field
          v-model="form.name"
          :rules="[v => !!v || `${$t('Form.rules.name')}`]"
          name="name"
          :label="$t('Form.name')"
          type="text"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          name="email"
          :label="$t('Form.email')"
          type="email"
          required
        ></v-text-field>
        <v-textarea
          v-model="form.message"
          name="message"
          :label="$t('Form.message')"
          type="text"
          rows="3"
        ></v-textarea>
        <v-checkbox
          class="mt-0 checkbox"
          v-model="checkbox"
          :rules="[v => !!v || `${$t('Form.rules.accept')}`]"
          :label="$t('Form.accept')"
          required
          :messages="msg"
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions
      class="d-flex justify-center mb-4"
    >
      <v-btn
        height="40px"
        style="font-size: 14px; color: #ffffff;"
        width="220px"
        @click="onSubmit"
        :disabled="!valid"
        color="#5191FA"
      >{{$t('Form.send')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['exc'],
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
            this.msg = res.data
          })
          .catch(e => {
            this.msg = e
          })
      }
    }
  }
</script>

<style lang="scss">
  .checkbox label {
    font-size: 12px;
  }
</style>