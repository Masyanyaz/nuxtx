<template>
  <v-dialog
    width="400px"
    v-model="modal"
  >
    <v-btn
      class="warning mr-2"
      text
      slot="activator"
    >
      Edit</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                v-model="editedName"
                name="name"
                label="Name"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="editedUrl"
                name="url"
                label="url"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="editedTitle"
                name="title"
                label="Title"
                type="text"
              ></v-text-field>
              <v-textarea
                v-model="editedDescription"
                name="description"
                label="Description"
                type="text"
                multi-line
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                @click="onCancel"
              >
                Cancel
              </v-btn>
              <v-btn
                class="success"
                @click="onSave"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['ad'],
    data() {
      return {
        modal: false,
        editedName: this.ad.name,
        editedUrl: this.ad.url,
        editedTitle: this.ad.title,
        editedDescription: this.ad.description
      }
    },
    methods: {
      onCancel() {
        this.editedName = this.ad.name
        this.editedUrl = this.ad.url
        this.editedTitle = this.ad.title
        this.editedDescription = this.ad.description
        this.modal =  false
      },
      onSave() {
        if(this.editedDescription !== '' && this.editedTitle !== '') {
          this.$store.dispatch('excursion/updateAd', {
            name: this.editedName,
            url: this.editedUrl,
            title: this.editedTitle,
            description: this.editedDescription,
            id: this.ad.id
          })
          this.modal = false
        }
      }
    }
  }
</script>
