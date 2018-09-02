<template>
  <v-container fluid grid-list-lg v-if="isDepartmentsLoaded">
    <v-layout row wrap>
      <v-flex xs12>
        <p class="title text-xs-center my-4">{{department.name}}</p>
      </v-flex>

      <v-flex v-if="reversedRatings.length === 0">
        <v-card>
          <div>
            <v-btn color="primary" fab dark absolute top left :to="{ name: 'questions', params: { id }}">
              <v-icon>add</v-icon>
            </v-btn>
          </div>

          <p class="text-xs-center py-5">Not rated yet</p>
        </v-card>
      </v-flex>

      <v-flex  xs12 v-for="(rating, index) in reversedRatings" :key="rating.id">
        <v-card>

          <div v-if="index === 0">
            <v-btn color="primary" fab dark absolute top left :to="{ name: 'questions', params: { id }}">
              <v-icon>add</v-icon>
            </v-btn>
          </div>

          <v-card-title class="pb-0">
            <v-spacer></v-spacer>
            <p class="grey--text">{{ rating.date | moment("from", "now") }}</p>
          </v-card-title>

          <v-card-text v-if="rating.comment !== ''">{{rating.comment}}</v-card-text>

          <v-list>
            <v-divider></v-divider>
            <v-list-tile v-for="(property, key, index) in rating.properties" :key="index">
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  {{ key | capitalize }}
                  <image-rating class="pl-3" style="vertical-align: middle" src="/static/img/star.svg" v-model="property.rate" :item-size="14" :show-rating="false" :inline="true" :read-only="true"></image-rating>
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-tooltip top max-width="400" v-if="property.comment !== ''">
                  <v-btn flat icon slot="activator" color="grey">
                    <v-icon>help_outline</v-icon>
                  </v-btn>
                  <span>{{ property.comment }}</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        show: false
      }
    },
    computed: {
      department () {
        return this.$store.getters.getDepartmentById(this.id)
      },
      reversedRatings () {
        return this.$store.getters.reversedRatings(this.id)
      },
      isDepartmentsLoaded () {
        return this.$store.state.departments !== null
      }
    },
    filters: {
      capitalize (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>
