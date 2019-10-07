<template>
  <v-card class="elevation-12 d-none d-md-block" style="width: 270px; max-height: 475px; height: auto;">
    <v-toolbar dark color="primary" class="d-flex pl-3">
      <v-toolbar-title style="font-size: 24px;">
        <span style="font-size: 14px;" class="mr-2">from</span>
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
          style="margin-top: 0"
          v-model="checkbox"
          :rules="[v => !!v || `${$t('Form.rules.accept')}`]"
          :label="$t('Form.accept')"
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
        width="150px"
        @click="onSubmit"
        :disabled="!valid"
        color="primary"
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
        isSend: false,
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
            this.isSend = true;
            this.msg = res.data
          })
          .catch(e => {
            this.isSend = true;
            this.msg = e
          })
      }
    }
  }
</script>