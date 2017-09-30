<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <!-- ICON -->
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>

        <!-- TITLE -->
        <v-layout row wrap>
          <v-flex x12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>


        <v-layout row wrap>
          <v-flex x12>
            <v-card-text>

              <!-- EDIT TITLE -->
              <v-text-field
              name="title"
              label="Title"
              id="title"
              required
              v-model="editedTitle"
              ></v-text-field>

              <!-- EDIT DESCRIPTION -->
              <v-text-field
              name="description"
              label="Description"
              id="description"
              multi-line
              required
              v-model="editedDescription"
              ></v-text-field>

            </v-card-text>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <!-- ACTION -->
        <v-layout row wrap>
          <v-flex x12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>



  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>

<style>
</style>
