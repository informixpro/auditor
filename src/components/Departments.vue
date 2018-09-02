<template>

  <v-container fluid grid-list-lg v-if="isDepartmentsLoaded">
    <v-layout row>
      <v-flex xs12>

        <p class="title text-xs-center my-4">Choose a department</p>

        <v-form>
          <v-text-field
            label="Search"
            v-model="search"
          ></v-text-field>
        </v-form>

        <v-list two-line>
          <div v-for="(department, index) in filteredDepartments" :key="department.id">
            <v-list-tile
              avatar
              ripple
              @click="goToRoute({ name: 'ratings', params: { id: department.id }})"
            >
              <v-list-tile-avatar>
                <svgicon :name="department.name | toLowerCase" width="40" height="40" color="#00bfa5"></svgicon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ department.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text">
                  Subtitle comes here
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text  v-if="isRated(department)">
                  <span>{{department.ratings[department.ratings.length - 1].date | moment("D MM YYYY | kk.mm") }}</span>
                </v-list-tile-action-text>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider v-if="index + 1 < filteredDepartments.length"></v-divider>
          </div>
        </v-list>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data () {
      return {
        search: ''
      }
    },
    created () {
      if (this.$store.state.departments === null) {
        this.$store.dispatch('fetchUserData')
      }
    },
    filters: {
      toLowerCase (string) {
        return string.toLowerCase()
      }
    },
    computed: {
      filteredDepartments () {
        // console.log(this.$store.getters.filteredDepartments(this.search))
        return this.$store.getters.filteredDepartments(this.search)
      },
      isDepartmentsLoaded () {
        return this.$store.state.departments !== null
      }
    },
    methods: {
      isRated: function (department) {
        return department.hasOwnProperty('ratings') && department.ratings.length > 0
      },
      goToRoute (route) {
        this.$router.push(route)
      }
    }
  }
</script>
