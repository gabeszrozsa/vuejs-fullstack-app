<template>
  <v-app>

    <v-navigation-drawer persistent v-model="sideNav" light mini-variant.sync temporary hide-overlay>
      <v-list dense>
        <!-- Row -->
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">

          <!-- Icon -->
          <v-list-tile-action><v-icon>{{ item.icon }}</v-icon></v-list-tile-action>

          <!-- Text -->
          <v-list-tile-content><v-list-tile-title>{{ item.title }}</v-list-tile-title></v-list-tile-content>

        </v-list-tile>

        <!-- Logout -->
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Logout</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>



    <!-- NAV -->
    <v-toolbar dark class="primary">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          DevMeetup
        </router-link>
      </v-toolbar-title>

      <!-- Mobile menu -->
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>


      <v-spacer></v-spacer>

      <!-- Buttons -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!-- Logout -->
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>


    </v-toolbar>


    <main>

      <router-view></router-view>

    </main>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      // NOTE: return menu items based on current user
      menuItems () {
        let menuItems = [
          { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' }
        ]

        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
            { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
            { icon: 'person', title: 'Profile', link: '/profile' }
          ]
        }

        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
