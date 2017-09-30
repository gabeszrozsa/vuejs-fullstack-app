<template>
  <v-container>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>
          Create a new Meetup
        </h4>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>

        <form @submit.prevent="onCreateMeetup">

          <!-- TITLE -->
          <v-layout row>
            <v-flex x12 sm6 offset-sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <!-- LOCATION -->
          <v-layout row>
            <v-flex x12 sm6 offset-sm3>
              <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="location"
              required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <!-- IMAGE URL -->
          <v-layout row>
            <v-flex x12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input
              type="file"
              style="display:none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked">
            </v-flex>
          </v-layout>

          <!-- IMAGE PREVIEW -->
          <v-layout row>
            <v-flex x12 sm6 offset-sm3>
              <img :src="imageUrl" height="200px">
            </v-flex>
          </v-layout>

          <!-- DESCRIPTION -->
          <v-layout row>
            <v-flex x12 sm6 offset-sm3>
              <v-text-field
              name="description"
              label="Description"
              id="description"
              v-model="description"
              multi-line
              required
              ></v-text-field>
            </v-flex>
          </v-layout>


          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a Data & Time</h4>
            </v-flex>
          </v-layout>

          <!-- DATE PICKER -->
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>

          <!-- TIME PICKER -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>

          <!-- SUBMIT -->
          <v-layout>
            <v-flex xs12 sm6 offset-sm6>
              <v-btn
              class="primary"
              type="submit"
              :disabled="!formIsValid">Create Meetup</v-btn>
            </v-flex>
          </v-layout>

        </form>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date(),
        time: new Date(),
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' && this.location !== '' && this.description !== '' && this.imageUrl !== ''
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }

        if (!this.image) {
          return
        }

        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.submittableDateTime
        }

        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      },
      // NOTE: trigger click on file input (upload)
      onPickFile () {
        this.$refs.fileInput.click()
      },
      // NOTE: image uploaded via input
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        // invalid image
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }

        // image as text (b64 string)
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>
